/**
 * Journey Forge - Elite JavaScript
 * Interactive functionality and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            if (navLinks) {
                navLinks.classList.toggle('mobile-open');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .step-card, .testimonial-card, .blog-card').forEach(el => {
        observer.observe(el);
    });

    // Contact form handler
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]').value;
            const email = this.querySelector('[name="email"]').value;
            const message = this.querySelector('[name="message"]').value;
            
            // Show success message (in production, send to backend)
            showNotification(`Thanks ${name}! We'll contact you at ${email} soon.`);
            
            this.reset();
        });
    }

    // Newsletter form handler
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            showNotification(`Thanks for subscribing! We'll send updates to ${email}.`);
            
            this.reset();
        });
    }

    // Set active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Add parallax effect to hero (subtle)
    if (document.querySelector('.hero')) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * 0.3;
            
            if (scrolled < 800) {
                hero.style.backgroundPositionY = rate + 'px';
            }
        });
    }
});

// Notification system
function showNotification(message) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--dark);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-family: 'Outfit', sans-serif;
        font-size: 15px;
        max-width: 400px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;
document.head.appendChild(style);

// Mobile menu CSS (injected)
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 24px;
            gap: 0;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-links li {
            width: 100%;
        }
        
        .nav-links a {
            display: block;
            padding: 16px 0;
            border-bottom: 1px solid var(--lighter);
        }
        
        .nav-cta {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 16px 24px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
            display: flex;
            justify-content: center;
        }
        
        body.menu-open {
            overflow: hidden;
        }
    }
`;
document.head.appendChild(mobileMenuStyles);
