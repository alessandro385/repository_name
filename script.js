document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let isAnimating = false; // Flag to prevent multiple rapid clicks

    function showSlide(index, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const P_SLIDE = slides[currentSlide];

        // Determine direction for exiting animation if not specified
        if (direction === undefined) {
            direction = index > currentSlide ? 'next' : 'prev';
        }

        if (P_SLIDE) {
            P_SLIDE.classList.add('exiting');
            // The actual removal of 'active' and 'exiting' will happen after animation
        }

        currentSlide = index;
        const N_SLIDE = slides[currentSlide];

        // Reset animations for the new slide by removing and re-adding the class
        // This is a trick to re-trigger CSS animations on elements already in the DOM
        const animatedElements = N_SLIDE.querySelectorAll('.animated-title, .animated-subtitle, .animated-text, .animated-list li, .animated-image, .animated-heading, .animated-text-block, .animated-list-left li, .animated-cta');
        animatedElements.forEach(el => {
            el.style.animation = 'none'; // Temporarily disable animation
            el.offsetHeight; /* trigger reflow */
            el.style.animation = ''; // Re-enable animation
        });

        N_SLIDE.classList.remove('exiting'); // Make sure it's not trying to exit
        N_SLIDE.classList.add('active');

        // Update button visibility
        prevBtn.style.display = currentSlide === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = currentSlide === slides.length - 1 ? 'none' : 'inline-block';

        // Clean up classes after animations complete
        setTimeout(() => {
            if (P_SLIDE) {
                P_SLIDE.classList.remove('active');
                P_SLIDE.classList.remove('exiting');
            }
            isAnimating = false;
        }, 800); // Match CSS transition duration
    }

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1, 'prev');
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1, 'next');
        }
    });

    // Initialize first slide without 'exiting' animation for previous slide
    slides[currentSlide].classList.add('active');
    prevBtn.style.display = 'none';
    if (slides.length === 1) {
        nextBtn.style.display = 'none';
    }
     // Trigger initial animations for the first slide
    const initialAnimatedElements = slides[currentSlide].querySelectorAll('.animated-title, .animated-subtitle, .animated-text, .animated-list li, .animated-image, .animated-heading, .animated-text-block, .animated-list-left li, .animated-cta');
    initialAnimatedElements.forEach(el => {
        // Ensure animations play on load for the first active slide
        el.style.animation = 'none'; 
        el.offsetHeight; 
        el.style.animation = ''; 
    });
}); 