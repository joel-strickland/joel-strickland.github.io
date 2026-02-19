// Shared components for joel-strickland.github.io
// Navigation, Working Together section, and Footer
// Edit here to update all pages at once

(function() {
    const isCV = window.location.pathname.includes('cv.html');
    const prefix = isCV ? 'index.html' : '';
    
    // ============================================
    // NAVIGATION
    // ============================================
    const navHTML = `
    <nav class="main-nav">
        <div class="container">
            <a href="index.html" class="brand">Joel Strickland</a>
            <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
                <span></span>
            </button>
            <div class="nav-links">
                <a href="${prefix}#about">About</a>
                <a href="${prefix}#expertise">Expertise</a>
                <a href="${prefix}#portfolio">Portfolio</a>
                <a href="${prefix}#what-you-get">How I Work</a>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-toggle">
                        More
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 4l4 4 4-4"/>
                        </svg>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${prefix}#tech-stack">Tech Stack</a>
                        <a href="${prefix}#faq">FAQ</a>
                        <a href="${prefix}#contact">Contact</a>
                    </div>
                </div>
                <a href="cv.html"${isCV ? ' class="active"' : ''}>CV</a>
                <a href="mailto:joelstrickland.ai@gmail.com" class="btn-contact">Contact</a>
            </div>
        </div>
    </nav>
    <div class="nav-overlay"></div>
    `;
    
    // Insert navigation at the start of body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // ============================================
    // FOOTER
    // ============================================
    const footerHTML = isCV ? `
    <footer class="text-center" style="padding: 40px 0; border-top: 1px solid var(--border);">
        <div class="container">
            <p style="margin-bottom: 8px; text-align: center;"><strong>Joel Strickland, PhD, CEng</strong></p>
            <p style="text-align: center;">&copy; ${new Date().getFullYear()} Joel Strickland. All rights reserved.</p>
            <p style="text-align: center;">
                <a href="https://www.linkedin.com/in/joel-strickland" target="_blank" rel="noopener noreferrer" style="margin: 0 10px;">LinkedIn</a> |
                <a href="mailto:joelstrickland.ai@gmail.com" style="margin: 0 10px;">Email</a> |
                <a href="index.html" style="margin: 0 10px;">Home</a>
            </p>
        </div>
    </footer>
    ` : `
    <footer class="text-center">
        <div class="container">
            <p style="margin-bottom: 8px; text-align: center;"><strong>Joel Strickland, PhD, CEng</strong></p>
            <p style="text-align: center;">&copy; ${new Date().getFullYear()} Joel Strickland. All rights reserved.</p>
            <p style="text-align: center;">
                <a href="https://www.linkedin.com/in/joel-strickland" target="_blank" rel="noopener noreferrer" style="margin: 0 10px;">LinkedIn</a> |
                <a href="mailto:joelstrickland.ai@gmail.com" style="margin: 0 10px;">Email</a> |
                <a href="cv.html" style="margin: 0 10px;">CV</a>
            </p>
        </div>
    </footer>
    `;
    
    // Insert footer if placeholder exists
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = footerHTML;
    }
    
    // ============================================
    // MOBILE NAV TOGGLE
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    
    function toggleNav() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        navToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    }
    
    if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', toggleNav);
    }
    
    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                toggleNav();
            }
        });
    });
})();
