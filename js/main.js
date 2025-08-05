document.addEventListener("DOMContentLoaded", function () {
  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  // Testimonial carousel logic
  const testimonials = document.querySelectorAll(".testimonial-item");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");

  if (testimonials.length > 0) {
    let current = 0;

    function showTestimonial(index) {
      testimonials.forEach((item, i) => {
        item.classList.toggle("active", i === index);
      });
    }

    function nextTestimonial() {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    }

    function prevTestimonial() {
      current = (current - 1 + testimonials.length) % testimonials.length;
      showTestimonial(current);
    }

    // Event listeners for buttons
    nextBtn?.addEventListener("click", nextTestimonial);
    prevBtn?.addEventListener("click", prevTestimonial);

    // Auto-advance testimonials every 10 seconds
    setInterval(nextTestimonial, 10000);

    // Show first testimonial initially
    showTestimonial(0);
  }

  // YouTube background video optimization
  const heroSection = document.querySelector('.hero-section');
  const iframe = heroSection?.querySelector('iframe');
  
  if (heroSection && iframe) {
    // Store original src for performance optimization
    const originalSrc = iframe.src;
    
    // Intersection Observer for video performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Ensure video is playing when hero is visible
          if (!iframe.src.includes('autoplay=1')) {
            iframe.src = originalSrc;
          }
        } else {
          // Pause video when not visible (save bandwidth/performance)
          if (iframe.src.includes('autoplay=1')) {
            iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
          }
        }
      });
    }, {
      threshold: 0.1 // Trigger when 10% of hero section is visible
    });

    observer.observe(heroSection);

    // Handle mobile fallback - YouTube videos often don't work on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Add a fallback background image for mobile
      heroSection.style.backgroundImage = "url('images/dental-hero-fallback.jpg')";
      heroSection.style.backgroundSize = "cover";
      heroSection.style.backgroundPosition = "center";
      
      // Hide the YouTube iframe on mobile
      const youtubeContainer = heroSection.querySelector('.youtube-background');
      if (youtubeContainer) {
        youtubeContainer.style.display = 'none';
      }
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add loading state for YouTube video
  if (iframe) {
    iframe.addEventListener('load', function() {
      // Remove any loading spinner if you have one
      const loader = heroSection.querySelector('.video-loader');
      if (loader) {
        loader.style.display = 'none';
      }
    });
  }
});