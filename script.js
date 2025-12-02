// ===========================================
// 1. Smooth Scrolling for Navigation Links
// ===========================================

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior

        const targetId = this.getAttribute('href'); // Get the ID from the href (e.g., "#about")
        const targetSection = document.querySelector(targetId); // Find the actual section element

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - (document.querySelector('nav').offsetHeight), // Scroll to top of section, adjust for fixed nav height
                behavior: 'smooth' // Make the scroll smooth
            });
        }
    });
});

// ===========================================
// 2. Sticky Navigation Bar
// ===========================================

const nav = document.querySelector('nav'); // Select your navigation element
const heroSection = document.getElementById('hero'); // Get the hero section

// Function to add/remove 'sticky' class
function makeNavSticky() {
    // Get the bottom position of the hero section relative to the viewport
    const heroBottom = heroSection.getBoundingClientRect().bottom;

    if (heroBottom <= 0) { // If hero section has scrolled past the top of the viewport
        nav.classList.add('sticky');
    } else {
        nav.classList.remove('sticky');
    }
}

// Listen for scroll events
window.addEventListener('scroll', makeNavSticky);

// ===========================================
// 3. Basic Scroll Reveal Animation
// ===========================================

// Select elements you want to animate on scroll
const elementsToAnimate = document.querySelectorAll(
    '#about .about-flex, ' +
    '#skills .skill-category, ' +
    '#portfolio .project-card, ' +
    '#insights .insight-card, ' +
    '#contact h2, #contact .section-description, #contact .contact-links, #contact .social-links'
);

// Create an Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // If the element is currently visible in the viewport
            entry.target.classList.add('fade-in'); // Add a class to trigger CSS animation
            observer.unobserve(entry.target); // Stop observing once it's animated
        }
    });
}, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -100px 0px' // Start animation a bit before it's fully in view
});

// Observe each element
elementsToAnimate.forEach(element => {
    element.classList.add('hidden-initial'); // Add initial hidden state
    observer.observe(element);
});