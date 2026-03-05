/* ============================================
   PORTFOLIO ARNAUD BENACQUISTA — app.js
   Vanilla JS — Aucun framework
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    menuMobile();
    stickyHeader();
    tabsFilters();
    showModals();
    sectionsReveal();
    cursorSpotlight();
});

/* ---------- 1. Menu mobile (burger) ---------- */
function menuMobile() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('#mobileMenu .mobile-link');

    if (!burgerBtn || !mobileMenu) return;

    function openMenu() {
        burgerBtn.classList.add('burger-open');
        burgerBtn.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('mobile-menu-open');
        if (mobileOverlay) mobileOverlay.classList.add('mobile-overlay-visible');
        document.body.classList.add('modal-open');
    }

    function closeMenu() {
        burgerBtn.classList.remove('burger-open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('mobile-menu-open');
        if (mobileOverlay) mobileOverlay.classList.remove('mobile-overlay-visible');
        document.body.classList.remove('modal-open');
    }

    burgerBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('mobile-menu-open');
        isOpen ? closeMenu() : openMenu();
    });

    // Fermeture au clic sur un lien
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fermeture au clic sur l'overlay
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMenu);
    }
}

/* ---------- 2. Header sticky (scrolled) ---------- */
function stickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

/* ---------- 3. Filtres portfolio ---------- */
function tabsFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Mise à jour boutons actifs
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filtrage des cards
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden-filter');
                } else {
                    card.classList.add('hidden-filter');
                }
            });
        });
    });
}

/* ---------- 4. Modals projets ---------- */
function showModals() {
    const modalBtns = document.querySelectorAll('.project-modal-btn');
    const modals = document.querySelectorAll('.project-modal');

    if (!modalBtns.length) return;

    function openModal(projectId) {
        const modal = document.getElementById('modal-' + projectId);
        if (!modal) return;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    // Ouverture au clic sur "Voir les détails"
    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            openModal(projectId);
        });
    });

    // Fermeture au clic sur le bouton X
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.project-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }

        // Fermeture au clic sur l'overlay
        const overlay = modal.querySelector('.project-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => closeModal(modal));
        }
    });

    // Fermeture avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    closeModal(modal);
                }
            });
        }
    });
}

/* ---------- 5. Reveal sections au scroll ---------- */
function sectionsReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ---------- 6. Cursor spotlight (desktop) ---------- */
function cursorSpotlight() {
    const spotlight = document.getElementById('cursorSpotlight');
    if (!spotlight) return;

    // Ne pas activer sur les appareils tactiles
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    spotlight.classList.remove('hidden');

    document.addEventListener('mousemove', (e) => {
        spotlight.style.left = e.clientX + 'px';
        spotlight.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        spotlight.style.opacity = '1';
    });
}
