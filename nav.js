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
                <a href="${prefix}#what-you-get">How I Work</a>
                <a href="${prefix}#portfolio">Portfolio</a>
                <a href="${prefix}#about">About</a>
                <a href="${prefix}#expertise">Expertise</a>
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
    // WORKING TOGETHER SECTION
    // ============================================
    // Content defined once, templates adapt to page context
    const workingTogetherContent = {
        role: {
            title: 'Current Role',
            text: '<strong>Head of Agentic AI at Intellegens</strong> (Cambridge, UK). Visiting Expert at University of Leicester.'
        },
        focus: {
            title: 'Focus Areas',
            text: 'Uncertainty-aware ML, decision intelligence, agentic AI systems, and data-to-insight solutions for enterprise R&D.'
        },
        contact: {
            title: 'Contact',
            text: 'Questions or want to connect? <a href="mailto:joelstrickland.ai@gmail.com" style="color: var(--accent-2);">joelstrickland.ai@gmail.com</a>'
        }
    };
    
    const workingTogetherHTML = isCV ? `
    <div id="working-together" style="margin: 40px 0;">
        <h2>At a Glance</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px;">
            <div style="flex: 1; min-width: 200px;">
                <h5 style="font-size: 1rem; margin-bottom: 8px;">${workingTogetherContent.role.title}</h5>
                <p class="small" style="color: var(--text-3);">${workingTogetherContent.role.text}</p>
            </div>
            <div style="flex: 1; min-width: 200px;">
                <h5 style="font-size: 1rem; margin-bottom: 8px;">${workingTogetherContent.focus.title}</h5>
                <p class="small" style="color: var(--text-3);">${workingTogetherContent.focus.text}</p>
            </div>
            <div style="flex: 1; min-width: 200px;">
                <h5 style="font-size: 1rem; margin-bottom: 8px;">${workingTogetherContent.contact.title}</h5>
                <p class="small" style="color: var(--text-3);">${workingTogetherContent.contact.text}</p>
            </div>
        </div>
    </div>
    ` : ``;
    
    // Insert Working Together section if placeholder exists
    const workingTogetherPlaceholder = document.getElementById('working-together-placeholder');
    if (workingTogetherPlaceholder) {
        workingTogetherPlaceholder.outerHTML = workingTogetherHTML;
    }
    
    // ============================================
    // FOOTER
    // ============================================
    // CV page: simpler footer without container (inherits .cv-content width)
    // Homepage: footer with container for full-width layout
    const footerHTML = isCV ? `
    <footer class="text-center" style="padding: 40px 0; border-top: 1px solid var(--border);">
        <p style="margin-bottom: 8px;"><strong>Joel Strickland, PhD, CEng</strong></p>
        <p>&copy; ${new Date().getFullYear()} Joel Strickland. All rights reserved.</p>
        <p>
            <a href="https://www.linkedin.com/in/joel-strickland" target="_blank" rel="noopener noreferrer" style="color: white; margin: 0 10px;">LinkedIn</a> |
            <a href="mailto:joelstrickland.ai@gmail.com" style="color: white; margin: 0 10px;">Email</a> |
            <a href="index.html" style="color: white; margin: 0 10px;">Home</a>
        </p>
    </footer>
    ` : `
    <footer class="text-center">
        <div class="container">
            <p style="margin-bottom: 8px;"><strong>Joel Strickland, PhD, CEng</strong></p>
            <p>&copy; ${new Date().getFullYear()} Joel Strickland. All rights reserved.</p>
            <p>
                <a href="https://www.linkedin.com/in/joel-strickland" target="_blank" rel="noopener noreferrer" style="color: white; margin: 0 10px;">LinkedIn</a> |
                <a href="mailto:joelstrickland.ai@gmail.com" style="color: white; margin: 0 10px;">Email</a> |
                <a href="cv.html" style="color: white; margin: 0 10px;">CV</a>
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
