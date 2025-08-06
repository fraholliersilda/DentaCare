document.addEventListener("DOMContentLoaded", function () {
  // Service Selection
  document.querySelectorAll(".service-option").forEach((option) => {
    option.addEventListener("click", function () {
      document
        .querySelectorAll(".service-option")
        .forEach((opt) => opt.classList.remove("active"));
      this.classList.add("active");
      
      // Remove service selection error if exists
      removeServiceSelectionError();
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

  // Enhanced Validation Functions
  function validatePhone(phone) {
    // Albanian phone number patterns
    const albanianMobilePattern = /^(\+355|0)6[7-9]\d{7}$/;
    const albanianLandlinePattern = /^(\+355|0)[2-5]\d{7}$/;
    const internationalPattern = /^\+\d{8,15}$/;
    
    return albanianMobilePattern.test(phone) || 
           albanianLandlinePattern.test(phone) || 
           internationalPattern.test(phone);
  }

  function validateEmail(email) {
    if (!email) return true; // Email is optional
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validateDate(date) {
    const selectedDate = new Date(date);
    const today = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6); // 6 months ahead
    
    // Check if date is in the past
    if (selectedDate < today.setHours(0,0,0,0)) {
      return { valid: false, message: "Data nuk mund të jetë në të kaluarën" };
    }
    
    // Check if date is too far in the future
    if (selectedDate > maxDate) {
      return { valid: false, message: "Data nuk mund të jetë më shumë se 6 muaj në të ardhmen" };
    }
    
    // Check if it's a weekend (optional - uncomment if clinic closed on weekends)
    // const dayOfWeek = selectedDate.getDay();
    // if (dayOfWeek === 0 || dayOfWeek === 6) {
    //   return { valid: false, message: "Ju lutemi zgjidhni një ditë pune (E Hënë - E Premte)" };
    // }
    
    return { valid: true };
  }

  function validateTime(time, date) {
    if (!time) return { valid: false, message: "Ju lutemi zgjidhni orën" };
    
    const selectedDate = new Date(date);
    const today = new Date();
    
    // If selected date is today, check if time is in the future
    if (selectedDate.toDateString() === today.toDateString()) {
      const currentTime = today.getHours() * 60 + today.getMinutes();
      const selectedTime = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1]);
      
      if (selectedTime <= currentTime + 60) { // At least 1 hour from now
        return { valid: false, message: "Ju lutemi zgjidhni një orë të paktën 1 orë në të ardhmen" };
      }
    }
    
    return { valid: true };
  }

  function validateTextLength(text, maxLength, fieldName) {
    if (text && text.length > maxLength) {
      return { valid: false, message: `${fieldName} nuk mund të ketë më shumë se ${maxLength} karaktere` };
    }
    return { valid: true };
  }

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add("error");
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.color = "#e74c3c";
    errorDiv.style.fontSize = "0.875rem";
    errorDiv.style.marginTop = "0.25rem";
    
    field.parentNode.appendChild(errorDiv);
  }

  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove("error");
    
    const existingError = field.parentNode.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }
  }

  function showServiceSelectionError() {
    const serviceSelection = document.querySelector(".service-selection");
    serviceSelection.classList.add("error");
    
    // Remove existing error
    const existingError = serviceSelection.parentNode.querySelector(".service-error-message");
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement("div");
    errorDiv.className = "service-error-message";
    errorDiv.textContent = "Ju lutemi zgjidhni një shërbim";
    errorDiv.style.color = "#e74c3c";
    errorDiv.style.fontSize = "0.875rem";
    errorDiv.style.marginTop = "0.5rem";
    errorDiv.style.textAlign = "center";
    
    serviceSelection.parentNode.insertBefore(errorDiv, serviceSelection.nextSibling);
  }

  function removeServiceSelectionError() {
    const serviceSelection = document.querySelector(".service-selection");
    serviceSelection.classList.remove("error");
    
    const existingError = serviceSelection.parentNode.querySelector(".service-error-message");
    if (existingError) {
      existingError.remove();
    }
  }

  // Real-time validation for individual fields
  document.getElementById("fullName").addEventListener("blur", function() {
    const value = this.value.trim();
    if (!value) {
      showFieldError("fullName", "Emri dhe mbiemri janë të detyrueshëm");
    } else if (value.length < 2) {
      showFieldError("fullName", "Emri dhe mbiemri duhet të kenë të paktën 2 karaktere");
    } else {
      const nameValidation = validateTextLength(value, 100, "Emri dhe mbiemri");
      if (!nameValidation.valid) {
        showFieldError("fullName", nameValidation.message);
      } else {
        clearFieldError("fullName");
      }
    }
  });

  document.getElementById("phone").addEventListener("blur", function() {
    const value = this.value.trim();
    if (!value) {
      showFieldError("phone", "Numri i telefonit është i detyrueshëm");
    } else if (!validatePhone(value)) {
      showFieldError("phone", "Ju lutemi shkruani një numër telefoni të vlefshëm");
    } else {
      clearFieldError("phone");
    }
  });

  document.getElementById("email").addEventListener("blur", function() {
    const value = this.value.trim();
    if (value && !validateEmail(value)) {
      showFieldError("email", "Ju lutemi shkruani një email të vlefshëm");
    } else {
      clearFieldError("email");
    }
  });

  document.getElementById("preferredDate").addEventListener("change", function() {
    const value = this.value;
    if (!value) {
      showFieldError("preferredDate", "Data e preferuar është e detyrueshme");
    } else {
      const dateValidation = validateDate(value);
      if (!dateValidation.valid) {
        showFieldError("preferredDate", dateValidation.message);
      } else {
        clearFieldError("preferredDate");
      }
    }
  });

  document.getElementById("preferredTime").addEventListener("change", function() {
    const value = this.value;
    const date = document.getElementById("preferredDate").value;
    
    if (!value) {
      showFieldError("preferredTime", "Ora e preferuar është e detyrueshme");
    } else if (date) {
      const timeValidation = validateTime(value, date);
      if (!timeValidation.valid) {
        showFieldError("preferredTime", timeValidation.message);
      } else {
        clearFieldError("preferredTime");
      }
    } else {
      clearFieldError("preferredTime");
    }
  });

  document.getElementById("problem").addEventListener("blur", function() {
    const value = this.value.trim();
    const lengthValidation = validateTextLength(value, 500, "Përshkrimi i problemit");
    if (!lengthValidation.valid) {
      showFieldError("problem", lengthValidation.message);
    } else {
      clearFieldError("problem");
    }
  });

  // Form Submission with Enhanced Validation
  document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    let isValid = true;

    // Validate service selection
    const selectedService = document.querySelector(".service-option.active");
    if (!selectedService) {
      showServiceSelectionError();
      isValid = false;
    }

    // Validate all fields
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const preferredDate = document.getElementById("preferredDate").value;
    const preferredTime = document.getElementById("preferredTime").value;
    const problem = document.getElementById("problem").value.trim();

    // Full name validation
    if (!fullName) {
      showFieldError("fullName", "Emri dhe mbiemri janë të detyrueshëm");
      isValid = false;
    } else if (fullName.length < 2) {
      showFieldError("fullName", "Emri dhe mbiemri duhet të kenë të paktën 2 karaktere");
      isValid = false;
    }

    // Phone validation
    if (!phone) {
      showFieldError("phone", "Numri i telefonit është i detyrueshëm");
      isValid = false;
    } else if (!validatePhone(phone)) {
      showFieldError("phone", "Ju lutemi shkruani një numër telefoni të vlefshëm");
      isValid = false;
    }

    // Email validation (optional field)
    if (email && !validateEmail(email)) {
      showFieldError("email", "Ju lutemi shkruani një email të vlefshëm");
      isValid = false;
    }

    // Date validation
    if (!preferredDate) {
      showFieldError("preferredDate", "Data e preferuar është e detyrueshme");
      isValid = false;
    } else {
      const dateValidation = validateDate(preferredDate);
      if (!dateValidation.valid) {
        showFieldError("preferredDate", dateValidation.message);
        isValid = false;
      }
    }

    // Time validation
    if (!preferredTime) {
      showFieldError("preferredTime", "Ora e preferuar është e detyrueshme");
      isValid = false;
    } else if (preferredDate) {
      const timeValidation = validateTime(preferredTime, preferredDate);
      if (!timeValidation.valid) {
        showFieldError("preferredTime", timeValidation.message);
        isValid = false;
      }
    }

    // Problem description length validation
    const problemLengthValidation = validateTextLength(problem, 500, "Përshkrimi i problemit");
    if (!problemLengthValidation.valid) {
      showFieldError("problem", problemLengthValidation.message);
      isValid = false;
    }

    // If validation passes, process the form
    if (isValid) {
      const formData = {
        service: selectedService.dataset.service,
        fullName: fullName,
        phone: phone,
        email: email,
        preferredDate: preferredDate,
        preferredTime: preferredTime,
        problem: problem,
      };

      // Here you would typically send the data to your server
      console.log("Form data:", formData);

      alert("Rezervimi juaj është dërguar me sukses! Do t'ju kontaktojmë së shpejti për konfirmim.");

      // Reset form and clear all errors
      this.reset();
      document.querySelectorAll(".service-option").forEach((opt) => opt.classList.remove("active"));
      document.querySelectorAll(".error-message").forEach((error) => error.remove());
      document.querySelectorAll(".service-error-message").forEach((error) => error.remove());
      document.querySelectorAll(".error").forEach((field) => field.classList.remove("error"));
      removeServiceSelectionError();
    }
  });

  // Set minimum date to today
  const dateInput = document.getElementById("preferredDate");
  if (dateInput) {
    const today = new Date();
    dateInput.min = today.toISOString().split("T")[0];
  }

  // Clear errors when user starts typing
  document.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        clearFieldError(this.id);
      }
    });
  });
});