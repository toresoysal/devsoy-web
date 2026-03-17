/* ============================================
   Dev/Soy Danismanlik - Premium JavaScript
   Video Hero + Animations + Interactions
   ============================================ */

(function() {
    'use strict';

    // ==================
    // CONFIG
    // ==================
    const SLIDE_DURATION = 6000;   // ms per slide
    const SLIDE_COUNT = 5;
    // COUNTER_DURATION removed (trust marquee band uses CSS only)
    const NAVBAR_SCROLL_THRESHOLD = 60;

    // ==================
    // PRELOADER
    // ==================
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('ds-preloader--done');
                setTimeout(function() {
                    preloader.remove();
                }, 600);
            }, 300);
        });
    }

    initPreloader();

    // ==================
    // DOM READY
    // ==================
    document.addEventListener('DOMContentLoaded', function() {

        // ==================
        // 1. MARVEL PANELS — MOBILE CAROUSEL
        // ==================
        var heroPanels = document.getElementById('heroPanels');
        var panelDots = document.querySelectorAll('.ds-panels__dot');

        if (heroPanels && window.innerWidth <= 768) {
            var currentPanel = 0;
            var totalPanels = heroPanels.querySelectorAll('.ds-panel').length;
            var autoPlay = null;

            function goToPanel(n) {
                currentPanel = (n + totalPanels) % totalPanels;
                heroPanels.style.transform = 'translateX(-' + (currentPanel * 100) + 'vw)';
                panelDots.forEach(function(dot, i) {
                    dot.classList.toggle('active', i === currentPanel);
                });
            }

            function startAuto() {
                autoPlay = setInterval(function() {
                    goToPanel(currentPanel + 1);
                }, 4200);
            }

            function resetAuto() {
                clearInterval(autoPlay);
                startAuto();
            }

            // Dot clicks
            panelDots.forEach(function(dot) {
                dot.addEventListener('click', function() {
                    goToPanel(parseInt(this.getAttribute('data-idx'), 10));
                    resetAuto();
                });
            });

            // Touch swipe
            var touchX = 0;
            heroPanels.addEventListener('touchstart', function(e) {
                touchX = e.touches[0].clientX;
            }, { passive: true });
            heroPanels.addEventListener('touchend', function(e) {
                var dx = e.changedTouches[0].clientX - touchX;
                if (Math.abs(dx) > 45) {
                    goToPanel(currentPanel + (dx < 0 ? 1 : -1));
                    resetAuto();
                }
            }, { passive: true });

            startAuto();
        }

        // ==================
        // 2. NAVBAR SCROLL EFFECT
        // ==================
        const navbar = document.getElementById('navbar');

        function handleNavbarScroll() {
            if (!navbar) return;
            if (window.scrollY > NAVBAR_SCROLL_THRESHOLD) {
                navbar.classList.remove('ds-navbar--transparent');
                navbar.classList.add('ds-navbar--solid');
            } else {
                navbar.classList.add('ds-navbar--transparent');
                navbar.classList.remove('ds-navbar--solid');
            }
        }

        window.addEventListener('scroll', handleNavbarScroll, { passive: true });
        handleNavbarScroll();

        // ==================
        // 3. MOBILE NAV TOGGLE
        // ==================
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        if (navToggle && navLinks) {
            navToggle.addEventListener('click', function() {
                navToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.classList.toggle('nav-open');
            });

            // Close on link click
            navLinks.querySelectorAll('.ds-navbar__link, .ds-navbar__cta, .ds-navbar__dropdown-menu a').forEach(function(link) {
                link.addEventListener('click', function() {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('nav-open');
                });
            });

            // Close on outside click
            document.addEventListener('click', function(e) {
                if (navLinks.classList.contains('active') &&
                    !navLinks.contains(e.target) &&
                    !navToggle.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        }

        // ==================
        // 3b. MOBILE DROPDOWN TOGGLE
        // ==================
        var dropdowns = document.querySelectorAll('.ds-navbar__dropdown');
        dropdowns.forEach(function(dropdown) {
            var link = dropdown.querySelector('.ds-navbar__link');
            if (link) {
                link.addEventListener('click', function(e) {
                    // Only toggle on mobile (when hamburger is visible)
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('open');
                    }
                });
            }
        });

        // ==================
        // 4. SMOOTH SCROLL
        // (navbar height cached once — no layout read on every click)
        // ==================
        var cachedNavHeight = navbar ? navbar.offsetHeight : 72;
        window.addEventListener('resize', function() {
            cachedNavHeight = navbar ? navbar.offsetHeight : 72;
        }, { passive: true });

        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href').substring(1);
                if (!targetId) return;

                var target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    var top = target.getBoundingClientRect().top + window.pageYOffset - cachedNavHeight - 10;

                    window.scrollTo({
                        top: top,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ==================
        // 5. SCROLL REVEAL (Intersection Observer)
        // ==================
        var revealElements = document.querySelectorAll('.ds-reveal');

        if (revealElements.length > 0 && 'IntersectionObserver' in window) {
            var revealObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -60px 0px'
            });

            revealElements.forEach(function(el) {
                revealObserver.observe(el);
            });
        } else {
            revealElements.forEach(function(el) {
                el.classList.add('visible');
            });
        }

        // ==================
        // 6. (Removed - old counter animation replaced by CSS trust marquee band)
        // ==================

        // ==================
        // 7. CONTACT FORM
        // ==================
        var contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                var name = document.getElementById('name');
                var email = document.getElementById('email');
                var message = document.getElementById('message');

                if (!name || !email || !message) return;

                var nameVal = name.value.trim();
                var emailVal = email.value.trim();
                var msgVal = message.value.trim();

                if (!nameVal || !emailVal || !msgVal) {
                    showAlert('Lütfen tüm zorunlu alanları doldurun.', 'error');
                    return;
                }

                if (!validateEmail(emailVal)) {
                    showAlert('Lütfen geçerli bir e-posta adresi girin.', 'error');
                    return;
                }

                showAlert('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.', 'success');
                contactForm.reset();
            });
        }

        // ==================
        // 8. ACTIVE NAV LINK HIGHLIGHT
        // (layout values cached once — no forced reflow on scroll)
        // ==================
        var sections = document.querySelectorAll('section[id]');
        var navLinksAll = document.querySelectorAll('.ds-navbar__link');

        if (sections.length > 0 && navLinksAll.length > 0) {
            // Cache section positions — read layout once, outside scroll handler
            var sectionCache = [];
            function cacheSectionPositions() {
                sectionCache = [];
                sections.forEach(function(section) {
                    sectionCache.push({
                        top: section.offsetTop,
                        height: section.offsetHeight,
                        id: section.getAttribute('id')
                    });
                });
            }
            cacheSectionPositions();
            // Re-cache on resize (layout changes)
            window.addEventListener('resize', cacheSectionPositions, { passive: true });

            // rAF throttle: scroll handler runs max once per animation frame
            var rafPending = false;
            window.addEventListener('scroll', function() {
                if (rafPending) return;
                rafPending = true;
                requestAnimationFrame(function() {
                    rafPending = false;
                    var scrollPos = window.scrollY + 150;
                    sectionCache.forEach(function(s) {
                        if (scrollPos >= s.top && scrollPos < s.top + s.height) {
                            navLinksAll.forEach(function(link) {
                                link.classList.remove('ds-navbar__link--active');
                                if (link.getAttribute('href') === '#' + s.id) {
                                    link.classList.add('ds-navbar__link--active');
                                }
                            });
                        }
                    });
                });
            }, { passive: true });
        }

    }); // End DOMContentLoaded


    // ==================
    // UTILITY: Email Validation
    // ==================
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ==================
    // UTILITY: Alert
    // ==================
    function showAlert(message, type) {
        document.querySelectorAll('.ds-alert').forEach(function(el) { el.remove(); });

        var alertDiv = document.createElement('div');
        alertDiv.className = 'ds-alert ds-alert--' + (type === 'error' ? 'error' : 'success');
        alertDiv.innerHTML = '<span>' + message + '</span><button class="ds-alert__close" aria-label="Kapat">&times;</button>';

        document.body.appendChild(alertDiv);

        // Trigger animation
        requestAnimationFrame(function() {
            alertDiv.classList.add('ds-alert--show');
        });

        // Close button
        alertDiv.querySelector('.ds-alert__close').addEventListener('click', function() {
            dismissAlert(alertDiv);
        });

        // Auto dismiss
        setTimeout(function() {
            dismissAlert(alertDiv);
        }, 5000);
    }

    function dismissAlert(el) {
        if (!el || !el.parentNode) return;
        el.classList.remove('ds-alert--show');
        setTimeout(function() {
            if (el.parentNode) el.remove();
        }, 300);
    }

    // ==================
    // BACK TO TOP BUTTON
    // ==================
    (function() {
        var btn = document.createElement('button');
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.className = 'ds-back-to-top';
        btn.setAttribute('aria-label', 'Sayfanin basina don');
        document.body.appendChild(btn);

        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                btn.classList.add('ds-back-to-top--show');
            } else {
                btn.classList.remove('ds-back-to-top--show');
            }
        }, { passive: true });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    })();

})();
