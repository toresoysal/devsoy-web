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
    const SLIDE_COUNT = 4;
    const COUNTER_DURATION = 2000; // ms for counter animation
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
        // 1. VIDEO HERO CONTROLLER
        // ==================
        const heroSection = document.querySelector('.ds-hero');

        if (heroSection) {
            const videos = heroSection.querySelectorAll('.ds-hero__video');
            const slideTexts = heroSection.querySelectorAll('.ds-hero__slide-text');
            const progressItems = heroSection.querySelectorAll('.ds-hero__progress-item');
            const slideLabels = heroSection.querySelectorAll('.ds-hero__slide-label');

            let currentSlide = 0;
            let slideTimer = null;
            let isTransitioning = false;

            function goToSlide(index) {
                if (isTransitioning || index === currentSlide) return;
                isTransitioning = true;

                // Remove active from current
                videos[currentSlide].classList.remove('active');
                slideTexts[currentSlide].classList.remove('active');
                progressItems[currentSlide].classList.remove('active');
                slideLabels[currentSlide].classList.remove('active');

                // Pause previous video
                videos[currentSlide].pause();
                videos[currentSlide].currentTime = 0;

                // Set new
                currentSlide = index;

                // Activate new
                videos[currentSlide].classList.add('active');
                slideTexts[currentSlide].classList.add('active');
                progressItems[currentSlide].classList.add('active');
                slideLabels[currentSlide].classList.add('active');

                // Play new video
                var playPromise = videos[currentSlide].play();
                if (playPromise !== undefined) {
                    playPromise.catch(function() {
                        // Autoplay blocked - silently handle
                    });
                }

                // Reset timer
                clearInterval(slideTimer);
                startSlideTimer();

                setTimeout(function() {
                    isTransitioning = false;
                }, 800);
            }

            function nextSlide() {
                var next = (currentSlide + 1) % SLIDE_COUNT;
                goToSlide(next);
            }

            function startSlideTimer() {
                slideTimer = setInterval(nextSlide, SLIDE_DURATION);
            }

            // Initialize: play first video
            function initHero() {
                var playPromise = videos[0].play();
                if (playPromise !== undefined) {
                    playPromise.catch(function() {
                        // Autoplay blocked - show content anyway
                    });
                }
                startSlideTimer();
            }

            // Click on progress items
            progressItems.forEach(function(item, i) {
                item.addEventListener('click', function() {
                    goToSlide(i);
                });
            });

            // Click on labels
            slideLabels.forEach(function(label, i) {
                label.addEventListener('click', function() {
                    goToSlide(i);
                });
            });

            // Pause on hover (desktop only)
            if (window.matchMedia('(hover: hover)').matches) {
                heroSection.addEventListener('mouseenter', function() {
                    clearInterval(slideTimer);
                });
                heroSection.addEventListener('mouseleave', function() {
                    startSlideTimer();
                });
            }

            // Wait for first video to be ready then init
            if (videos[0].readyState >= 3) {
                initHero();
            } else {
                videos[0].addEventListener('canplay', initHero, { once: true });
                // Fallback: init after timeout even if video not ready
                setTimeout(function() {
                    if (!slideTimer) initHero();
                }, 2000);
            }
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
            navLinks.querySelectorAll('.ds-navbar__link, .ds-navbar__cta').forEach(function(link) {
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
        // 4. SMOOTH SCROLL
        // ==================
        document.querySelectorAll('a[href^="#"]').forEach(function(link) {
            link.addEventListener('click', function(e) {
                var targetId = this.getAttribute('href').substring(1);
                if (!targetId) return;

                var target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    var navHeight = navbar ? navbar.offsetHeight : 72;
                    var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;

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
        // 6. COUNTER ANIMATION
        // ==================
        var statNumbers = document.querySelectorAll('.ds-stat__number[data-count]');

        if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
            var counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.5
            });

            statNumbers.forEach(function(el) {
                counterObserver.observe(el);
            });
        }

        function animateCounter(el) {
            var target = parseInt(el.getAttribute('data-count'), 10);
            var start = 0;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / COUNTER_DURATION, 1);

                // Easing: easeOutExpo
                var eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                var current = Math.floor(eased * target);

                // Format number
                if (target >= 1000) {
                    el.textContent = current.toLocaleString('tr-TR');
                } else {
                    el.textContent = current;
                }

                // Add suffix
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    // Final value with suffix
                    var suffix = '';
                    var label = el.closest('.ds-stat') ? el.closest('.ds-stat').querySelector('.ds-stat__label') : null;
                    if (label) {
                        var labelText = label.textContent.toLowerCase();
                        if (labelText.includes('%')) {
                            suffix = '%';
                        } else if (labelText.includes('yillik') || target === 20) {
                            suffix = '+';
                        } else if (target > 100) {
                            suffix = '+';
                        }
                    }

                    if (target >= 1000) {
                        el.textContent = target.toLocaleString('tr-TR') + suffix;
                    } else {
                        el.textContent = target + suffix;
                    }
                }
            }

            requestAnimationFrame(step);
        }

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
        // ==================
        var sections = document.querySelectorAll('section[id]');
        var navLinksAll = document.querySelectorAll('.ds-navbar__link');

        if (sections.length > 0 && navLinksAll.length > 0) {
            window.addEventListener('scroll', function() {
                var scrollPos = window.scrollY + 150;

                sections.forEach(function(section) {
                    var top = section.offsetTop;
                    var height = section.offsetHeight;
                    var id = section.getAttribute('id');

                    if (scrollPos >= top && scrollPos < top + height) {
                        navLinksAll.forEach(function(link) {
                            link.classList.remove('ds-navbar__link--active');
                            var href = link.getAttribute('href');
                            if (href === '#' + id) {
                                link.classList.add('ds-navbar__link--active');
                            }
                        });
                    }
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
