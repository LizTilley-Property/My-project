
// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('.intro-section, .about-section, .services-section, .portfolio-section, .contact-section, .about-timeline, .portfolio-testimonials, .service-card, .portfolio-card, .testimonial-card, .timeline-item');
    
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Stagger animation for cards
    const cards = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Timeline items stagger
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // Parallax effect for hero background
    const heroSection = document.querySelector('.hero-section');
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroSection && heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // Add hover effects to navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced button hover effects
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact form enhancements
    const contactInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    contactInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add loading animation to images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Portfolio video hover effects
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        const video = card.querySelector('iframe');
        if (video) {
            card.addEventListener('mouseenter', function() {
                video.style.transform = 'scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                video.style.transform = 'scale(1)';
            });
        }
    });

    // Add typing animation to hero text
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid var(--accent)';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => {
                    heroTitle.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    // Add floating animation to hero photos
    const heroPhotos = document.querySelectorAll('.hero-photo-large, .hero-photo-small');
    heroPhotos.forEach((photo, index) => {
        photo.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
    });

    // Carousel functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselImages = document.querySelectorAll('.carousel-image');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (carouselTrack && carouselImages.length > 0) {
        let currentIndex = 0;
        const totalImages = carouselImages.length;
        
        function updateCarousel() {
            const containerWidth = carouselTrack.parentElement.offsetWidth;
            const imageWidth = containerWidth / 3; // Show 3 images at once
            const translateX = -currentIndex * imageWidth;
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        }
        
        function nextImage() {
            if (currentIndex < totalImages - 3) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }
        
        function prevImage() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = Math.max(0, totalImages - 3);
            }
            updateCarousel();
        }
        
        // Initialize carousel position
        updateCarousel();
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextImage);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevImage);
        }
        
        // Auto-rotate carousel every 4 seconds
        setInterval(nextImage, 4000);
        
        // Add touch/swipe support for mobile
        let startX = 0;
        let isDragging = false;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        carouselTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        carouselTrack.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextImage();
                } else {
                    prevImage();
                }
            }
        });
    }

    // Add CSS for floating animation
    const floatKeyframes = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = floatKeyframes;
    document.head.appendChild(styleSheet);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll indicator
window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    let indicator = document.querySelector('.scroll-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'scroll-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrolled}%;
            height: 3px;
            background: linear-gradient(90deg, var(--accent), var(--accent-dark));
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);
    } else {
        indicator.style.width = scrolled + '%';
    }
});
