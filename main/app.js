const menu = document.querySelector(".menu");
const openMenuBtn = document.querySelector(".open-menu");
const closeMenuBtn = document.querySelector(".close-menu");

function toggleMenu() {
    menu.classList.toggle("menu_opened");
}

openMenuBtn.addEventListener("click", toggleMenu);
closeMenuBtn.addEventListener("click", toggleMenu);

const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const id = entry.target.getAttribute("id");
            const menuLink = document.querySelector(`.menu a[href="#${id}"]`);

            if (entry.isIntersecting) {
                document.querySelector(".menu a.selected").classList.remove("selected");
                menuLink.classList.add("selected");
            }
        });
    },
    { rootMargin: "-30% 0px -70% 0px" }
);

menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", function () {
        menu.classList.remove("menu_opened");
    });

    const hash = menuLink.getAttribute("href");
    const target = document.querySelector(hash);
    if (target) {
        observer.observe(target);
    }
});


// Slider functionality
const sliderStates = {};

function initSlider(sliderId) {
    if (!sliderStates[sliderId]) {
        sliderStates[sliderId] = { currentSlide: 0 };
    }
}

function nextSlide(sliderId) {
    initSlider(sliderId);
    const slider = document.getElementById(sliderId);
    const slides = slider.children;
    const totalSlides = slides.length;
    
    sliderStates[sliderId].currentSlide = (sliderStates[sliderId].currentSlide + 1) % totalSlides;
    updateSlider(sliderId);
}

function previousSlide(sliderId) {
    initSlider(sliderId);
    const slider = document.getElementById(sliderId);
    const slides = slider.children;
    const totalSlides = slides.length;
    
    sliderStates[sliderId].currentSlide = (sliderStates[sliderId].currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider(sliderId);
}

function updateSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    const translateX = -sliderStates[sliderId].currentSlide * 100;
    slider.style.transform = `translateX(${translateX}%)`;
}

// Initialize sliders
document.addEventListener('DOMContentLoaded', function() {
    initSlider('projects-slider');
    
    

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Auto-rotate sliders (optional)

    setInterval(() => {
        nextSlide('projects-slider');
    }, 10000);
});

// Mobile menu functionality (for future enhancement)
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth scroll behavior for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--bg-card)';
        header.style.backdropFilter = 'blur(10px)';
    }
});
