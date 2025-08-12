document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const doctorCards = document.querySelectorAll(".doctor-card");

  showDoctors("all");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      showDoctors(filter);
    });
  });

  function showDoctors(category) {
    doctorCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(() => {
          card.style.transition = "all 0.3s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      } else {
        card.style.display = "none";
      }
    });
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".doctor-card, .certification-item")
    .forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "all 0.6s ease";
      observer.observe(card);
    });

  const certificationItems = document.querySelectorAll(".certification-item");
  certificationItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  const consultationBtn = document.querySelector(".btn-consultation");
  if (consultationBtn) {
    consultationBtn.addEventListener("click", function (e) {
      this.style.transform = "translateY(-3px) scale(0.98)";
      setTimeout(() => {
        this.style.transform = "translateY(-3px) scale(1)";
      }, 150);
    });
  }

  function animateCounters() {
    const certificationItems = document.querySelectorAll(".certification-item");
    certificationItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  const certificationsSection = document.querySelector(
    ".certifications-section"
  );
  if (certificationsSection) {
    const certObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            certObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    certObserver.observe(certificationsSection);
  }
});
