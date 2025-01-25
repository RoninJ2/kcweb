// Process section scroll
document.querySelector('.start-button').addEventListener('click', function() {
    const section = document.getElementById('process-section');
    const windowHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;
    const offset = (windowHeight - sectionHeight) / 2;
    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
    
    window.scrollTo({
        top: sectionPosition - Math.max(50, offset),
        behavior: 'smooth'
    });
});

// Contact section scroll
document.querySelector('.contact-scroll').addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.getElementById('contact-section');
    const windowHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;
    // Reduced offset to make it scroll lower
    const offset = (windowHeight - sectionHeight) / 3;
    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
    
    window.scrollTo({
        top: sectionPosition - offset + 100, // Added 100px to move it down further
        behavior: 'smooth'
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Function to scroll to contact section
    function scrollToContact() {
        const contactSection = document.querySelector('.contact');
        if (contactSection) {
            const yOffset = -100;
            const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }

    // Check hash on page load
    if (window.location.hash === '#contact') {
        // Delay to ensure everything is loaded
        setTimeout(scrollToContact, 100);
    }

    // Listen for hash changes
    window.addEventListener('hashchange', function() {
        if (window.location.hash === '#contact') {
            scrollToContact();
        }
    });

    // Handle contact link clicks
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.hash = '#contact';
            scrollToContact();
        });
    });

    // Check if we should scroll to contact
    if (localStorage.getItem('scrollToContact') === 'true') {
        localStorage.removeItem('scrollToContact'); // Clear the flag
        const section = document.getElementById('contact-section');
        if (section) {
            setTimeout(() => {
                const windowHeight = window.innerHeight;
                const sectionHeight = section.offsetHeight;
                const offset = (windowHeight - sectionHeight) / 3;
                const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: sectionPosition - offset + 100,
                    behavior: 'smooth'
                });
            }, 100); // Small delay to ensure page is loaded
        }
    }

    // Check for scroll parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('scroll') === 'contact') {
        // Remove the parameter from URL without refreshing
        window.history.replaceState({}, '', 'index.html');
        
        // Small delay to ensure page is ready
        setTimeout(() => {
            const section = document.getElementById('contact-section');
            if (section) {
                const windowHeight = window.innerHeight;
                const sectionHeight = section.offsetHeight;
                const offset = (windowHeight - sectionHeight) / 3;
                const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: sectionPosition - offset + 100,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const inputs = document.querySelectorAll('.form-input');

    // Smooth label animation when input has content
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.length > 0) {
                input.classList.add('has-content');
            } else {
                input.classList.remove('has-content');
            }
        });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Add your form submission logic here
        // For now, just show a success message
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = `
            <span class="button-text">message sent!</span>
            <span class="button-icon">✓</span>
        `;
        
        submitButton.style.backgroundColor = '#4CAF50';
        submitButton.style.color = '#ffffff';
        
        // Reset after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.style.color = '';
            form.reset();
        }, 3000);
    });
});
