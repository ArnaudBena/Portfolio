/* ============================================
   PORTFOLIO ARNAUD BENACQUISTA — app.js
   Vanilla JS — Aucun framework
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCanvas();
    initBeatThemCanvas();
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

/* ---------- 7. Animation carte Beat Them ---------- */
function initBeatThemCanvas() {
    const canvas = document.getElementById('beatThemCanvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d');
    let rafId = null;

    function resize() {
        canvas.width  = canvas.offsetWidth  || 300;
        canvas.height = canvas.offsetHeight || 192;
    }
    resize();
    new ResizeObserver(resize).observe(canvas);

    function drawStick(x, y, t) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        // tête
        ctx.beginPath();
        ctx.arc(x, y - 22, 9, 0, Math.PI * 2);
        ctx.stroke();
        // corps
        ctx.beginPath();
        ctx.moveTo(x, y - 13);
        ctx.lineTo(x, y + 4);
        ctx.stroke();
        // bras
        const arm = Math.sin(t * 0.003) * 6;
        ctx.beginPath();
        ctx.moveTo(x, y - 9);
        ctx.lineTo(x - 13, y - 2 + arm);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y - 9);
        ctx.lineTo(x + 13, y - 2 - arm);
        ctx.stroke();
        // jambes
        const leg = Math.sin(t * 0.005) * 9;
        ctx.beginPath();
        ctx.moveTo(x, y + 4);
        ctx.lineTo(x - 9 + leg, y + 19);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y + 4);
        ctx.lineTo(x + 9 - leg, y + 19);
        ctx.stroke();
    }

    function drawEnemy(x, y, size) {
        // corps vert
        ctx.fillStyle = '#3a8a3a';
        ctx.fillRect(x - size / 2, y - size, size, size);
        // reflet gauche (ombre brune)
        ctx.fillStyle = '#5a6a3a';
        ctx.fillRect(x - size / 2, y - size, size * 0.3, size);
        // reflet droit
        ctx.fillStyle = '#4a7a4a';
        ctx.fillRect(x + size * 0.2, y - size, size * 0.3, size);
        // yeux noirs
        ctx.fillStyle = '#111111';
        const ey = y - size * 0.55;
        ctx.beginPath();
        ctx.arc(x - size * 0.2, ey, size * 0.1, 0, Math.PI * 2);
        ctx.arc(x + size * 0.2, ey, size * 0.1, 0, Math.PI * 2);
        ctx.fill();
        // points verts au-dessus
        ctx.fillStyle = '#6adc6a';
        ctx.beginPath();
        ctx.arc(x - size * 0.2, y - size - size * 0.12, size * 0.09, 0, Math.PI * 2);
        ctx.arc(x + size * 0.2, y - size - size * 0.12, size * 0.09, 0, Math.PI * 2);
        ctx.fill();
    }

    function drawBtn(x, y, w, h, label) {
        ctx.fillStyle = 'rgba(80,80,80,0.55)';
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 6);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(9, w * 0.28)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(label, x + w / 2, y + h / 2 + 4);
    }

    function draw(ts) {
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        // fond vert foncé (comme le vrai jeu)
        ctx.fillStyle = '#1c3d24';
        ctx.fillRect(0, 0, W, H);

        const ground = H * 0.76;

        // sol
        ctx.strokeStyle = '#4db84d';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, ground);
        ctx.lineTo(W, ground);
        ctx.stroke();

        // stick figure
        const figX = W * 0.18;
        drawStick(figX, ground, ts);

        // ennemis qui avancent
        const speed = W * 0.00005;
        const eSize = Math.min(W * 0.11, 32);
        const e1x = W * 0.7  - (ts * speed % (W * 0.65));
        const e2x = W * 0.92 - (ts * speed * 0.75 % (W * 0.8));
        if (e1x > figX + eSize)  drawEnemy(e1x, ground, eSize);
        if (e2x > figX + eSize && Math.abs(e2x - e1x) > eSize * 1.2) drawEnemy(e2x, ground, eSize * 0.8);

        // ---- HUD ----
        const fs = Math.max(9, W * 0.033);
        ctx.textBaseline = 'top';

        // gauche
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${fs}px sans-serif`;
        ctx.textAlign = 'left';
        ctx.fillText('Score : 0', 7, 5);
        ctx.font = `${fs * 0.85}px sans-serif`;
        ctx.fillText('Combo : x1 (0)', 7, 5 + fs + 2);

        // cœurs (centre)
        const hSize = Math.max(11, W * 0.038);
        ctx.font = `${hSize}px sans-serif`;
        ctx.textAlign = 'center';
        const cx = W / 2;
        const gap = hSize * 1.3;
        ctx.fillText('❤️', cx - gap * 1.5, 4);
        ctx.fillText('❤️', cx - gap * 0.5, 4);
        ctx.fillText('🩶', cx + gap * 0.5, 4);
        ctx.fillText('🩶', cx + gap * 1.5, 4);

        // droite
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${fs}px sans-serif`;
        ctx.textAlign = 'right';
        ctx.fillText('Niveau 1 — Série 1', W - 6, 5);
        ctx.font = `${fs * 0.85}px sans-serif`;
        ctx.fillText('Reps : 0 / 10', W - 6, 5 + fs + 2);

        // boutons bas
        const btnW = Math.max(38, W * 0.13);
        const btnH = Math.max(24, H * 0.14);
        const btnY = H - btnH - 5;
        drawBtn(5, btnY, btnW, btnH, 'UP');
        drawBtn(W - btnW - 5, btnY, btnW, btnH, 'DOWN');

        rafId = requestAnimationFrame(draw);
    }

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting && !rafId)  { rafId = requestAnimationFrame(draw); }
            else if (!e.isIntersecting && rafId) { cancelAnimationFrame(rafId); rafId = null; }
        });
    }, { threshold: 0.1 });
    obs.observe(canvas);
}

/* ---------- 8. Année dynamique footer ---------- */
function updateYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}
