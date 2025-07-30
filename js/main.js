document.addEventListener("DOMContentLoaded", function () {
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
});
