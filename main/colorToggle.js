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

