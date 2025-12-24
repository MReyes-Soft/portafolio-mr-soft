const lightModeBtn = document.querySelector(".light-mode-btn");
const darkModeBtn = document.querySelector(".dark-mode-btn");

lightModeBtn.addEventListener("click", setDarkMode);
darkModeBtn.addEventListener("click", setlightMode);

function setDarkMode(){
    __setUserTheme("dark");
}

function setlightMode(){
    __setUserTheme("light");
}

// Language Toggle
let currentLang = 'es';

function toggleLanguage() {
    const langText = document.getElementById('lang-text');
    const elements = document.querySelectorAll('[data-es][data-en]');
    
    if (currentLang === 'es') {
        currentLang = 'en';
        langText.textContent = 'ES';
        elements.forEach(el => {
            el.textContent = el.getAttribute('data-en');
        });
    } else {
        currentLang = 'es';
        langText.textContent = 'EN';
        elements.forEach(el => {
            el.textContent = el.getAttribute('data-es');
        });
    }
}

