// js/navigation.js
// Active page detection and smooth scroll for anchor links

export function initNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// View Transitions API for page transitions (progressive enhancement)
export function initPageTransitions() {
    if (!document.startViewTransition) return;

    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]');
        if (!link) return;
        const url = new URL(link.href, window.location.origin);
        // Only intercept same-origin, non-hash links
        if (url.origin !== window.location.origin) return;
        if (url.pathname === window.location.pathname) return;
        if (link.target === '_blank') return;

        e.preventDefault();
        document.startViewTransition(() => {
            window.location.href = link.href;
        });
    });
}
