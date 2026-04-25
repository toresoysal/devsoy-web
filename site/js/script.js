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
    // FORMSPREE CONFIG
    // Formspree'den form endpoint almak için:
    // 1. https://formspree.io adresine git, ücretsiz üye ol
    // 2. "New Form" oluştur → devsoyconsultancy@gmail.com gir
    // 3. Verilen 8 karakterli form ID'yi aşağıya yaz (xpwdxxxx gibi)
    // ==================
    var FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqyopdz';

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
                }, 5500);
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
        // 7. CONTACT FORM — Formspree entegrasyonu
        // ==================
        var contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                var nameEl    = document.getElementById('name');
                var emailEl   = document.getElementById('email');
                var phoneEl   = document.getElementById('phone');
                var messageEl = document.getElementById('message');
                var submitBtn = contactForm.querySelector('button[type="submit"]');

                if (!nameEl || !emailEl || !messageEl) return;

                var nameVal  = nameEl.value.trim();
                var emailVal = emailEl.value.trim();
                var phoneVal = phoneEl ? phoneEl.value.trim() : '';
                var msgVal   = messageEl.value.trim();

                if (!nameVal || !emailVal || !msgVal) {
                    showAlert('Lütfen tüm zorunlu alanları doldurun.', 'error');
                    return;
                }

                if (!validateEmail(emailVal)) {
                    showAlert('Lütfen geçerli bir e-posta adresi girin.', 'error');
                    return;
                }

                // Formspree endpoint henüz yapılandırılmadıysa uyar
                if (FORMSPREE_ENDPOINT.indexOf('FORM_ID_BURAYA') !== -1) {
                    showAlert('Form henüz yapılandırılmadı. Lütfen WhatsApp veya e-posta ile ulaşın.', 'error');
                    return;
                }

                // Submit butonu loading state
                var origHTML = submitBtn ? submitBtn.innerHTML : '';
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Gönderiliyor...';
                    submitBtn.disabled = true;
                }

                fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name: nameVal,
                        email: emailVal,
                        phone: phoneVal,
                        message: msgVal,
                        _subject: 'Yeni İletişim Formu — Dev/Soy Danışmanlık'
                    })
                })
                .then(function(res) {
                    if (res.ok) {
                        showAlert('Mesajınız başarıyla iletildi! 24 saat içinde geri dönüş sağlıyoruz.', 'success');
                        contactForm.reset();
                    } else {
                        return res.json().then(function(data) {
                            throw new Error(data.error || 'Gönderim hatası');
                        });
                    }
                })
                .catch(function() {
                    showAlert('Bir hata oluştu. Lütfen doğrudan <a href="mailto:devsoyconsultancy@gmail.com" style="color:#C9A84C;">e-posta</a> veya WhatsApp ile ulaşın.', 'error');
                })
                .finally(function() {
                    if (submitBtn) {
                        submitBtn.innerHTML = origHTML;
                        submitBtn.disabled = false;
                    }
                });
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
    // WHATSAPP FLOATING BUTTON
    // ==================
    (function() {
        var wa = document.createElement('a');
        wa.href = 'https://wa.me/905391084979?text=Merhaba%2C%20Dev%2FSoy%20Dan%C4%B1%C5%9Fmanl%C4%B1k%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.';
        wa.target = '_blank';
        wa.rel = 'noopener noreferrer';
        wa.className = 'ds-whatsapp-float';
        wa.setAttribute('aria-label', 'WhatsApp ile iletişime geç');
        wa.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.558 4.116 1.535 5.845L.057 23.492a.5.5 0 00.614.633l5.807-1.523A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.726 9.726 0 01-5.007-1.384l-.36-.213-3.726.977.994-3.634-.234-.373A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>';
        document.body.appendChild(wa);
    })();

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
