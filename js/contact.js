document.addEventListener("DOMContentLoaded", function () {
  // Service Selection
  document.querySelectorAll(".service-option").forEach((option) => {
    option.addEventListener("click", function () {
      document
        .querySelectorAll(".service-option")
        .forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // FAQ Toggle
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains("active");

      // Close all FAQ items
      document
        .querySelectorAll(".faq-question")
        .forEach((q) => q.classList.remove("active"));
      document
        .querySelectorAll(".faq-answer")
        .forEach((a) => a.classList.remove("active"));

      // Open clicked item if it wasn't active
      if (!isActive) {
        this.classList.add("active");
        answer.classList.add("active");
      }
    });
  });

  // Form Submission
  document
    .getElementById("bookingForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const selectedService = document.querySelector(".service-option.active");
      if (!selectedService) {
        alert("Ju lutemi zgjidhni një shërbim");
        return;
      }

      // Collect form data
      const formData = {
        service: selectedService.dataset.service,
        fullName: document.getElementById("fullName").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        preferredDate: document.getElementById("preferredDate").value,
        preferredTime: document.getElementById("preferredTime").value,
        problem: document.getElementById("problem").value,
      };

      alert(
        "Rezervimi juaj është dërguar me sukses! Do t'ju kontaktojmë së shpejti për konfirmim."
      );

      // Reset form
      this.reset();
      document
        .querySelectorAll(".service-option")
        .forEach((opt) => opt.classList.remove("active"));
    });

  // Set minimum date to today
  const dateInput = document.getElementById("preferredDate");
  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }

  // Form validation enhancements
  function validateForm() {
    const requiredFields = document.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error");
        isValid = false;
      } else {
        field.classList.remove("error");
      }
    });

    return isValid;
  }

  // Real-time validation
  document.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.classList.add("error");
      } else {
        this.classList.remove("error");
      }
    });

    field.addEventListener("input", function () {
      if (this.classList.contains("error") && this.value.trim()) {
        this.classList.remove("error");
      }
    });
  });
});
