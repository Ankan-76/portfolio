// js/main.js
// Main orchestrator — imports and initializes all modules

import { initScrollReveal, initHeroEntrance, initCardTilt } from './animations.js';
import { initNavigation, initPageTransitions } from './navigation.js';

// Sidebar and footer components (auto-register custom elements)
import './components/portfolio-sidebar.js';
import './components/portfolio-footer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();
    initPageTransitions();

    // Initialize scroll reveal animations
    initScrollReveal();

    // Initialize card tilt effects
    initCardTilt();

    // Hero entrance (only on pages with hero elements)
    if (document.querySelector('.hero-entrance')) {
        initHeroEntrance();
    }

    // Hero 3D canvas (only on homepage)
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        import('./hero-3d.js').then(({ initHero3D }) => {
            initHero3D();
        });
    }

    // Project filter (only on projects page)
    const filterGroup = document.querySelector('.filter-group');
    if (filterGroup) {
        initProjectFilter();
    }
});

// Project filtering logic
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.filter;

            // Update active state
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards
            projectCards.forEach((card) => {
                const cardCategory = card.dataset.category;
                if (category === 'All' || cardCategory === category) {
                    card.style.display = '';
                    // Re-trigger reveal
                    requestAnimationFrame(() => {
                        card.classList.add('revealed');
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
