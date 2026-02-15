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
                <a href="${prefix}#services">Services</a>
                <a href="${prefix}#case-studies">Case Studies</a>
                <div class="nav-dropdown">
                    <button class="nav-dropdown-toggle">
                        More
                        <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 4l4 4 4-4"/>
                        </svg>
                    </button>
                    <div class="nav-dropdown-menu">
                        <a href="${prefix}#stats-section">Track Record</a>
                        <a href="${prefix}#tech-stack">Tech Stack</a>
                        <a href="${prefix}#expertise">Expertise</a>
                        <a href="${prefix}#publications">Research</a>
                        <a href="${prefix}#talks">Talks</a>
                        <a href="${prefix}#working-together">Working Together</a>
                    </div>
                </div>
                <a href="cv.html"${isCV ? ' class="active"' : ''}>CV</a>
                <a href="mailto:joelstrickland.ai@gmail.com?subject=Consulting%20Inquiry" class="btn-contact">Book a Call</a>
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
    const workingTogetherHTML = `
    <div class="container section" id="working-together">
        <div class="section-label">Logistics</div>
        <h2>Working Together</h2>
        <div class="row">
            <div class="col-md-4 mb-3">
                <h5 style="font-size: 1rem; margin-bottom: 8px;">Independent Consulting</h5>
                <p class="small text-muted mb-0">I consult through <strong>Promethean Technologies Ltd</strong>, fully separate from my employer. No IP conflicts, no use of employer resources. Happy to sign your confidentiality/IP terms.</p>
            </div>
            <div class="col-md-4 mb-3">
                <h5 style="font-size: 1rem; margin-bottom: 8px;">Delivery Model</h5>
                <p class="small text-muted mb-0">Project-based with agreed milestones and deadlines. Typical response time: &lt;24 hours. Async-first with scheduled syncs as needed. Fully remote.</p>
            </div>
            <div class="col-md-4 mb-3">
                <h5 style="font-size: 1rem; margin-bottom: 8px;">First Call</h5>
                <p class="small text-muted mb-0">We'll align on scope, deliverables, timeline, and acceptance criteria.</p>
            </div>
        </div>
    </div>
    `;
    
    // Insert Working Together section if placeholder exists
    const workingTogetherPlaceholder = document.getElementById('working-together-placeholder');
    if (workingTogetherPlaceholder) {
        workingTogetherPlaceholder.outerHTML = workingTogetherHTML;
    }
    
    // ============================================
    // FOOTER
    // ============================================
    const footerHTML = `
    <footer class="text-center">
        <div class="container">
            <p style="margin-bottom: 8px;">Consulting via <strong>Promethean Technologies</strong></p>
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
