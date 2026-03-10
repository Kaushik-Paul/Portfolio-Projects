function init404Page() {
    var bgElements = document.getElementById('bgElements');
    if (!bgElements) {
        return false;
    }

    var colors = ['#2563eb', '#0ea5e9', '#14b8a6', '#8b5cf6'];

    for (var index = 0; index < 15; index += 1) {
        var element = document.createElement('div');
        var size = Math.random() * 100 + 50;
        var posX = Math.random() * 100;
        var delay = Math.random() * 15;
        var duration = 18 + Math.random() * 12;
        var color = colors[Math.floor(Math.random() * colors.length)];

        element.className = 'bg-element';
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.style.left = posX + '%';
        element.style.bottom = -size + 'px';
        element.style.background = color;
        element.style.animation = 'floatUp ' + duration + 's ' + delay + 's infinite linear';

        bgElements.appendChild(element);
    }

    var homeLink = document.getElementById('homeLink');
    if (homeLink) {
        var isFromRedirect = window.location.pathname.startsWith('/redirects/') ||
            (document.referrer && document.referrer.indexOf('/redirects/') !== -1);

        homeLink.href = isFromRedirect ? '/#projects' : '/';
        homeLink.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.href = isFromRedirect ? '/#projects' : '/';
        });
    }

    return true;
}

function initAOS() {
    if (typeof AOS === 'undefined') {
        return;
    }

    AOS.init({
        duration: 700,
        once: true,
        easing: 'ease-out-cubic'
    });
}

function initNavigation() {
    var header = document.querySelector('header');
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.querySelector('.nav-links');
    var navLinkItems = document.querySelectorAll('.nav-links a');
    var sections = document.querySelectorAll('main section[id]');

    function updateHeader() {
        if (!header) {
            return;
        }

        header.classList.toggle('scrolled', window.scrollY > 16);
    }

    function closeMenu() {
        if (!hamburger || !navLinks) {
            return;
        }

        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            var isActive = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active', isActive);
            hamburger.setAttribute('aria-expanded', String(isActive));
            document.body.classList.toggle('menu-open', isActive);
        });

        navLinkItems.forEach(function (item) {
            item.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function (event) {
            if (!navLinks.classList.contains('active')) {
                return;
            }

            if (navLinks.contains(event.target) || hamburger.contains(event.target)) {
                return;
            }

            closeMenu();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 860) {
                closeMenu();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            var targetId = anchor.getAttribute('href');
            if (!targetId || targetId === '#') {
                return;
            }

            var targetElement = document.querySelector(targetId);
            if (!targetElement) {
                return;
            }

            event.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 90,
                behavior: 'smooth'
            });
        });
    });

    function highlightNav() {
        var scrollPosition = window.scrollY + 120;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');
            var matchingLink = document.querySelector('.nav-links a[href="#' + sectionId + '"]');

            if (!matchingLink) {
                return;
            }

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                matchingLink.classList.add('active');
            } else {
                matchingLink.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('scroll', highlightNav, { passive: true });
    window.addEventListener('load', highlightNav);
    updateHeader();
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.documentElement.classList.contains('error-404')) {
        init404Page();
        return;
    }

    initAOS();
    initNavigation();
});
