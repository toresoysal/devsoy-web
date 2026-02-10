/* ============================================
   Dev/Soy Danışmanlık - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ==================
    // 1. NAVBAR SCROLL EFFECT
    // ==================
    const navbar = document.querySelector('.navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Initial check

    // ==================
    // 2. SMOOTH SCROLL FOR ANCHOR LINKS
    // ==================
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 10;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================
    // 3. ANIMATE ON SCROLL (Intersection Observer)
    // ==================
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        const animateObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    animateObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animateElements.forEach(el => {
            animateObserver.observe(el);
        });
    } else {
        // Fallback: show all elements if IntersectionObserver not supported
        animateElements.forEach(el => el.classList.add('visible'));
    }

    // ==================
    // 4. CONTACT FORM HANDLER
    // ==================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            // Validation
            if (!name || !email || !message) {
                showAlert('Lütfen tüm zorunlu alanları doldurun.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showAlert('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }

            // Success
            showAlert('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.', 'success');
            contactForm.reset();
        });
    }

    // ==================
    // 5. MOBILE MENU - Close on Link Click
    // ==================
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    }

    // ==================
    // 6. SERVICE CARD CLICK HANDLER
    // ==================
    document.addEventListener('click', function(e) {
        const card = e.target.closest('.service-card');
        if (card) {
            const link = card.querySelector('a[href]');
            if (link && !e.target.matches('a, a *')) {
                window.location.href = link.href;
            }
        }
    });

}); // End DOMContentLoaded


// ==================
// UTILITY FUNCTIONS
// ==================

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showAlert(message, type) {
    // Remove existing alerts
    document.querySelectorAll('.custom-alert').forEach(el => el.remove());

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show custom-alert`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Kapat"></button>
    `;

    alertDiv.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 9999;
        max-width: 420px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        border-radius: 8px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.style.opacity = '0';
            alertDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }
    }, 5000);
}


// ==================
// BACK TO TOP BUTTON
// ==================
(function() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Sayfanın başına dön');
    document.body.appendChild(btn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }, { passive: true });

    btn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();


// ==================
// PRELOADER (if exists)
// ==================
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 300);
    }
});
