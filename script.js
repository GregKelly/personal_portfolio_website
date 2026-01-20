const year = document.getElementById("year");
const copyEmailButton = document.getElementById("copy-email");
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");
const form = document.getElementById("contact-form");
const formStatus = document.querySelector(".form-status");
const reveals = document.querySelectorAll(".reveal");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = "hello@gkelly.dev";
    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = "Email copied";
    } catch (error) {
      copyEmailButton.textContent = email;
    }

    setTimeout(() => {
      copyEmailButton.textContent = "Copy Email";
    }, 2000);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.display = match ? "grid" : "none";
    });
  });
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Message queued. I will get back to you soon.";
    form.reset();
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

reveals.forEach((element) => observer.observe(element));
