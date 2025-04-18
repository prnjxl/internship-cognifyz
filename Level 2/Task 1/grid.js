// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu when clicking a link
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Normally you would send the data to a server here
                // For demo purposes, we'll just show a success message
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending...';
                
                // Simulate server response
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalText;
                    
                    // Show success message
                    const successAlert = document.createElement('div');
                    successAlert.className = 'alert alert-success mt-3';
                    successAlert.innerHTML = 'Thank you! Your message has been sent successfully.';
                    contactForm.appendChild(successAlert);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successAlert.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Membership plan selection
    const planCards = document.querySelectorAll('.plan-card');
    if (planCards.length > 0) {
        planCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove selected class from all cards
                planCards.forEach(c => c.classList.remove('selected-plan'));
                
                // Add selected class to clicked card
                this.classList.add('selected-plan');
                
                // Update selected plan in hidden input if it exists
                const selectedPlanInput = document.querySelector('#selected-plan');
                if (selectedPlanInput) {
                    const planName = this.querySelector('h3').textContent;
                    selectedPlanInput.value = planName;
                }
            });
        });
    }
    
    // Progress counter animation
    const progressSection = document.querySelector('#tech');
    const counters = document.querySelectorAll('.counter-number');
    let hasAnimated = false;
    
    function startCounters() {
        if (hasAnimated) return;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            let currentValue = 0;
            
            const updateCounter = () => {
                currentValue += increment;
                if (currentValue < target) {
                    counter.textContent = Math.floor(currentValue);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        hasAnimated = true;
    }
    
    // Check if tech section is in viewport
    function isInViewport(element) {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Start counter animation when scrolled into view
    window.addEventListener('scroll', function() {
        if (isInViewport(progressSection)) {
            startCounters();
        }
    });
    
    // Also check on initial load
    if (isInViewport(progressSection)) {
        startCounters();
    }
});