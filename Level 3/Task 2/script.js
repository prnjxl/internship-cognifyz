document.addEventListener('DOMContentLoaded', function() {
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        });
    });
    

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        highlightNavOnScroll();
    });

    const modal = document.getElementById('terms-modal');
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const closeModalButton = document.getElementById('close-modal-btn');
    
    learnMoreBtn.addEventListener('click', function() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; 
    }
    
    closeModalBtn.addEventListener('click', closeModal);
    closeModalButton.addEventListener('click', closeModal);
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    const applyButtons = [
        document.getElementById('apply-btn'),
        document.getElementById('benefits-apply-btn'),
        document.getElementById('main-apply-btn'),
        document.getElementById('modal-apply-btn'),
        ...document.querySelectorAll('.nav-cta')
    ];
    
    applyButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const redirectUrl = "https://docs.google.com/forms/d/e/1FAIpQLSe5yfyq3SHoVmUP3FUrXh0jAjy6Fbr-zQ5admZDR0gRWyJRgw/viewform";
                window.location.href = redirectUrl;
            });
        }
    });
    
    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY;
        
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-menu a:not(.nav-cta)');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
            
            if (scrollPosition < 100) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === '#home') {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {

                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.about-content, .benefit-card, .qualifications-content');
    
    // Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Handle form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert(`Thank you for subscribing with ${emailInput.value}! You'll receive updates about our internship opportunities.`);
                emailInput.value = '';
            }
        });
    }
    
    // Add CSS class for animation on load
    function addAnimationClass() {
        document.body.classList.add('loaded');
    }
    
    // Call function after slight delay for smooth animation effect
    setTimeout(addAnimationClass, 300);
});