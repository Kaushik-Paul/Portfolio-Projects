// 404 Page Specific Functionality
function init404Page() {
    const bgElements = document.getElementById('bgElements');
    if (!bgElements) return false;

    const colors = ['#4f46e5', '#8b5cf6', '#6366f1', '#a78bfa'];
    
    // Create animated background elements
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = 20 + Math.random() * 20;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        element.className = 'bg-element';
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${posX}%`;
        element.style.bottom = `-${size}px`;
        element.style.background = color;
        element.style.animation = `floatUp ${duration}s ${delay}s infinite linear`;
        
        bgElements.appendChild(element);
    }

    // Handle redirect path for home link
    if (window.location.pathname.startsWith('/redirect/')) {
        const homeLink = document.querySelector('.error-home-link');
        if (homeLink) {
            homeLink.href = '/redirect/';
        }
    }
    
    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if this is the 404 page
    const is404Page = document.documentElement.classList.contains('error-404');
    
    // Initialize 404 page if this is the 404 page
    if (is404Page && init404Page()) {
        return; // Skip the rest of the initialization for 404 page
    }
    
    // Initialize AOS (Animate On Scroll) for non-404 pages
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out',
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button, .project-card, .skill');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover class to cursor when hovering over interactive elements
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });

        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky header on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');

    function highlightNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`a[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    window.addEventListener('load', highlightNav);

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('aos-animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});