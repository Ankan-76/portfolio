// js/hero-3d.js
// Canvas-based 3D animated hero with wireframe geometry, particles, and orbital rings
// No external dependencies. Uses 2D canvas with manual 3D projection.

export class Hero3D {
    constructor(canvasEl) {
        this.canvas = canvasEl;
        this.ctx = canvasEl.getContext('2d');
        this.width = 0;
        this.height = 0;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;
        this.time = 0;
        this.running = false;
        this.frameId = null;

        // Performance: reduce on mobile
        this.isMobile = window.innerWidth < 768;
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Geometry
        this.particles = [];
        this.icoVertices = [];
        this.icoEdges = [];
        this.orbitalRings = [];

        this._init();
    }

    _init() {
        this._resize();
        this._createIcosahedron();
        this._createParticles();
        this._createOrbitalRings();
        this._bindEvents();

        if (!this.reducedMotion) {
            this.start();
        } else {
            // Draw one static frame
            this.time = 0;
            this._draw();
        }
    }

    _resize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.scale(this.dpr, this.dpr);
    }

    _bindEvents() {
        this._resizeHandler = () => {
            this.isMobile = window.innerWidth < 768;
            this._resize();
            this._createParticles();
        };
        window.addEventListener('resize', this._resizeHandler, { passive: true });

        this._pointerHandler = (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.targetMouseX = ((e.clientX - rect.left) / this.width - 0.5) * 2;
            this.targetMouseY = ((e.clientY - rect.top) / this.height - 0.5) * 2;
        };
        window.addEventListener('pointermove', this._pointerHandler, { passive: true });

        this._touchHandler = (e) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const rect = this.canvas.getBoundingClientRect();
                this.targetMouseX = ((touch.clientX - rect.left) / this.width - 0.5) * 2;
                this.targetMouseY = ((touch.clientY - rect.top) / this.height - 0.5) * 2;
            }
        };
        window.addEventListener('touchmove', this._touchHandler, { passive: true });

        // Reduced motion listener
        const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
        this._motionHandler = (e) => {
            this.reducedMotion = e.matches;
            if (this.reducedMotion) {
                this.stop();
                this._draw();
            } else {
                this.start();
            }
        };
        mql.addEventListener('change', this._motionHandler);
    }

    // --- Icosahedron geometry ---
    _createIcosahedron() {
        const t = (1 + Math.sqrt(5)) / 2; // golden ratio
        const scale = 100;

        const rawVerts = [
            [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
            [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
            [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
        ];

        // Normalize and scale
        this.icoVertices = rawVerts.map(([x, y, z]) => {
            const len = Math.sqrt(x * x + y * y + z * z);
            return { x: (x / len) * scale, y: (y / len) * scale, z: (z / len) * scale };
        });

        this.icoEdges = [
            [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
            [1, 5], [1, 7], [1, 8], [1, 9],
            [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
            [3, 4], [3, 6], [3, 8], [3, 9],
            [4, 5], [4, 9], [4, 11],
            [5, 9], [5, 11],
            [6, 7], [6, 8], [6, 10],
            [7, 8], [7, 10],
            [8, 9],
            [10, 11],
        ];
    }

    _createParticles() {
        const count = this.isMobile ? 30 : 70;
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: (Math.random() - 0.5) * this.width * 1.2,
                y: (Math.random() - 0.5) * this.height * 1.2,
                z: Math.random() * 200 - 100,
                size: Math.random() * 2 + 0.5,
                speed: Math.random() * 0.3 + 0.1,
                alpha: Math.random() * 0.5 + 0.2,
            });
        }
    }

    _createOrbitalRings() {
        this.orbitalRings = [
            { radius: 140, speed: 0.001, tilt: 0.3, offset: 0 },
            { radius: 175, speed: -0.0008, tilt: -0.2, offset: Math.PI / 3 },
        ];
        if (!this.isMobile) {
            this.orbitalRings.push({ radius: 210, speed: 0.0006, tilt: 0.15, offset: Math.PI / 1.5 });
        }
    }

    // --- 3D projection ---
    _project(x, y, z, cx, cy) {
        const fov = 600;
        const scale = fov / (fov + z);
        return {
            x: cx + x * scale,
            y: cy + y * scale,
            scale: scale,
        };
    }

    // --- Rotation ---
    _rotateX(v, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return { x: v.x, y: v.y * cos - v.z * sin, z: v.y * sin + v.z * cos };
    }

    _rotateY(v, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return { x: v.x * cos + v.z * sin, y: v.y, z: -v.x * sin + v.z * cos };
    }

    _rotateZ(v, angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return { x: v.x * cos - v.y * sin, y: v.x * sin + v.y * cos, z: v.z };
    }

    // --- Drawing ---
    _draw() {
        const ctx = this.ctx;
        const w = this.width;
        const h = this.height;

        ctx.clearRect(0, 0, w, h);

        // Center shifted right and up for hero layout
        const cx = this.isMobile ? w * 0.5 : w * 0.65;
        const cy = h * 0.45;

        // Smooth mouse interpolation
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

        const rotX = this.mouseY * 0.3 + this.time * 0.0003;
        const rotY = this.mouseX * 0.3 + this.time * 0.0005;

        // --- Draw particles ---
        this.particles.forEach((p) => {
            p.y -= p.speed;
            if (p.y < -h * 0.6) {
                p.y = h * 0.6;
                p.x = (Math.random() - 0.5) * w * 1.2;
            }

            const proj = this._project(p.x, p.y, p.z, cx, cy);
            ctx.beginPath();
            ctx.arc(proj.x, proj.y, p.size * proj.scale, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha * proj.scale})`;
            ctx.fill();
        });

        // --- Draw orbital rings ---
        this.orbitalRings.forEach((ring) => {
            const segments = this.isMobile ? 48 : 80;
            ctx.beginPath();
            for (let i = 0; i <= segments; i++) {
                const angle = (i / segments) * Math.PI * 2 + ring.offset;
                let v = {
                    x: Math.cos(angle) * ring.radius,
                    y: 0,
                    z: Math.sin(angle) * ring.radius,
                };
                v = this._rotateX(v, ring.tilt + rotX * 0.3);
                v = this._rotateY(v, this.time * ring.speed + rotY * 0.3);
                const proj = this._project(v.x, v.y, v.z, cx, cy);
                if (i === 0) ctx.moveTo(proj.x, proj.y);
                else ctx.lineTo(proj.x, proj.y);
            }
            ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // --- Draw icosahedron wireframe ---
        const transformed = this.icoVertices.map((v) => {
            let tv = this._rotateX(v, rotX);
            tv = this._rotateY(tv, rotY);
            tv = this._rotateZ(tv, this.time * 0.0002);
            return tv;
        });

        const projected = transformed.map((v) => this._project(v.x, v.y, v.z, cx, cy));

        // Edges
        this.icoEdges.forEach(([a, b]) => {
            const pa = projected[a];
            const pb = projected[b];
            const alpha = (pa.scale + pb.scale) * 0.35;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${Math.min(alpha, 0.5)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Vertices (dots)
        projected.forEach((p) => {
            const r = 2.5 * p.scale;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${Math.min(p.scale * 0.7, 0.8)})`;
            ctx.fill();
            // Glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${Math.min(p.scale * 0.12, 0.15)})`;
            ctx.fill();
        });

        // --- Ambient center glow ---
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 220);
        gradient.addColorStop(0, 'rgba(124, 58, 237, 0.06)');
        gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.02)');
        gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
    }

    _loop = () => {
        if (!this.running) return;
        this.time += 16;
        this._draw();
        this.frameId = requestAnimationFrame(this._loop);
    }

    start() {
        if (this.running) return;
        this.running = true;
        this._loop();
    }

    stop() {
        this.running = false;
        if (this.frameId) {
            cancelAnimationFrame(this.frameId);
            this.frameId = null;
        }
    }

    destroy() {
        this.stop();
        window.removeEventListener('resize', this._resizeHandler);
        window.removeEventListener('pointermove', this._pointerHandler);
        window.removeEventListener('touchmove', this._touchHandler);
    }
}

export function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return null;
    return new Hero3D(canvas);
}
