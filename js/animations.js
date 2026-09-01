// js/animations.js
// IntersectionObserver-based scroll reveal animation system

export function initScrollReveal() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        // Make all elements visible immediately
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
            el.classList.add('revealed');
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px',
        }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
        observer.observe(el);
    });
}

// Hero staggered entrance
export function initHeroEntrance() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroElements = document.querySelectorAll('.hero-entrance');

    if (reducedMotion) {
        heroElements.forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    heroElements.forEach((el, i) => {
        el.style.animationDelay = `${0.2 + i * 0.12}s`;
        // Trigger animation after paint
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.classList.add('animate');
            });
        });
    });
}

// 3D tilt on hover for cards
export function initCardTilt() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    document.querySelectorAll('.card-3d').forEach((card) => {
        card.addEventListener('pointermove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('pointerleave', () => {
            card.style.transform = '';
        });
    });
}

// Typewriter effect
export function initTypewriter() {
    const el = document.querySelector('.typewriter-text');
    if (!el) return;

    const words = JSON.parse(el.getAttribute('data-words')) || ['Fullstack web developer', 'Tech Enthusiast', 'Problem solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Start with the first word pre-filled if it exists
    if (!charIndex && el.textContent.trim().length > 0) {
        charIndex = el.textContent.trim().length;
        isDeleting = true; // start by deleting the initial word after a pause
    }

    function type() {
        const currentWord = words[wordIndex];
        const displayWord = isDeleting
            ? currentWord.substring(0, charIndex - 1)
            : currentWord.substring(0, charIndex + 1);

        el.textContent = displayWord;

        if (!isDeleting) {
            charIndex++;
        } else {
            charIndex--;
        }

        let typeSpeed = isDeleting ? 40 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 4000; // Pause at end of word (increased by 2s)
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // Pause before typing new word
        }

        setTimeout(type, typeSpeed);
    }

    // Initial delay before starting the effect
    setTimeout(type, 1500);
}
