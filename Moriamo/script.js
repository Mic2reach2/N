// script.js
document.addEventListener('DOMContentLoaded', () => {
    
    /* ==================== HERO SLIDER ==================== */
    const heroSlider = document.querySelector('.hero-slider');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderDots = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    if (heroSlides.length > 0) {
        // Create dots
        heroSlides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        function goToSlide(index) {
            heroSlides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            heroSlides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            const next = (currentSlide + 1) % heroSlides.length;
            goToSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
            goToSlide(prev);
        }

        // Arrow navigation
        const prevBtn = heroSlider.querySelector('.slider-arrow.prev');
        const nextBtn = heroSlider.querySelector('.slider-arrow.next');
        
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });

        // Auto-advance
        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }
        
        startInterval();

        // Pause on hover
        heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        heroSlider.addEventListener('mouseleave', startInterval);
    }

    /* ==================== MOBILE MENU ==================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });

        // Close menu on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close mobile menu when clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.book-card, .blog-post, .about-section, .contact-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simple form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission (replace with actual submission logic)
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Add hover effects for book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero text (optional enhancement - disabled on mobile)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero background (subtle)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
        }
    });

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Back to top button functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    /* ==================== BOOK CAROUSEL ==================== */
    const bookCarousel = document.querySelector('.book-carousel-wrapper');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    let carouselInterval;
    let isDown = false;
    let startX;
    let scrollLeft;
    
    if (bookCarousel) {
        const scrollAmount = 340;
        
        // Touch swipe support for mobile
        bookCarousel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - bookCarousel.offsetLeft;
            scrollLeft = bookCarousel.scrollLeft;
            stopCarouselAutoSlide();
        }, { passive: true });
        
        bookCarousel.addEventListener('touchend', () => {
            isDown = false;
            startCarouselAutoSlide();
        }, { passive: true });
        
        bookCarousel.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - bookCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            bookCarousel.scrollLeft = scrollLeft - walk;
        }, { passive: false });
        
        // Mouse drag support
        bookCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - bookCarousel.offsetLeft;
            scrollLeft = bookCarousel.scrollLeft;
            bookCarousel.style.cursor = 'grabbing';
            stopCarouselAutoSlide();
        });
        
        bookCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            bookCarousel.style.cursor = 'grab';
            startCarouselAutoSlide();
        });
        
        bookCarousel.addEventListener('mouseup', () => {
            isDown = false;
            bookCarousel.style.cursor = 'grab';
            startCarouselAutoSlide();
        });
        
        bookCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - bookCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            bookCarousel.scrollLeft = scrollLeft - walk;
        });
        
        // Auto-slide function
        function autoSlideNext() {
            const maxScroll = bookCarousel.scrollWidth - bookCarousel.clientWidth;
            if (bookCarousel.scrollLeft >= maxScroll - 10) {
                // Reset to beginning if at end
                bookCarousel.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                bookCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
        
        // Start auto-sliding
        function startCarouselAutoSlide() {
            carouselInterval = setInterval(autoSlideNext, 4000); // Slide every 4 seconds
        }
        
        function stopCarouselAutoSlide() {
            clearInterval(carouselInterval);
        }
        
        // Start auto-slide
        startCarouselAutoSlide();
        
        // Pause on hover
        bookCarousel.addEventListener('mouseenter', stopCarouselAutoSlide);
        bookCarousel.addEventListener('mouseleave', startCarouselAutoSlide);
        
        if (carouselPrev) {
            carouselPrev.addEventListener('click', () => {
                bookCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                stopCarouselAutoSlide();
                setTimeout(startCarouselAutoSlide, 4000);
            });
        }
        
        if (carouselNext) {
            carouselNext.addEventListener('click', () => {
                bookCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                stopCarouselAutoSlide();
                setTimeout(startCarouselAutoSlide, 4000);
            });
        }
        
        // Update button states
        bookCarousel.addEventListener('scroll', () => {
            if (carouselPrev) {
                carouselPrev.disabled = bookCarousel.scrollLeft <= 0;
            }
            if (carouselNext) {
                carouselNext.disabled = bookCarousel.scrollLeft >= (bookCarousel.scrollWidth - bookCarousel.clientWidth - 10);
            }
        });
    }

    /* ==================== NEWSLETTER FORM ==================== */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value.trim();
            if (email) {
                alert('Thank you for subscribing! You will receive updates at: ' + email);
                newsletterForm.reset();
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});