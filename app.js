document.addEventListener("DOMContentLoaded", function () {
    // Animación de elementos al hacer scroll
    const fadeElements = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(element => observer.observe(element));
    
    // Menú de navegación interactivo
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.querySelector(".nav-menu");
    
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.classList.toggle("active");
        });
    }
    
    // Cerrar el menú al hacer clic en un enlace en celular
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            navToggle.classList.remove("active");
        });
    });
    
    // Resaltar enlace activo basado en la página actual
    const currentLocation = window.location.pathname;
    const navItems = document.querySelectorAll(".nav-link");
    navItems.forEach(item => {
        const navHref = item.getAttribute("href");
        if (currentLocation.includes(navHref) || 
            (currentLocation === "/" && navHref === "index.html")) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
    
    // Efecto de desplazamiento suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animación de la barra de navegación al hacer scroll
    let lastScrollTop = 0;
    const header = document.querySelector("header");
    
    window.addEventListener("scroll", () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.padding = "0.5rem 5%";
            header.style.background = "rgba(10, 10, 10, 0.95)";
        } else {
            header.style.padding = "1rem 5%";
            header.style.background = "rgba(15, 15, 15, 0.95)";
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            // Scroll hacia abajo
            header.style.transform = "translateY(-100%)";
        } else {
            // Scroll hacia arriba
            header.style.transform = "translateY(0)";
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    // Efecto de parallax para la sección hero
    const hero = document.querySelector(".hero");
    if (hero) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + "px";
        });
    }
    
    // Botón de volver arriba
    const createBackToTopButton = () => {
        const button = document.createElement("button");
        button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        button.classList.add("back-to-top");
        document.body.appendChild(button);
        
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                button.classList.add("visible");
            } else {
                button.classList.remove("visible");
            }
        });
        
        button.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    };
    
    createBackToTopButton();
    
    // Animación de entrada para las feature cards
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add("animate-in");
    });
});

// Añadir clase de animación al cargar la página
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    
    // Preloader (opcional)
    const preloader = document.querySelector(".preloader");
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 500);
    }
});