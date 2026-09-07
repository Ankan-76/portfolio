// js/components/portfolio-sidebar.js
// Native Web Component for persistent sidebar navigation

class PortfolioSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._isOpen = false;
    this._handleEscape = this._handleEscape.bind(this);
    this._handleOverlay = this._handleOverlay.bind(this);
  }

  connectedCallback() {
    this.render();
    this._detectActivePage();
    this._setupListeners();
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._handleEscape);
  }

  get navItems() {
    return [
      { label: 'Home', href: 'index.html', icon: this._iconHome() },
      { label: 'About', href: 'about.html', icon: this._iconAbout() },
      { label: 'Skills', href: 'skills.html', icon: this._iconSkills() },
      { label: 'Projects', href: 'projects.html', icon: this._iconProjects() },
      { label: 'Experience', href: 'experience.html', icon: this._iconExperience() },
      { label: 'Services', href: 'services.html', icon: this._iconServices() },
      { label: 'Contact', href: 'contact.html', icon: this._iconContact() },
    ];
  }

  _detectActivePage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    const links = this.shadowRoot.querySelectorAll('.nav-link');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html') || (page === '/' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  _setupListeners() {
    const hamburger = this.shadowRoot.querySelector('.hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', () => this._toggleMenu());
    }

    const overlay = this.shadowRoot.querySelector('.sidebar-overlay');
    if (overlay) {
      overlay.addEventListener('click', this._handleOverlay);
    }

    document.addEventListener('keydown', this._handleEscape);
  }

  _handleEscape(e) {
    if (e.key === 'Escape' && this._isOpen) {
      this._closeMenu();
    }
  }

  _handleOverlay() {
    this._closeMenu();
  }

  _toggleMenu() {
    this._isOpen ? this._closeMenu() : this._openMenu();
  }

  _openMenu() {
    this._isOpen = true;
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    const overlay = this.shadowRoot.querySelector('.sidebar-overlay');
    const hamburger = this.shadowRoot.querySelector('.hamburger');
    sidebar.classList.add('open');
    overlay.classList.add('active');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    // Focus first link
    const firstLink = sidebar.querySelector('.nav-link');
    if (firstLink) firstLink.focus();
  }

  _closeMenu() {
    this._isOpen = false;
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    const overlay = this.shadowRoot.querySelector('.sidebar-overlay');
    const hamburger = this.shadowRoot.querySelector('.hamburger');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  // SVG Icons
  _iconHome() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
  }
  _iconAbout() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  }
  _iconSkills() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
  }
  _iconProjects() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;
  }
  _iconExperience() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`;
  }
  _iconServices() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`;
  }
  _iconContact() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
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
    const navHTML = this.navItems
      .map(
        (item) => `
      <li>
        <a href="${item.href}" class="nav-link">
          <span class="nav-icon">${item.icon}</span>
          <span class="nav-label">${item.label}</span>
        </a>
      </li>`
      )
      .join('');

    this.shadowRoot.innerHTML = `
      <style>
        *, *::before, *::after {
          box-sizing: border-box;
        }

        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          width: 240px;
          height: 100vh;
          height: 100dvh;
        }

        /* Hamburger — mobile only */
        .hamburger {
          display: none;
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1002;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(124, 58, 237, 0.2);
          border-radius: 8px;
          background: rgba(6, 6, 15, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          cursor: pointer;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          padding: 0;
          transition: border-color 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: #f1f0f5;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .hamburger.active span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .hamburger.active span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .hamburger.active span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .hamburger:hover {
          border-color: rgba(124, 58, 237, 0.5);
        }

        /* Overlay — mobile only */
        .sidebar-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(6, 6, 15, 0.7);
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s cubic-bezier(0.22,1,0.36,1);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .sidebar-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }

        /* Sidebar */
        .sidebar {
          width: 240px;
          height: 100vh;
          height: 100dvh; /* use dynamic viewport height for mobile browsers */
          background: rgba(10, 10, 28, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid rgba(124, 58, 237, 0.12);
          display: flex;
          flex-direction: column;
          padding: 2rem 1.25rem 3rem; /* Extra padding at the bottom */
          overflow-y: auto;
          -webkit-overflow-scrolling: touch; /* Enable momentum scrolling on iOS */
          overscroll-behavior-y: contain; /* Prevent scrolling the body */
          touch-action: pan-y; /* Ensure vertical scrolling works */
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
          position: relative;
          z-index: 1001;
        }

        /* Brand */
        .brand {
          margin-bottom: 2.5rem;
          text-align: center;
          flex-shrink: 0;
        }

        .brand-avatar-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .brand-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          display: block;
          border: 2px solid rgba(167, 139, 250, 0.7);
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.25);
          background: rgba(15, 15, 26, 0.8);
        }

        .brand-name {
          font-size: 1.15rem;
          font-weight: 600;
          color: #f1f0f5;
          margin-bottom: 0.2rem;
          font-family: 'Inter', sans-serif;
        }

        .brand-title {
          font-size: 0.85rem;
          color: #a5a3b5;
          font-family: 'Inter', sans-serif;
        }

        /* Navigation */
        nav {
          flex: 1;
          flex-shrink: 0;
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 1rem;
          border-radius: 0.5rem;
          text-decoration: none;
          color: #a5a3b5;
          font-size: 0.875rem;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s cubic-bezier(0.22,1,0.36,1);
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%) scaleY(0);
          width: 3px;
          height: 60%;
          border-radius: 0 3px 3px 0;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1);
        }

        .nav-link:hover {
          color: #f1f0f5;
          background: rgba(124, 58, 237, 0.06);
        }

        .nav-link.active {
          color: #a78bfa;
          background: rgba(124, 58, 237, 0.1);
        }

        .nav-link.active::before {
          transform: translateY(-50%) scaleY(1);
        }

        .nav-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .nav-icon svg {
          width: 18px;
          height: 18px;
        }

        /* Sidebar bottom */
        .sidebar-bottom {
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(124, 58, 237, 0.1);
          flex-shrink: 0;
        }

        .social-label {
          font-size: 0.7rem;
          color: #6b6980;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
          font-family: 'Inter', sans-serif;
        }

        .social-links {
          display: flex;
          gap: 0.35rem;
          flex-wrap: nowrap;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 6px;
          border: 1px solid rgba(124, 58, 237, 0.15);
          color: #a5a3b5;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.22,1,0.36,1);
        }

        .social-link:hover {
          border-color: #7c3aed;
          color: #a78bfa;
          background: rgba(124, 58, 237, 0.08);
          transform: translateY(-2px);
        }

        .social-link[href*="facebook.com"]:hover {
          border-color: #1877f2;
          color: #1877f2;
          background: rgba(24, 119, 242, 0.12);
          box-shadow: 0 0 12px rgba(24, 119, 242, 0.18);
        }

        .social-link[href*="instagram.com"]:hover {
          border-color: #e1306c;
          color: #e1306c;
          background: rgba(225, 48, 108, 0.12);
          box-shadow: 0 0 12px rgba(225, 48, 108, 0.18);
        }

        .social-link[href*="x.com"]:hover,
        .social-link[href*="twitter.com"]:hover {
          border-color: #ffffff;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.12);
        }

        .social-link[href*="linkedin.com"]:hover {
          border-color: #0077b5;
          color: #0077b5;
          background: rgba(0, 119, 181, 0.12);
          box-shadow: 0 0 12px rgba(0, 119, 181, 0.15);
        }

        .social-link[href*="github.com"]:hover {
          border-color: #f5f5f5;
          color: #f5f5f5;
          background: rgba(245, 245, 245, 0.08);
          box-shadow: 0 0 12px rgba(245, 245, 245, 0.12);
        }

        .social-link svg {
          width: 16px;
          height: 16px;
        }

        /* Resume button */
        .resume-link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.6rem 1rem;
          border: 1px solid rgba(124, 58, 237, 0.3);
          border-radius: 0.5rem;
          color: #a78bfa;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
          margin-bottom: 1rem;
        }

        .resume-link:hover {
          border-color: #7c3aed;
          background: rgba(124, 58, 237, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(124, 58, 237, 0.2);
        }

        .resume-link svg {
          width: 16px;
          height: 16px;
        }

        /* Copyright */
        .copyright {
          font-size: 0.65rem;
          color: #6b6980;
          line-height: 1.5;
          font-family: 'Inter', sans-serif;
        }

        /* Focus visible */
        .nav-link:focus-visible,
        .social-link:focus-visible,
        .resume-link:focus-visible,
        .hamburger:focus-visible {
          outline: 2px solid #7c3aed;
          outline-offset: 2px;
        }

        /* Mobile */
        @media (max-width: 1023px) {
          :host {
            width: 0;
            pointer-events: none;
          }

          .hamburger, .sidebar {
            pointer-events: auto;
          }

          .hamburger {
            display: flex;
          }

          .sidebar-overlay {
            display: block;
          }

          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            height: 100vh;
            height: 100dvh;
            transform: translateX(-100%);
            box-shadow: 4px 0 30px rgba(0, 0, 0, 0.5);
          }

          .sidebar.open {
            transform: translateX(0);
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .sidebar,
          .nav-link,
          .social-link,
          .resume-link,
          .hamburger span,
          .sidebar-overlay {
            transition: none;
          }
        }
      </style>

      <button class="hamburger" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="sidebar-nav">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="sidebar-overlay" aria-hidden="true"></div>

      <aside class="sidebar" id="sidebar-nav" role="navigation" aria-label="Main navigation">
        <div class="brand">
          <div class="brand-avatar-wrap">
            <img class="brand-avatar" src="assets/images/profile/profile_Pic.png" alt="Ankan Biswas profile picture" />
          </div>
          <div class="brand-name">Ankan Biswas</div>
          <div class="brand-title">Full Stack Web Developer</div>
        </div>

        <nav>
          <ul class="nav-list" role="list">
            ${navHTML}
          </ul>
        </nav>

        <div class="sidebar-bottom">
          <div class="social-label">Let's Connect</div>
          <div class="social-links">
            <a href="https://github.com/Ankan-76" class="social-link" aria-label="Ankan Biswas on GitHub" target="_blank" rel="noopener noreferrer">
              ${this._iconGithub()}
            </a>
            <a href="https://www.linkedin.com/in/ankanbiswas43" class="social-link" aria-label="Ankan Biswas on LinkedIn" target="_blank" rel="noopener noreferrer">
              ${this._iconLinkedin()}
            </a>
            <a href="https://www.facebook.com/Ankan7699" class="social-link" aria-label="Ankan Biswas on Facebook" target="_blank" rel="noopener noreferrer">
              ${this._iconFacebook()}
            </a>
            <a href="https://www.instagram.com/ankan_76?igsh=MXR5M2xndGlwZjZqcQ==" class="social-link" aria-label="Ankan Biswas on Instagram" target="_blank" rel="noopener noreferrer">
              ${this._iconInstagram()}
            </a>
            <a href="https://x.com/Ankan7699" class="social-link" aria-label="Ankan Biswas on X" target="_blank" rel="noopener noreferrer">
              ${this._iconX()}
            </a>
          </div>

          <a href="resume/resume.pdf" class="resume-link" target="_blank" rel="noopener noreferrer">
            View Resume
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </a>

          <div class="copyright">
            &copy; 2025 Ankan Biswas.<br>All rights reserved.
          </div>
        </div>
      </aside>
    `;
  }
}

customElements.define('portfolio-sidebar', PortfolioSidebar);
