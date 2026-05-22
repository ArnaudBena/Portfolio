/* ============================================
   PORTFOLIO ARNAUD BENACQUISTA — app.js
   Vanilla JS — Aucun framework
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    menuMobile();
    stickyHeader();
    tabsFilters();
    showModals();
    sectionsReveal();
    cursorSpotlight();
    updateYear();
});

/* ---------- 0. Canvas particules (fond animé) ---------- */
function initCanvas() {
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const MAX_DIST = 150;
    let particles = [];
    let rafId = null;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const target = Math.min(60, Math.floor((canvas.width * canvas.height) / 28000));
        particles = [];
        for (let i = 0; i < target; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.4 + 0.4,
            });
        }
    }
    resize();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 255, 0.15)';
            ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.hypot(dx, dy);
                if (d < MAX_DIST) {
                    const alpha = 0.05 * (1 - d / MAX_DIST);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        rafId = requestAnimationFrame(draw);
    }
    draw();

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        } else if (!document.hidden && !rafId) {
            draw();
        }
    });
}

/* ---------- 1. Menu mobile (burger) ---------- */
function menuMobile() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('#mobileMenu .mobile-link');

    const mobileCloseBtn = document.getElementById('mobileCloseBtn');

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

    // Fermeture au clic sur le bouton X
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', closeMenu);
    }

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
    const clickableCards = document.querySelectorAll('.project-card[data-project]');
    const modals = document.querySelectorAll('.project-modal');

    if (!clickableCards.length) return;

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

    // Ouverture au clic sur la card
    clickableCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openModal(projectId);
        });
        // Ouverture au clavier (Enter / Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const projectId = card.getAttribute('data-project');
                openModal(projectId);
            }
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

    // Ne pas activer sur les appareils tactiles ou si mouvement réduit
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

/* ---------- 8. Année dynamique footer ---------- */
function updateYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}
