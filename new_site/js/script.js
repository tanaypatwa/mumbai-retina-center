// Mumbai Retina Center - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mumbai Retina Center JS Loaded');

    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryMenu = document.getElementById('primary-menu');

    if (menuToggle && primaryMenu) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            primaryMenu.classList.toggle('active'); // You'll need to style .nav-menu.active
        });
    }

    // Placeholder for smooth scrolling (can be implemented with CSS scroll-behavior or JS)
    // Placeholder for image lazy loading
    // Placeholder for contact form validation (if any)
    // Placeholder for Google Maps integration

    // Active class for current page link (simple version based on URL)
    // This should ideally be set on each page's nav link directly for clarity,
    // but here's a JS way if needed, though direct HTML class is better.
    // const navLinks = document.querySelectorAll('.nav-menu a');
    // const currentPath = window.location.pathname.split("/").pop();
    // navLinks.forEach(link => {
    //     const linkPath = link.getAttribute('href').split("/").pop();
    //     if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
    //         link.classList.add('active');
    //     }
    // });
});
