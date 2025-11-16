// Typing effect for hero section
const typingText = document.querySelector('.typing-text');
const roles = ["Data Science Student", "AI & ML Enthusiast", "Generative AI Explorer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (!isDeleting) {
        // Type characters
        if (charIndex < currentRole.length) {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            setTimeout(typeEffect, 150);
        } else {
            // Pause before deleting
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 2000);
        }
    } else {
        // Delete characters
        if (charIndex > 0) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(typeEffect, 100);
        } else {
            // Move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 500);
        }
    }
}

// Start typing effect
setTimeout(typeEffect, 1000);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const appearOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('appear');
        }
    });
};

window.addEventListener('scroll', appearOnScroll);
window.addEventListener('load', appearOnScroll);

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}
