// Service filtering functionality
const filterBtns = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"));
    // Add active class to clicked button
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    serviceCards.forEach((card) => {
      if (filter === "all" || card.getAttribute("data-category") === filter) {
        card.style.display = "grid";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Modal functionality
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
                    <h4 style="color: #1a365d; margin: 20px 0 15px 0;">Çfarë përfshin:</h4>
                    <ul>
                        ${service.details
                          .map((detail) => `<li>${detail}</li>`)
                          .join("")}
                    </ul>
                `;
    modal.style.display = "block";
  }
}

// Close modal when clicking the X
span.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
