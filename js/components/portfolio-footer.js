class PortfolioFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    get socialLinks() {
        return [
            { label: 'GitHub', href: 'https://github.com/Ankan-76', icon: this._iconGithub() },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ankanbiswas43', icon: this._iconLinkedin() },
            { label: 'Facebook', href: 'https://www.facebook.com/Ankan7699', icon: this._iconFacebook() },
            { label: 'Instagram', href: 'https://www.instagram.com/ankan_76?igsh=MXR5M2xndGlwZjZqcQ==', icon: this._iconInstagram() },
            { label: 'X', href: 'https://x.com/Ankan7699', icon: this._iconX() },
        ];
    }

    get primaryLinks() {
        return [
            { label: 'Home', href: 'index.html' },
            { label: 'About', href: 'about.html' },
            { label: 'Skills', href: 'skills.html' },
            { label: 'Projects', href: 'projects.html' },
        ];
    }

    get secondaryLinks() {
        return [
            { label: 'Experience', href: 'experience.html' },
            { label: 'Services', href: 'services.html' },
            { label: 'Contact', href: 'contact.html' },
        ];
    }

    _iconGithub() {
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
    }

    _iconLinkedin() {
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
    }

    _iconFacebook() {
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`;
    }

    _iconInstagram() {
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>`;
    }

    _iconX() {
        return `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
    }

    render() {
        const socialHTML = this.socialLinks.map(
            (item) => `
                <a href="${item.href}" class="social-link" aria-label="Ankan Biswas on ${item.label}" target="_blank" rel="noopener noreferrer">
                    ${item.icon}
                </a>
            `
        ).join('');

        const primaryHTML = this.primaryLinks.map(
            (item) => `<li><a href="${item.href}">${item.label}</a></li>`
        ).join('');

        const secondaryHTML = this.secondaryLinks.map(
            (item) => `<li><a href="${item.href}">${item.label}</a></li>`
        ).join('');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 100%;
                    margin-left: 0;
                    box-sizing: border-box;
                }

                .site-footer {
                    border-top: 1px solid rgba(148, 163, 184, 0.18);
                    padding: 4rem 2rem 2rem 4rem;
                    background: rgba(20, 20, 43, 0.88);
                    position: relative;
                    overflow: hidden;
                }

                .site-footer::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 80%;
                    height: 1px;
                    background: linear-gradient(90deg, rgba(124, 58, 237, 0), rgba(124, 58, 237, 1), rgba(6, 182, 212, 1), rgba(124, 58, 237, 0));
                    opacity: 0.4;
                }

                .footer-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1fr;
                    gap: 3rem;
                    margin-bottom: 2rem;
                }

                .footer-brand .footer-logo {
                    font-size: clamp(1.5rem, 2vw, 2rem);
                    font-weight: 800;
                    color: #f8fafc;
                    margin-bottom: 0.75rem;
                }

                .footer-brand .footer-logo .accent {
                    background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #06b6d4 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .footer-brand p {
                    color: #cbd5e1;
                    font-size: 0.875rem;
                    max-width: 320px;
                    line-height: 1.7;
                }

                .social-links {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                    margin-top: 1rem;
                }

                .social-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    border: 1px solid rgba(148, 163, 184, 0.25);
                    color: #cbd5e1;
                    transition: all 0.25s ease;
                    background: rgba(15, 23, 42, 0.35);
                }

                .social-link:hover {
                    border-color: rgba(124, 58, 237, 0.7);
                    color: #ddd6fe;
                    background: rgba(124, 58, 237, 0.08);
                    transform: translateY(-3px);
                    box-shadow: 0 0 18px rgba(124, 58, 237, 0.35);
                }

                .social-link[href*="facebook.com"]:hover {
                    border-color: #1877f2;
                    color: #1877f2;
                    background: rgba(24, 119, 242, 0.12);
                    box-shadow: 0 0 18px rgba(24, 119, 242, 0.22);
                }

                .social-link[href*="instagram.com"]:hover {
                    border-color: #e1306c;
                    color: #e1306c;
                    background: rgba(225, 48, 108, 0.12);
                    box-shadow: 0 0 18px rgba(225, 48, 108, 0.22);
                }

                .social-link[href*="x.com"]:hover,
                .social-link[href*="twitter.com"]:hover {
                    border-color: #ffffff;
                    color: #ffffff;
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 0 18px rgba(255, 255, 255, 0.18);
                }

                .social-link[href*="linkedin.com"]:hover {
                    border-color: #0077b5;
                    color: #0077b5;
                    background: rgba(0, 119, 181, 0.12);
                    box-shadow: 0 0 18px rgba(0, 119, 181, 0.18);
                }

                .social-link[href*="github.com"]:hover {
                    border-color: #f5f5f5;
                    color: #f5f5f5;
                    background: rgba(245, 245, 245, 0.08);
                    box-shadow: 0 0 18px rgba(245, 245, 245, 0.15);
                }

                .social-link svg {
                    width: 18px;
                    height: 18px;
                }

                .footer-nav-title {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #f8fafc;
                    margin-bottom: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                }

                .footer-nav-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.625rem;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .footer-nav-list a {
                    color: #cbd5e1;
                    font-size: 0.875rem;
                    transition: color 0.2s ease, padding-left 0.2s ease;
                    text-decoration: none;
                }

                .footer-nav-list a:hover {
                    color: #c4b5fd;
                    padding-left: 0.5rem;
                }

                .footer-bottom {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-top: 1.5rem;
                    border-top: 1px solid rgba(148, 163, 184, 0.18);
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .footer-copyright {
                    font-size: 0.875rem;
                    color: #94a3b8;
                    margin: 0;
                }

                .btn-icon {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    border-radius: 10px;
                    border: 1px solid rgba(148, 163, 184, 0.25);
                    background: rgba(15, 23, 42, 0.45);
                    color: #f8fafc;
                    text-decoration: none;
                    transition: transform 0.2s ease, border-color 0.2s ease;
                }

                .btn-icon:hover {
                    transform: translateY(-2px);
                    border-color: rgba(124, 58, 237, 0.7);
                }

                .btn-icon svg {
                    width: 18px;
                    height: 18px;
                }

                @media (max-width: 767px) {
                    .site-footer {
                        padding: 3rem 1.25rem 1.5rem;
                    }

                    .footer-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            </style>

            <footer class="site-footer" role="contentinfo">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <div class="footer-logo">Ankan <span class="accent">Biswas</span></div>
                        <p>Full Stack Web Developer crafting modern, responsive, and high-performance digital experiences.</p>
                        <div class="social-links">
                            ${socialHTML}
                        </div>
                    </div>

                    <div>
                        <div class="footer-nav-title">Pages</div>
                        <ul class="footer-nav-list">
                            ${primaryHTML}
                        </ul>
                    </div>

                    <div>
                        <div class="footer-nav-title">More</div>
                        <ul class="footer-nav-list">
                            ${secondaryHTML}
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p class="footer-copyright">&copy; 2025 Ankan Biswas. All rights reserved.</p>
                    <a href="#main-content" class="btn-icon" aria-label="Back to top">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
                    </a>
                </div>
            </footer>
        `;
    }
}

customElements.define('portfolio-footer', PortfolioFooter);
