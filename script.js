document.addEventListener('DOMContentLoaded', function() {

    // Theme Toggle Logic
    const themeToggleButton = document.getElementById('theme-toggle');
    const sunIcon = '<i class="fa-solid fa-sun"></i>';
    const moonIcon = '<i class="fa-solid fa-moon"></i>';

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeToggleButton.innerHTML = sunIcon;
        } else {
            themeToggleButton.innerHTML = moonIcon;
        }
    }

    themeToggleButton.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Set initial theme on page load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply saved theme or system preference
    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const isExpanded = mainNav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Animate Service Cards on Scroll using Intersection Observer
    const serviceCards = document.querySelectorAll('.service-card');

    // Check if there are any service cards to observe
    if (serviceCards.length > 0) {
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the element is in the viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing the element so the animation doesn't re-trigger
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe each service card and add a staggered animation delay
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 75}ms`;
            observer.observe(card);
        });
    }

    // Smile Score Quiz Logic
    const quizForm = document.getElementById('quiz-form');
    const resultsDiv = document.getElementById('quiz-results');
    
    if (quizForm) {
        quizForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from reloading the page
    
        // Get selected answers
        const answers = {
            q1: quizForm.querySelector('input[name="q1"]:checked'),
            q2: quizForm.querySelector('input[name="q2"]:checked'),
            q3: quizForm.querySelector('input[name="q3"]:checked'),
            q4: quizForm.querySelector('input[name="q4"]:checked'),
            q5: quizForm.querySelector('input[name="q5"]:checked'),
            q6: quizForm.querySelector('input[name="q6"]:checked'),
            q7: quizForm.querySelector('input[name="q7"]:checked')
        };

        // Validate that all questions are answered
        if (Object.values(answers).some(answer => answer === null)) {
            // In a real app, you might show a more user-friendly error message inside the form
            alert('Please answer all questions to see your score!');
            return;
        }

        const score = Object.values(answers).reduce((total, answer) => total + parseInt(answer.value), 0);

        const resultData = {
            novice: {
                rank: 'Novice Navigator',
                message: "You're on the path! Every great adventure starts with a single step. Focusing a bit more on daily flossing can prevent future troubles. At your next visit, we can show you the easiest way to do it!",
                rankClass: 'novice',
                badgeClass: 'badge-novice'
            },
            adept: {
                rank: 'Adept Adventurer',
                message: "You're doing a great job navigating your oral health! You have solid habits. To level up your adventure, let's ensure you're using the right toothbrush and technique at your next check-up.",
                rankClass: 'adept',
                badgeClass: 'badge-adept'
            },
            guardian: {
                rank: 'Guardian of the Gums',
                message: "Wow, you're a true Guardian of the Gums! Your dedication is fantastic. For your next quest, consider a professional polish to make that healthy smile truly sparkle. Keep up the amazing work!",
                rankClass: 'guardian',
                badgeClass: 'badge-guardian'
            }
        };

        let result;
        if (score <= 5) { // Adjusted score threshold for 7 questions
            result = resultData.novice;
        } else if (score <= 10) { // Adjusted score threshold
            result = resultData.adept;
        } else {
            result = resultData.guardian;
        }

        // Display results
        resultsDiv.innerHTML = `
            <div class="result-badge ${result.badgeClass}">${result.rank}</div>
            <p>${result.message}</p>
            <a href="index.html#contact" class="btn btn-primary" style="margin-top: 20px;">Book Your Next Check-up</a>
        `;

        resultsDiv.className = 'quiz-results'; // Reset classes to base
        resultsDiv.classList.add(result.rankClass); // Add new rank class for styling
        resultsDiv.style.display = 'block';

        // Scroll to the results
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Scroll to Top Button Logic
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        // Show button if user scrolls down 300px
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

});