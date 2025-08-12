document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

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

    nextBtn?.addEventListener("click", nextTestimonial);
    prevBtn?.addEventListener("click", prevTestimonial);

    setInterval(nextTestimonial, 10000);

    showTestimonial(0);
  }

  const heroSection = document.querySelector('.hero-section');
  const iframe = heroSection?.querySelector('iframe');
  
  if (heroSection && iframe) {
    const originalSrc = iframe.src;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
        if (!iframe.src.includes('autoplay=1')) {
            iframe.src = originalSrc;
          }
        } else {
          if (iframe.src.includes('autoplay=1')) {
            iframe.src = iframe.src.replace('autoplay=1', 'autoplay=0');
          }
        }
      });
    }, {
      threshold: 0.1 
    });

    observer.observe(heroSection);

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      heroSection.style.backgroundImage = "url('images/about.jpg')";
      heroSection.style.backgroundSize = "cover";
      heroSection.style.backgroundPosition = "center";
      
      const youtubeContainer = heroSection.querySelector('.youtube-background');
      if (youtubeContainer) {
        youtubeContainer.style.display = 'none';
      }
    }
  }

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

  if (iframe) {
    iframe.addEventListener('load', function() {
      const loader = heroSection.querySelector('.video-loader');
      if (loader) {
        loader.style.display = 'none';
      }
    });
  }
});