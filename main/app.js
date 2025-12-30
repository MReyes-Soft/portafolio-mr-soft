// --- CONFIGURACIÓN DE ELEMENTOS ---
const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");
const topHeader = document.querySelector(".topheader");

// --- FUNCIONALIDAD DEL MENÚ MÓVIL ---
function toggleMenu() {
    menu.classList.toggle("menu_opened");
}

if (openMenuBtn) openMenuBtn.addEventListener("click", toggleMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener("click", toggleMenu);

// --- INTERSECTION OBSERVER (Navegación y Animaciones) ---
// Combinamos ambos en uno solo para mejor rendimiento
const observerOptions = {
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            const menuLink = document.querySelector(`.menu a[href="#${id}"]`);
            
            if (menuLink) {
                const currentSelected = document.querySelector(".menu a.selected");
                if (currentSelected) currentSelected.classList.remove("selected");
                menuLink.classList.add("selected");
            }
            
            // Si la sección tiene clase para animar
            if (entry.target.classList.contains('section')) {
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

// --- INICIALIZACIÓN Y EVENTOS ---
document.addEventListener('DOMContentLoaded', () => {
    // Observar enlaces y secciones
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
    menuLinks.forEach((link) => {
        link.addEventListener("click", () => menu.classList.remove("menu_opened"));
        
        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);
        if (targetSection) navObserver.observe(targetSection);
    });

    // Inicializar Slider si existe
    if (document.getElementById('projects-slider')) {
        initSlider('projects-slider');
        setInterval(() => nextSlide('projects-slider'), 10000);
    }
});


// --- SMOOTH SCROLL CORREGIDO ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = topHeader ? topHeader.offsetHeight : 0;
            window.scrollTo({
                top: target.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// --- LÓGICA DEL SLIDER (Global) ---
const sliderStates = {};

function initSlider(id) {
    if (!sliderStates[id]) sliderStates[id] = { current: 0 };
}

function updateSlider(id) {
    const s = document.getElementById(id);
    if (s) s.style.transform = `translateX(-${sliderStates[id].current * 100}%)`;
}

function nextSlide(id) {
    initSlider(id);
    const s = document.getElementById(id);
    if (!s) return;
    sliderStates[id].current = (sliderStates[id].current + 1) % s.children.length;
    updateSlider(id);
}