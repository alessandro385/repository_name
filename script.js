document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
    let isAnimating = false;

    function showSlide(newIndex, direction) {
        if (isAnimating || newIndex === currentSlide) return;
        isAnimating = true;

        const oldSlide = slides[currentSlide];
        const newSlide = slides[newIndex];

        // Set direction class on the new slide for entry animation
        newSlide.className = 'slide'; // Reset classes first
        newSlide.classList.add(direction === 'next' ? 'entering-next' : 'entering-prev');
        newSlide.classList.add('active'); // Make it active to be visible for animation

        // Set direction class on the old slide for exit animation
        if (oldSlide) {
            oldSlide.classList.remove('active'); // No longer the main active slide
            oldSlide.classList.add(direction === 'next' ? 'exiting-next' : 'exiting-prev');
        }
        
        currentSlide = newIndex;

        // Re-trigger animations for elements within the new slide
        const animatedElements = newSlide.querySelectorAll('.animated-title, .animated-subtitle, .animated-text, .animated-list li, .animated-image, .animated-heading, .animated-text-block, .animated-list-left li, .animated-cta');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = '';
        });

        // Update button visibility
        prevBtn.style.display = currentSlide === 0 ? 'none' : 'inline-block';
        nextBtn.style.display = currentSlide === slides.length - 1 ? 'none' : 'inline-block';

        // Clean up animation classes after they complete
        const animationDuration = 900; // Should match CSS animation/transition duration
        setTimeout(() => {
            if (oldSlide) {
                oldSlide.className = 'slide'; // Fully reset old slide classes
            }
            // Ensure new slide only has 'slide' and 'active'
            newSlide.className = 'slide active'; 
            isAnimating = false;
        }, animationDuration);
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

    // Initialize first slide
    if (slides.length > 0) {
        slides[currentSlide].className = 'slide active'; // Start with first slide active, no entry animation needed on load
        prevBtn.style.display = 'none';
        if (slides.length === 1) {
            nextBtn.style.display = 'none';
        }
        // Trigger initial animations for the first slide elements
        const initialAnimatedElements = slides[currentSlide].querySelectorAll('.animated-title, .animated-subtitle, .animated-text, .animated-list li, .animated-image, .animated-heading, .animated-text-block, .animated-list-left li, .animated-cta');
        initialAnimatedElements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = '';
        });
    }
}); 