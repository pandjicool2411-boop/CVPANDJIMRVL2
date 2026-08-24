/* ==================================================
   MARVEL CV — INTERACTIONS
   ================================================== */

const navbar = document.getElementById("navbar");
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const themeButton = document.getElementById("themeButton");
const clickBurst = document.getElementById("clickBurst");
const pageTransition = document.getElementById("pageTransition");

/* Navbar scroll */
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
});

/* Mobile menu */
if (menuButton) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
        const icon = menuButton.querySelector("i");
        const open = navMenu.classList.contains("open");
        icon.classList.toggle("fa-bars", !open);
        icon.classList.toggle("fa-xmark", open);
    });
}

/* Active navigation */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.remove("active"));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add("active");
    });
}, { threshold: 0.25 });

sections.forEach(section => sectionObserver.observe(section));

/* Marvel-style menu click transition */
function playTransition() {
    if (!pageTransition) return;
    pageTransition.classList.remove("play");
    void pageTransition.offsetWidth;
    pageTransition.classList.add("play");
}

function fireBurst(x, y) {
    if (!clickBurst) return;
    clickBurst.style.left = `${x}px`;
    clickBurst.style.top = `${y}px`;
    clickBurst.classList.remove("fire");
    void clickBurst.offsetWidth;
    clickBurst.classList.add("fire");
}

navLinks.forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        event.preventDefault();
        fireBurst(event.clientX, event.clientY);
        playTransition();

        navMenu?.classList.remove("open");
        const icon = menuButton?.querySelector("i");
        if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

        setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 170);
    });
});

/* Generic click energy effect */
document.addEventListener("click", event => {
    const clickable = event.target.closest("button, .button, .hero-social a, .contact-social a, .hobi-chips span");
    if (clickable) fireBurst(event.clientX, event.clientY);
});

/* Theme button: cinematic alternate mode */
const savedTheme = localStorage.getItem("cv-theme");
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    if (themeButton) themeButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeButton?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const light = document.body.classList.contains("light-mode");
    localStorage.setItem("cv-theme", light ? "light" : "dark");
    themeButton.innerHTML = light
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    playTransition();
});

/* Scroll reveal */
const revealElements = document.querySelectorAll(
    ".section-heading, .about-grid, .education-item, .skills-empty, .hobi-grid, .dream-section, .timeline-item"
);

revealElements.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index * 35, 220)}ms`;
});

const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => revealObserver.observe(element));

/* Initial hero entrance */
window.addEventListener("load", () => {
    document.querySelector(".hero-content")?.classList.add("hero-ready");
});
