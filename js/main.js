/* ===================================
   NAVIGATION MOBILE
   =================================== */

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobil
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Închide meniul când se apasă pe un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Închide meniul când se dă click în afara lui
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

/* ===================================
   SCROLL ACTIV PENTRU NAVIGATION
   =================================== */

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ===================================
   NAVBAR STICKY CU SHADOW
   =================================== */

const navbar = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(44, 34, 40, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(44, 34, 40, 0.1)';
    }
    
    lastScroll = currentScroll;
});

/* ===================================
   FILTRARE DESIGN GALLERY
   =================================== */

const filterBtns = document.querySelectorAll('.filter-btn');
const designItems = document.querySelectorAll('.design-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Elimină clasa active de pe toate butoanele
        filterBtns.forEach(b => b.classList.remove('active'));
        // Adaugă clasa active pe butonul apăsat
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        designItems.forEach(item => {
            // Ascunde toate itemele
            item.style.display = 'none';
            item.style.opacity = '0';
            
            // Arată itemele care corespund filtrului
            if (filterValue === 'tous' || item.getAttribute('data-category').includes(filterValue)) {
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 10);
                }, 100);
            }
        });
    });
});

/* ===================================
   ANIMAȚIE PROGRESS BARS
   =================================== */

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const progressBars = document.querySelectorAll('.competence-progress');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
            
            progressObserver.unobserve(bar);
        }
    });
}, observerOptions);

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

/* ===================================
   ANIMAȚIE FADE IN PENTRU SECȚIUNI
   =================================== */

const fadeElements = document.querySelectorAll('.projet-card, .design-item, .competence-category');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

/* ===================================
   SMOOTH SCROLL PENTRU LINKS
   =================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // 80px pentru navbar height
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ===================================
   COUNTER ANIMATION PENTRU HIGHLIGHTS
   =================================== */

const highlightNumbers = document.querySelectorAll('.highlight-number');

const countUp = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const number = parseInt(target);
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = isPercentage ? `${number}%` : `${number}+`;
            clearInterval(timer);
        } else {
            element.textContent = isPercentage ? `${Math.floor(current)}%` : `${Math.floor(current)}+`;
        }
    }, 16);
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

highlightNumbers.forEach(number => {
    counterObserver.observe(number);
});

/* ===================================
   GESTIONARE FORMULAR CONTACT
   =================================== */

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validare simplă
        if (nom && email && message) {
            // Aici poți adăuga logica pentru trimiterea formularului
            // De exemplu, folosind EmailJS sau un backend
            
            alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
            contactForm.reset();
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
}

/* ===================================
   MODAL PENTRU PROIECTE (OPȚIONAL)
   =================================== */

const btnVoirPlus = document.querySelectorAll('.btn-voir-plus, .btn-details');

btnVoirPlus.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Găsește proiectul părinte
        const projetCard = btn.closest('.projet-card, .design-item');
        const projetTitle = projetCard.querySelector('h3').textContent;
        
        // Creează modal simplu
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${projetTitle}</h2>
                <div class="modal-body">
                    <div class="image-placeholder large">
                        <p>Galerie complète du projet<br>${projetTitle}</p>
                    </div>
                    <div class="modal-info">
                        <h3>Description Complète</h3>
                        <p>Ici vous pouvez ajouter une description détaillée du projet, les défis rencontrés, les solutions apportées, et les résultats obtenus.</p>
                        
                        <h3>Outils Utilisés</h3>
                        <ul>
                            <li>Adobe Photoshop</li>
                            <li>Adobe Illustrator</li>
                            <li>Canva Pro</li>
                        </ul>
                        
                        <h3>Résultats</h3>
                        <p>Impact mesurable de la campagne ou du projet.</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animație de deschidere
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
        
        // Închide modal
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
});

/* ===================================
   STILURI CSS PENTRU MODAL (Adaugă în CSS)
   =================================== */

const modalStyles = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(44, 34, 40, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
        overflow-y: auto;
    }
    
    .modal-content {
        background-color: white;
        border-radius: 12px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        padding: 40px;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .modal-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #ffd600;
        color: #2c2228;
        font-size: 24px;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background-color: #2c2228;
        color: #ffd600;
        transform: rotate(90deg);
    }
    
    .modal-body {
        margin-top: 30px;
    }
    
    .modal-body h3 {
        color: #2c2228;
        margin-top: 30px;
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    
    .modal-body p {
        color: #666666;
        line-height: 1.7;
        margin-bottom: 20px;
    }
    
    .modal-body ul {
        list-style: none;
        padding-left: 0;
    }
    
    .modal-body ul li {
        padding: 8px 0;
        padding-left: 25px;
        position: relative;
        color: #666666;
    }
    
    .modal-body ul li::before {
        content: '→';
        position: absolute;
        left: 0;
        color: #ffd600;
        font-weight: bold;
    }
    
    .modal-info {
        margin-top: 30px;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            padding: 30px 20px;
            margin: 20px;
        }
        
        .modal-close {
            top: 10px;
            right: 10px;
            width: 35px;
            height: 35px;
        }
    }
`;

// Adaugă stilurile pentru modal în document
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

/* ===================================
   TYPING EFFECT PENTRU HERO (OPȚIONAL)
   =================================== */

const heroSubtitle = document.querySelector('.hero-subtitle');

if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    const typeText = () => {
        if (index < originalText.length) {
            heroSubtitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeText, typingSpeed);
        }
    };
    
    // Începe efectul după ce pagina se încarcă
    window.addEventListener('load', () => {
        setTimeout(typeText, 500);
    });
}

/* ===================================
   LAZY LOADING PENTRU IMAGINI (când le adaugi)
   =================================== */

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

/* ===================================
   PARALLAX EFFECT PENTRU HERO (OPȚIONAL)
   =================================== */

const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

/* ===================================
   PRELOADER (OPȚIONAL)
   =================================== */

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    }
});

/* ===================================
   COPIERE EMAIL LA CLICK
   =================================== */

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const email = link.textContent;
        
        navigator.clipboard.writeText(email).then(() => {
            // Creează tooltip temporar
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Email copié !';
            tooltip.style.cssText = `
                position: absolute;
                background-color: #ffd600;
                color: #2c2228;
                padding: 8px 12px;
                border-radius: 5px;
                font-size: 0.85rem;
                font-weight: 600;
                pointer-events: none;
                z-index: 1000;
                animation: fadeInOut 2s ease;
            `;
            
            link.parentElement.style.position = 'relative';
            link.parentElement.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    });
});

// Animație pentru tooltip
const tooltipAnimation = document.createElement('style');
tooltipAnimation.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(10px); }
        20% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-10px); }
    }
`;
document.head.appendChild(tooltipAnimation);

/* ===================================
   SCROLL TO TOP BUTTON
   =================================== */

// Creează butonul
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"/>
    </svg>
`;
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.setAttribute('aria-label', 'Retour en haut');
document.body.appendChild(scrollTopBtn);

// Stilizare buton
const scrollBtnStyles = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #ffd600;
        color: #2c2228;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 16px rgba(44, 34, 40, 0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .scroll-top-btn.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-top-btn:hover {
        background-color: #2c2228;
        color: #ffd600;
        transform: translateY(-5px);
    }
    
    @media (max-width: 768px) {
        .scroll-top-btn {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;

const scrollBtnStyleSheet = document.createElement('style');
scrollBtnStyleSheet.textContent = scrollBtnStyles;
document.head.appendChild(scrollBtnStyleSheet);

// Afișare/ascundere buton
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Funcționalitate scroll to top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ===================================
   PRINT FRIENDLY
   =================================== */

window.addEventListener('beforeprint', () => {
    // Ascunde elementele care nu trebuie printate
    document.querySelector('.scroll-top-btn')?.style.setProperty('display', 'none', 'important');
    document.querySelector('.hamburger')?.style.setProperty('display', 'none', 'important');
});

window.addEventListener('afterprint', () => {
    // Restaurează elementele
    document.querySelector('.scroll-top-btn')?.style.removeProperty('display');
    document.querySelector('.hamburger')?.style.removeProperty('display');
});

/* ===================================
   CONSOLĂ MESAJ PRIETENOS
   =================================== */

console.log('%c👋 Bonjour !', 'color: #ffd600; font-size: 24px; font-weight: bold;');
console.log('%cVous aimez explorer le code ? Moi aussi ! 😊', 'color: #2c2228; font-size: 14px;');
console.log('%cPortfolio créé avec passion par Nicoleta Bejan', 'color: #666666; font-size: 12px;');

/* ===================================
   PERFORMANCE MONITORING (OPȚIONAL)
   =================================== */

if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.loadTime > 3000) {
                console.warn('Attention: Temps de chargement lent détecté');
            }
        }
    });
    
    observer.observe({ entryTypes: ['navigation'] });
}

/* ===================================
   FIN SCRIPT
   =================================== */

console.log('%c✅ Portfolio chargé avec succès !', 'color: #ffd600; font-size: 14px; font-weight: bold;');
