/* ===================================
   YVC-CloudDev - Main JavaScript
   Interactive features & animations
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Navigation Toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- Back to Top ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---- Animated Counters ----
    const counters = [
        { el: document.getElementById('counterLessons'), target: 54 },
        { el: document.getElementById('counterProjects'), target: 12 },
        { el: document.getElementById('counterStudents'), target: 5200 },
    ];

    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;
        countersStarted = true;

        counters.forEach(({ el, target }) => {
            if (!el) return;
            let current = 0;
            const increment = Math.max(1, Math.floor(target / 60));
            const duration = 1500;
            const stepTime = duration / (target / increment);

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current >= 1000
                    ? (current / 1000).toFixed(1) + 'k+'
                    : current + '+';
            }, stepTime);
        });
    }

    // Start counters when hero is in view
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(heroStats);
    }

    // ---- Scroll Reveal Animations ----
    const faders = document.querySelectorAll(
        '.feature-card, .course-card, .project-card, .team-card, .value-card, ' +
        '.timeline-item, .workflow-step, .contact-info-card'
    );

    if (faders.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        faders.forEach(el => {
            el.classList.add('fade-in');
            revealObserver.observe(el);
        });
    }

    // ---- Testimonial Slider ----
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.getElementById('testimonialDots');
    let currentTestimonial = 0;
    let testimonialInterval;

    if (testimonialCards.length > 0 && testimonialDots) {
        // Create dots
        testimonialCards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('dot-btn');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
            dot.addEventListener('click', () => goToTestimonial(i));
            testimonialDots.appendChild(dot);
        });

        function goToTestimonial(index) {
            testimonialCards[currentTestimonial].classList.remove('active');
            testimonialDots.children[currentTestimonial].classList.remove('active');
            currentTestimonial = index;
            testimonialCards[currentTestimonial].classList.add('active');
            testimonialDots.children[currentTestimonial].classList.add('active');
        }

        function nextTestimonial() {
            goToTestimonial((currentTestimonial + 1) % testimonialCards.length);
        }

        // Auto-rotate
        testimonialInterval = setInterval(nextTestimonial, 5000);

        // Pause on hover
        const slider = document.getElementById('testimonialSlider');
        if (slider) {
            slider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
            slider.addEventListener('mouseleave', () => {
                testimonialInterval = setInterval(nextTestimonial, 5000);
            });
        }
    }

    // ---- Workflow Steps Animation ----
    const workflowSteps = document.querySelectorAll('.workflow-step');
    if (workflowSteps.length > 0) {
        let currentStep = 0;

        setInterval(() => {
            workflowSteps[currentStep].classList.remove('active');
            currentStep = (currentStep + 1) % workflowSteps.length;
            workflowSteps[currentStep].classList.add('active');
        }, 2500);
    }

    // ---- Course Filter ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            courseCards.forEach(card => {
                if (filter === 'all' || card.dataset.level === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.4s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ---- Contact Form ----
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.hidden = true;
                formSuccess.hidden = false;

                // Reset form
                contactForm.reset();
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    // ---- Newsletter Form ----
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input');
            const btn = form.querySelector('button');
            const origText = btn.textContent;

            btn.textContent = '✓ Subscribed!';
            btn.style.background = '#22c55e';
            input.value = '';

            setTimeout(() => {
                btn.textContent = origText;
                btn.style.background = '';
            }, 3000);
        });
    });

    // ---- Hero Particles ----
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(37, 99, 235, ${Math.random() * 0.15 + 0.05});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // Add particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
                25% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1.2); opacity: 0.8; }
                50% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0.8); opacity: 0.4; }
                75% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1.1); opacity: 0.7; }
            }
        `;
        document.head.appendChild(style);
    }

    // ---- Smooth anchor scrolling ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Typing effect for code block ----
    const codeBlock = document.querySelector('.code-body code');
    if (codeBlock) {
        const originalHTML = codeBlock.innerHTML;
        const originalText = codeBlock.textContent;
        let charIndex = 0;

        const codeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    codeBlock.innerHTML = '';
                    typeCode();
                    codeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        function typeCode() {
            if (charIndex <= originalText.length) {
                // Show progressive portion of original HTML
                codeBlock.innerHTML = originalHTML;
                charIndex = originalText.length; // Complete immediately for better UX
            }
        }

        codeObserver.observe(codeBlock.closest('.code-window'));
    }

});
