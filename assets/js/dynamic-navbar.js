// Dynamic Navbar JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header-bar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Close mobile menu when clicking on overlay
    mobileNavOverlay.addEventListener('click', function() {
        closeMobileMenu();
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && !mobileNav.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Prevent body scroll when mobile menu is open
    function toggleBodyScroll(disable) {
        if (disable) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    function toggleMobileMenu() {
        const isActive = mobileNav.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mobileMenuBtn.classList.add('active');
        mobileNav.classList.add('active');
        mobileNavOverlay.classList.add('active');
        toggleBodyScroll(true);
    }
    
    function closeMobileMenu() {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        toggleBodyScroll(false);
    }
    
    // Dynamic background detection
    function detectBackground() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Get the element behind the navbar
        const elementBelow = document.elementFromPoint(
            window.innerWidth / 2, 
            header.offsetTop + header.offsetHeight / 2
        );
        
        if (elementBelow) {
            const computedStyle = window.getComputedStyle(elementBelow);
            const backgroundColor = computedStyle.backgroundColor;
            
            // Check if background is white or light
            const isWhiteBackground = isLightColor(backgroundColor);
            
            if (isWhiteBackground) {
                header.classList.remove('dark-bg');
                header.classList.add('white-bg');
            } else {
                header.classList.remove('white-bg');
                header.classList.add('dark-bg');
            }
        }
        
        // Alternative method: scroll-based detection
        if (scrollY > windowHeight * 0.95) {
            header.classList.remove('white-bg');
            header.classList.add('dark-bg');
        } else {
            header.classList.remove('dark-bg');
            header.classList.add('white-bg');
        }
    }
    
    // Helper function to determine if a color is light
    function isLightColor(color) {
        // Remove 'rgb(' and ')' and split by commas
        const rgb = color.replace('rgb(', '').replace(')', '').split(',').map(Number);
        
        if (rgb.length === 3) {
            // Calculate luminance
            const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
            return luminance > 0.5;
        }
        
        // Default to dark if we can't determine
        return false;
    }
    
    // Scroll-based navbar behavior
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        // Hide/show navbar based on scroll direction
        if (scrollY > lastScrollY && scrollY > 100) {
            // Scrolling down - hide navbar
            header.style.transform = 'translateY(-160%)';
        } else {
            // Scrolling up - show navbar
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    // Event listeners
    window.addEventListener('scroll', function() {
        requestTick();
        detectBackground();
    });
    
    window.addEventListener('resize', function() {
        detectBackground();
    });
    
    // Initial detection
    detectBackground();
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-item');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
    
    // Taglines Animation
    const taglineCards = document.querySelectorAll('.tagline-card');
    
    taglineCards.forEach((card, index) => {
        // Staggered animation on load
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        });
        
        // Click animation
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-8px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-12px) scale(1.03)';
            }, 150);
        });
    });
    
    // Parallax effect for taglines on scroll
    function updateTaglinesParallax() {
        const scrollY = window.scrollY;
        const taglinesSection = document.querySelector('.taglines-section');
        
        if (taglinesSection) {
            const speed = 0.5;
            taglinesSection.style.transform = `translateX(-50%) translateY(${scrollY * speed}px)`;
        }
    }
    
    // Fade hide animation for taglines
    function updateTaglinesFade() {
        const scrollY = window.scrollY;
        const taglinesSection = document.querySelector('.taglines-section');
        const windowHeight = window.innerHeight;
        
        if (taglinesSection) {
            // Calculate fade based on scroll position
            // Start fading when scroll begins, complete fade at 300px
            const fadeStart = 0;
            const fadeEnd = 300;
            const fadeRange = fadeEnd - fadeStart;
            
            let opacity = 1;
            if (scrollY > fadeStart) {
                const fadeProgress = Math.min((scrollY - fadeStart) / fadeRange, 1);
                opacity = 1 - fadeProgress;
            }
            
            // Apply fade with smooth transition
            taglinesSection.style.opacity = opacity;
            taglinesSection.style.transition = 'opacity 0.3s ease-out';
            
            // Hide completely when opacity is very low
            if (opacity < 0.1) {
                taglinesSection.style.pointerEvents = 'none';
            } else {
                taglinesSection.style.pointerEvents = 'auto';
            }
        }
    }
    
    window.addEventListener('scroll', updateTaglinesParallax);
    window.addEventListener('scroll', updateTaglinesFade);
});
