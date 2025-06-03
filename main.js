/* --- START: js/main.js --- */

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    // Toggle mobile navigation
    if (hamburgerMenu && mainNav) {
        hamburgerMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if the link is a dropdown toggle on mobile
            const parentLi = link.parentElement;
            const isDropdownToggle = parentLi.classList.contains('dropdown') && window.innerWidth <= 768;

            if (mainNav.classList.contains('active')) {
                if (!isDropdownToggle) { // Only close if not a dropdown toggle itself
                    mainNav.classList.remove('active');
                    hamburgerMenu.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Mobile Dropdown Toggle for "Services"
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');

    dropdowns.forEach(dropdown => {
        const dropdownToggleLink = dropdown.querySelector('a'); // The main link of the dropdown
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');

        if (dropdownToggleLink && dropdownMenu) {
            dropdownToggleLink.addEventListener('click', function (event) {
                if (window.innerWidth <= 768) { // Only on mobile
                    event.preventDefault(); // Prevent navigation for the main dropdown link
                    dropdown.classList.toggle('open-mobile-dropdown');
                    // No need to toggle dropdownMenu.style.display if using class .open-mobile-dropdown for CSS control
                }
                // On desktop, default link behavior proceeds (or hover works)
            });
        }
    });


    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerPanel = item.querySelector('.faq-answer');

        if (questionButton && answerPanel) {
            questionButton.addEventListener('click', () => {
                const isExpanded = questionButton.getAttribute('aria-expanded') === 'true' || false;

                // Optional: Close all other items
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         const otherQuestion = otherItem.querySelector('.faq-question');
                //         const otherAnswer = otherItem.querySelector('.faq-answer');
                //         otherQuestion.classList.remove('active');
                //         otherQuestion.setAttribute('aria-expanded', 'false');
                //         otherAnswer.style.maxHeight = null;
                //         otherAnswer.classList.remove('active');
                //     }
                // });

                questionButton.classList.toggle('active');
                questionButton.setAttribute('aria-expanded', !isExpanded);

                if (!isExpanded) {
                    answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                    answerPanel.classList.add('active');
                } else {
                    answerPanel.style.maxHeight = null;
                    answerPanel.classList.remove('active');
                }
            });
        }
    });

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scroll for anchor links (optional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Ensure it's a valid internal link and not just "#" or for a component like a tab/accordion
            if (href.length > 1 && document.querySelector(href)) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - varGet('--nav-height', 80); // Get nav height from CSS var or default
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Helper function to get CSS variable value (for smooth scroll offset)
    function varGet(name, fallback) {
        if (typeof window === 'undefined') return fallback;
        const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        if (value.endsWith('px')) return parseInt(value, 10);
        return value || fallback;
    }

});

/* --- END: js/main.js --- */
