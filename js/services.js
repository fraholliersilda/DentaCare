const filterBtns = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    serviceCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "grid";
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        setTimeout(() => {
          card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 100);
      } else {
        card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        card.style.opacity = "0";
        card.style.transform = "translateY(-20px)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const heroBtn = document.querySelector(".btn-hero");
  const servicesSection = document.querySelector(".services-section");

  if (heroBtn && servicesSection) {
    heroBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const headerHeight = 80;
      const targetPosition = servicesSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        servicesSection.style.transform = "scale(1.02)";
        setTimeout(() => {
          servicesSection.style.transition = "transform 0.3s ease";
          servicesSection.style.transform = "scale(1)";
        }, 150);
      }, 500);
    });
  }
});

function initScrollToServices() {
  const heroButtons = document.querySelectorAll(
    'a[href="#services"], .btn-hero'
  );

  heroButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const servicesSection =
        document.querySelector(".services-section") ||
        document.querySelector("#services") ||
        document.querySelector('[id*="service"]');

      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 100;

        smoothScrollTo(targetPosition, 1000);

        setTimeout(() => {
          highlightSection(servicesSection);
        }, 800);
      }
    });
  });
}

function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

function highlightSection(section) {
  const originalBoxShadow = section.style.boxShadow;
  const originalTransition = section.style.transition;

  section.style.transition = "box-shadow 0.3s ease, transform 0.3s ease";
  section.style.boxShadow = "0 0 30px rgba(49, 130, 206, 0.3)";
  section.style.transform = "translateY(-5px)";

  setTimeout(() => {
    section.style.boxShadow = originalBoxShadow;
    section.style.transform = "translateY(0)";

    setTimeout(() => {
      section.style.transition = originalTransition;
    }, 300);
  }, 1000);
}

document.addEventListener("DOMContentLoaded", initScrollToServices);

const modal = document.getElementById("serviceModal");
const modalContent = document.getElementById("modalContent");
const span = document.getElementsByClassName("close")[0];

const modalData = {
  kontroll: {
    title: "Kontroll i Rregullt",
    description:
      "Kontrollet e rregullta janë thelbësore për ruajtjen e shëndetit të gojës dhe parandalimin e problemeve serioze.",
    details: [
      "Ekzaminim i detajuar i të gjitha dhëmbëve",
      "Kontroll i gingivave dhe indeve të buta",
      "Radiografi diagnostike sipas nevojës",
      "Vlerësim i riskut për karies",
      "Plan trajtimi i personalizuar",
      "Këshillim për higjienën e gojës",
      "Monitorim i zhvillimeve ekzistuese",
    ],
  },
  pastrim: {
    title: "Pastrim Profesional",
    description:
      "Pastrimi profesional largon tartarin dhe pllakën që nuk mund të hiqen me brushing të rregullt.",
    details: [
      "Largim i tartarit supra dhe sub-gingival",
      "Polishing me pasta të specializuara",
      "Pastrim me ultrasound",
      "Aplikim fluoridi për forcim",
      "Instruksione për higjienë të shtëpisë",
      "Rekomandime për produkte dentare",
      "Planifikim i vizitave të ardhshme",
    ],
  },
  mbushje: {
    title: "Mbushje Dentare",
    description:
      "Mbushjet moderne kompozite restaurojnë dhëmbët e dëmtuar nga kariesi duke ruajtur pamjen natrale.",
    details: [
      "Anestezi lokale për komoditet",
      "Largim i plotë i kariesit",
      "Dezinfektim i kavitetit",
      "Mbushje me kompozit të ngjashëm me dhëmbin",
      "Formësim dhe polishing",
      "Kontroll i përshtatjes së kafshimit",
      "Garanci 2-vjeçare për materialin",
    ],
  },
  zbardhim: {
    title: "Zbardhim Dhëmbësh",
    description:
      "Zbardhimi profesional ofron rezultate të sigurta dhe dramatike në një seancë.",
    details: [
      "Vlerësim i ngjyrës fillestare",
      "Mbrojtje e gingivave",
      "Aplikim i gel-it zbardhues",
      "Aktivizim me dritë LED",
      "Monitorim gjatë procesit",
      "Kit për mbajte në shtëpi",
      "Udhëzime për ruajtjen e rezultatit",
    ],
  },
  veneers: {
    title: "Veneers Porcelani",
    description:
      "Fasadat e porcelanit transformojnë buzëqeshjen tuaj me rezultate të shkëlqyera dhe natyrale.",
    details: [
      "Konsultim dhe planifikim estetik",
      "Përgatitje minimale e dhëmbëve",
      "Marrje e përshtypjeve dixhitale",
      "Veneers të përkohshme",
      "Prodhim në laborator të specializuar",
      "Testim dhe përshtatje finale",
      "Qëndrueshmëri 15-20 vjet",
    ],
  },
  implante: {
    title: "Implante Dentare",
    description:
      "Implantet janë zgjidhja më e mirë për zëvendësimin e dhëmbëve të humbur.",
    details: [
      "Planifikim 3D i kirurgjisë",
      "Vënie e implantit titanium",
      "Periudhë shërimi 3-6 muaj",
      "Vënie e kurores së përhershme",
      "Kontroll pas-operatori",
      "Udhëzime për higjienë",
      "Garanci 10-vjeçare për implant",
    ],
  },
  invisalign: {
    title: "Ortodonti Invisalign",
    description:
      "Rreshtimi i dhëmbëve me aparate të padukshme për një buzëqeshje të përkryer.",
    details: [
      "Skanim 3D i gojës",
      "Planifikim i lëvizjes së dhëmbëve",
      "Prodhim i aparateve të personalizuara",
      "Ndërrimi çdo 2 javë",
      "Kontroll mujor me ortodontist",
      "Aplikacion mobil për monitorim",
      "Retainer për ruajtjen e rezultatit",
    ],
  },
  femije: {
    title: "Dentistëri për Fëmijë",
    description:
      "Kujdes i specializuar për dhëmbët e qumështit dhe të përhershëm të fëmijëve.",
    details: [
      "Mjedis i përshtatshëm për fëmijë",
      "Qasje e butë dhe argëtuese",
      "Kontrolle parandaluese të rregullta",
      "Aplikim fluoridi për forcim",
      "Mbushje me ngjyra për fëmijë",
      "Edukimi për brushing të duhur",
      "Këshillim dietik për prindërit",
    ],
  },
};

function openModal(serviceType) {
  const service = modalData[serviceType];
  if (service) {
    modalContent.innerHTML = `
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <h4 style="color: #1a365d; margin: 20px 0 15px 0; font-weight: 600;">Çfarë përfshin:</h4>
      <ul>
        ${service.details.map((detail) => `<li>${detail}</li>`).join("")}
      </ul>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
        <a href="contact.html" class="btn-consultation" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none; font-size: 1rem;">
          Rezervo Konsultim <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    `;
    modal.style.display = "block";

    setTimeout(() => {
      modal.style.opacity = "1";
    }, 10);
  }
}

if (span) {
  span.onclick = function () {
    closeModal();
  };
}

function closeModal() {
  modal.style.opacity = "0";
  setTimeout(() => {
    modal.style.display = "none";
  }, 200);
}

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

function animateServiceCards() {
  const cards = document.querySelectorAll(".service-card");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(animateServiceCards, 100);
});

serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    const category = this.getAttribute("data-category");
    const relatedButton = document.querySelector(`[data-filter="${category}"]`);

    if (relatedButton && !relatedButton.classList.contains("active")) {
      relatedButton.style.transform = "scale(1.05)";
      relatedButton.style.boxShadow = "0 5px 15px rgba(49, 130, 206, 0.2)";
    }
  });

  card.addEventListener("mouseleave", function () {
    const category = this.getAttribute("data-category");
    const relatedButton = document.querySelector(`[data-filter="${category}"]`);

    if (relatedButton && !relatedButton.classList.contains("active")) {
      relatedButton.style.transform = "scale(1)";
      relatedButton.style.boxShadow = "none";
    }
  });
});
