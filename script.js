// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) { setTimeout(() => { preloader.classList.add('loaded'); }, 1500); }
});

// Theme Toggle Logic
const themeToggles = document.querySelectorAll('.theme-toggle');
const htmlEl = document.documentElement;

function updateThemeUI(theme) {
    const icons = document.querySelectorAll('.theme-icon');
    if (theme === 'light') { icons.forEach(icon => { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }); }
    else { icons.forEach(icon => { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }); }
}

if (htmlEl.classList.contains('light-theme')) { updateThemeUI('light'); } else { updateThemeUI('dark'); }

themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        htmlEl.classList.toggle('light-theme');
        try {
            if (htmlEl.classList.contains('light-theme')) { localStorage.setItem('theme', 'light'); updateThemeUI('light'); }
            else { localStorage.setItem('theme', 'dark'); updateThemeUI('dark'); }
        } catch (e) {}
    });
});

// Floating Pill Navbar Logic
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (navbar && menuToggle && mobileMenu) {
    const menuIcon = menuToggle.querySelector('i');

    function applyNavScrolledState(apply) {
        if (apply) {
            navbar.classList.add('top-3', 'max-w-5xl', 'shadow-2xl', 'border', 'border-ash', 'rounded-2xl', 'py-3');
            navbar.style.backgroundColor = 'var(--nav-bg)'; navbar.style.backdropFilter = 'blur(12px)';
            navbar.classList.remove('py-6', 'max-w-7xl');
        } else {
            navbar.classList.remove('top-3', 'max-w-5xl', 'shadow-2xl', 'border', 'border-ash', 'rounded-2xl', 'py-3');
            navbar.style.backgroundColor = 'transparent'; navbar.style.backdropFilter = 'none';
            navbar.classList.add('py-6', 'max-w-7xl');
        }
    }

    if (window.scrollY > 50) { applyNavScrolledState(true); }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { applyNavScrolledState(true); }
        else { if (!mobileMenu.classList.contains('max-h-96')) { applyNavScrolledState(false); } }
    });

    menuToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('max-h-96')) {
            mobileMenu.classList.remove('max-h-96'); menuIcon.classList.remove('fa-times'); menuIcon.classList.add('fa-bars');
            if (window.scrollY <= 50) { applyNavScrolledState(false); }
        } else {
            mobileMenu.classList.add('max-h-96'); menuIcon.classList.remove('fa-bars'); menuIcon.classList.add('fa-times');
            applyNavScrolledState(true);
        }
    });

    mobileLinks.forEach(link => link.addEventListener('click', () => {
        mobileMenu.classList.remove('max-h-96'); menuIcon.classList.remove('fa-times'); menuIcon.classList.add('fa-bars');
        if (window.scrollY <= 50) { applyNavScrolledState(false); }
    }));
}

// ENHANCED SCROLL REVEAL LOGIC
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .timeline-draw');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); } });
}, { threshold: 0.15 });
revealElements.forEach(el => observer.observe(el));

// NUMBER COUNT UP ANIMATION
const statsContainer = document.getElementById('stats-container');
if (statsContainer) {
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const target = +stat.dataset.target;
                    let current = 0;
                    const increment = target / 50;
                    const updateCount = () => {
                        if (current < target) { current += increment; stat.innerText = Math.ceil(current); setTimeout(updateCount, 30); }
                        else { stat.innerText = target + '+'; }
                    };
                    updateCount();
                });
                statsObserver.unobserve(statsContainer);
            }
        });
    }, { threshold: 0.5 });
    statsObserver.observe(statsContainer);
}