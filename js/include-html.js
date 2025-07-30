function includeHTML() {
  const includes = [
    { selector: "#nav-placeholder", file: "nav.html" },
    { selector: "#footer-placeholder", file: "footer.html" },
  ];

  includes.forEach(({ selector, file }) => {
    fetch(file)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${file}`);
        return response.text();
      })
      .then((data) => {
        document.querySelector(selector).innerHTML = data;
        if (selector === "#nav-placeholder") {
          initNavToggle();
        }
      })
      .catch((error) => console.error(error));
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);

function initNavToggle() {
  const toggleBtn = document.getElementById("navToggle");
  const navMenu = document.getElementById("navbarMenu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
}
