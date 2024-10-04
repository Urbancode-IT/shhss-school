/*const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPrevSlide() {
    showSlide(currentSlide - 1);
}

document.getElementById('nextSlide').addEventListener('click', showNextSlide);
document.getElementById('prevSlide').addEventListener('click', showPrevSlide);

setInterval(showNextSlide, 10000); // Change slide every 10 seconds
*/

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPrevSlide() {
    showSlide(currentSlide - 1);
}

document.getElementById('nextSlide').addEventListener('click', showNextSlide);
document.getElementById('prevSlide').addEventListener('click', showPrevSlide);

setInterval(showNextSlide, 10000); // Automatically change slides every 10 seconds
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of the element is visible
    };
  
    const elements = document.querySelectorAll('.animated-heading, .animated-paragraph, .animated-image');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = ''; // Reset animation
          void entry.target.offsetWidth; // Trigger reflow to restart the animation
  
          if (entry.target.classList.contains('animated-heading')) {
            entry.target.style.animation = 'slide-in 1s ease forwards';
          } else if (entry.target.classList.contains('animated-paragraph')) {
            entry.target.style.animation = 'jump-in 1s ease forwards 0.5s';
          } else if (entry.target.classList.contains('animated-image')) {
            entry.target.style.transition = 'transform 0.5s ease-in-out';
            entry.target.style.transform = 'scale(1.1)';
          }
  
          entry.target.style.opacity = 1;
        } else {
          // Optional: Reset opacity and transform when element is out of view
          entry.target.style.opacity = 0;
          entry.target.style.transform = 'scale(1)';
        }
      });
    }, observerOptions);
  
    elements.forEach(element => {
      observer.observe(element);
    });
  });
// Get elements
const playButton = document.getElementById('play-button');
const modal = document.getElementById('videoModal');
const closeBtn = document.querySelector('.close');
const video = document.getElementById('video');

// Open modal on play button click
playButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    video.src += '?autoplay=1';
});

// Close modal and stop video
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    video.src = video.src.replace('?autoplay=1', '');
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
        video.src = video.src.replace('?autoplay=1', '');
    }
});

  //number count

  document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-value');
    let hasAnimated = false;

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-count');
        const duration = 2000; // Animation duration in milliseconds
        const start = 0;
        const startTime = performance.now();

        function updateCounter(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const value = Math.floor(progress * target);
            counter.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    function checkCountersInView() {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

            if (isInView && !hasAnimated) {
                counters.forEach(c => animateCounter(c));
                hasAnimated = true; // Prevent reanimation
            }
        });
    }

    window.addEventListener('scroll', checkCountersInView);
    checkCountersInView(); // Initial check in case counters are already in view
});





