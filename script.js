// Typing effect for hero section
const typingText = document.querySelector('.typing-text');
const roles = [
    "Data Science Engineer",
    "AI & ML Enthusiast",
    "LLM & Generative AI Explorer"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;
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

// Contact form: sends the message to my Gmail through Web3Forms
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            });
            const result = await response.json();

            if (response.ok && result.success) {
                formStatus.textContent = 'Thank you! Your message has been sent. I will get back to you soon.';
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            formStatus.textContent = 'Sorry, your message could not be sent. Please email me directly at jerbi.meriem2007@gmail.com.';
            formStatus.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}