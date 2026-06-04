document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // Dark/Light Mode Theme Toggle Logic
    // ==========================================================================
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector("i");

    // Check localStorage for saved theme preferences, otherwise fallback to device preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute("data-theme", "dark");
        updateThemeIcon("dark");
    } else {
        htmlElement.setAttribute("data-theme", "light");
        updateThemeIcon("light");
    }

    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        if (currentTheme === "light") {
            htmlElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            updateThemeIcon("dark");
        } else {
            htmlElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            updateThemeIcon("light");
        }
    });

    function updateThemeIcon(theme) {
        if (theme === "dark") {
            themeIcon.className = "fas fa-sun";
        } else {
            themeIcon.className = "fas fa-moon";
        }
    }

    // ==========================================================================
    // Mobile Navigation & Hamburger Menu Logic
    // ==========================================================================
    const hamburger = document.getElementById("hamburger");
    const navLinksList = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links a");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinksList.classList.toggle("active");
    });

    // Close the mobile menu automatically upon navigation click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinksList.classList.remove("active");
        });
    });

    // Close mobile menu when clicking outside of navbar wrapper
    document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navLinksList.contains(e.target)) {
            hamburger.classList.remove("active");
            navLinksList.classList.remove("active");
        }
    });

    // ==========================================================================
    // Interactive Sticky & Adaptive Navbar Height on Scroll
    // ==========================================================================
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // ==========================================================================
    // Scroll-Reveal Fade-in Animation Observer
    // ==========================================================================
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-visible");
                observer.unobserve(entry.target); // Trigger animation once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(".scroll-reveal");
    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // Dynamic Active Section Link Highlighting on Scroll
    // ==========================================================================
    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Subtracting small offset to ensure precise transition
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================================================
    // Custom Typewriter Effect (Hero Subtitle)
    // ==========================================================================
    const typewriterElement = document.getElementById("typewriter-text");
    const roles = ["Diploma Student", "Computer Science & Tech", "Aspiring Web Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypewriter() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster than typing
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at the end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Short break before starting next word
        }

        setTimeout(handleTypewriter, typingSpeed);
    }

    // Initialize the Typewriter execution loop
    handleTypewriter();

    // ==========================================================================
    // Contact Form Logic (Form Submission Action)
    // ==========================================================================
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Simple success UI indication. Formspree/EmailJS can be integrated here.
        const submitBtn = contactForm.querySelector(".submit-btn");
        const originalText = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;

        setTimeout(() => {
            submitBtn.innerHTML = `<span>Sent Successfully!</span> <i class="fas fa-check"></i>`;
            submitBtn.style.backgroundColor = "#10B981"; // Transition to dynamic green color on success
            submitBtn.style.borderColor = "#10B981";
            
            contactForm.reset();

            // Reset back button state after several seconds delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = "";
                submitBtn.style.borderColor = "";
            }, 3000);
        }, 1500);
    });
});