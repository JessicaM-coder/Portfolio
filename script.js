/* DARK MODE */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeLabel = themeToggle.querySelector(".theme-label");

const updateThemeToggle = () => {

    const isDark =
        document.body.classList.contains("dark-mode");

    themeIcon.textContent = isDark ? "☀️" : "🌙";
    themeLabel.textContent = isDark ? "Light mode" : "Dark mode";
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
    );
};

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme","dark");
    }
    else{
        localStorage.setItem("theme","light");
    }

    updateThemeToggle();
});

/* LOAD SAVED THEME */

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add("dark-mode");
}

updateThemeToggle();

/* SCROLL REVEAL*/

const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill-card"
);

const revealOnScroll = () => {

    revealElements.forEach((element) => {

        const elementTop =
            element.getBoundingClientRect().top;

        const windowHeight =
            window.innerHeight;

        if(elementTop < windowHeight - 100){

            element.classList.add("show");
        }
    });
};

window.addEventListener(
    "scroll",
    revealOnScroll
);

revealOnScroll();

/* ACTIVE NAVIGATION*/

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if(
            link.getAttribute("href") ===
            `#${current}`
        ){
            link.classList.add("active");
        }
    });
});

/* HERO PARALLAX EFFECT */

window.addEventListener("mousemove", (e) => {

    const circle =
        document.querySelector(".circle");

    const square =
        document.querySelector(".square");

    const cross =
        document.querySelector(".cross");

    const x =
        (window.innerWidth / 2 - e.pageX) / 50;

    const y =
        (window.innerHeight / 2 - e.pageY) / 50;

    if(circle){

        circle.style.transform =
            `translate(${x}px, ${y}px)`;
    }

    if(square){

        square.style.transform =
            `translate(${-x}px, ${-y}px) rotate(45deg)`;
    }

    if(cross){

        cross.style.transform =
            `translate(${x * 1.5}px, ${y * 1.5}px)`;
    }
});

/* PROJECT CARD HOVER TILT*/

const cards =
    document.querySelectorAll(".project-card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -8;

        const rotateY =
            ((x / rect.width) - 0.5) * 8;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0)";
    });
});

/* TYPING EFFECT*/

const subtitle =
    document.querySelector(".hero h2");

if(subtitle){

    const text =
        subtitle.textContent;

    subtitle.textContent = "";

    let index = 0;

    function typeText(){

        if(index < text.length){

            subtitle.textContent +=
                text.charAt(index);

            index++;

            setTimeout(typeText, 40);
        }
    }

    typeText();
}
