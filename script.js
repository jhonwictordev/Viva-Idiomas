const slides = [
  {
    title: "Seja protagonista da sua história",
    kicker: "Inglês, espanhol, francês e experiências globais",
    copy: "Aprenda idiomas com aulas imersivas, professores especialistas e uma jornada feita para ganhar voz em qualquer lugar do mundo."
  },
  {
    title: "Fale com confiança em qualquer contexto",
    kicker: "Turmas para adultos e profissionais",
    copy: "Conteúdo prático, conversação orientada e metas visíveis para carreira, viagens, entrevistas e novos projetos."
  },
  {
    title: "O mundo fica maior quando você se comunica",
    kicker: "Preparação para viagens e intercâmbio",
    copy: "Simulações reais para aeroporto, hospedagem, cultura local e experiências internacionais sem travar na hora certa."
  },
  {
    title: "Transforme estudo em repertório vivo",
    kicker: "Método com livros, mídia e prática diária",
    copy: "Materiais atuais, tecnologia e acompanhamento individual para fazer o idioma aparecer na sua rotina."
  },
  {
    title: "Aprenda idioma vivendo cultura",
    kicker: "Clubes de conversação e eventos multiculturais",
    copy: "Encontros, música, gastronomia e trocas reais para aprender com pessoas, sotaques e histórias diferentes."
  }
];

const hero = document.querySelector("[data-hero]");
const images = [...document.querySelectorAll(".hero-image")];
const title = document.querySelector("[data-title]");
const kicker = document.querySelector("[data-kicker]");
const copy = document.querySelector("[data-copy]");
const content = document.querySelector(".hero-content");
const dotsContainer = document.querySelector("[data-dots]");
const progress = document.querySelector("[data-progress]");
const prevButton = document.querySelector("[data-prev]");
const nextButton = document.querySelector("[data-next]");
const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

let activeIndex = 0;
let autoTimer = null;
const slideDuration = 3000;

function buildDots() {
  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "hero-dot";
    dot.setAttribute("aria-label", `Mostrar destaque ${index + 1}: ${slide.kicker}`);
    dot.addEventListener("click", (event) => {
      event.stopPropagation();
      goToSlide(index, true);
    });
    dotsContainer.appendChild(dot);
  });
}

function restartProgress() {
  progress.classList.remove("is-running");
  void progress.offsetWidth;
  progress.classList.add("is-running");
}

function updateDots() {
  [...dotsContainer.children].forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeIndex);
  });
}

function updateCopy(nextIndex) {
  const nextSlide = slides[nextIndex];
  content.classList.add("is-changing");

  window.setTimeout(() => {
    title.textContent = nextSlide.title;
    kicker.textContent = nextSlide.kicker;
    copy.textContent = nextSlide.copy;
    content.classList.remove("is-changing");
  }, 160);
}

function goToSlide(nextIndex, manual = false) {
  if (nextIndex === activeIndex) {
    if (manual) restartAuto();
    return;
  }

  images[activeIndex].classList.remove("is-active");
  images[nextIndex].classList.add("is-active");
  activeIndex = nextIndex;
  updateCopy(nextIndex);
  updateDots();
  restartProgress();

  if (manual) restartAuto();
}

function nextSlide(manual = false) {
  goToSlide((activeIndex + 1) % slides.length, manual);
}

function previousSlide() {
  goToSlide((activeIndex - 1 + slides.length) % slides.length, true);
}

function restartAuto() {
  window.clearInterval(autoTimer);
  autoTimer = window.setInterval(() => nextSlide(false), slideDuration);
  restartProgress();
}

function handleHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function closeMobileNav() {
  nav.classList.remove("is-open");
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
}

buildDots();
updateDots();
restartAuto();
handleHeaderState();

nextButton.addEventListener("click", (event) => {
  event.stopPropagation();
  nextSlide(true);
});

prevButton.addEventListener("click", (event) => {
  event.stopPropagation();
  previousSlide();
});

hero.addEventListener("click", (event) => {
  const interactiveTarget = event.target.closest("a, button, input, select, textarea, label, .hero-lead-card");
  if (!interactiveTarget) nextSlide(true);
});

window.addEventListener("scroll", handleHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const willOpen = !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", willOpen);
  header.classList.toggle("is-open", willOpen);
  navToggle.setAttribute("aria-expanded", String(willOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) closeMobileNav();
});

document.querySelectorAll(".lead-form, .hero-lead-card").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector("button");
    const original = button.textContent;
    button.textContent = "Solicitação enviada";
    button.disabled = true;

    window.setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      event.currentTarget.reset();
    }, 2200);
  });
});

document.querySelector(".locator-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = event.currentTarget.querySelector("input").value.trim();
  const result = document.querySelector("[data-locator-result]");
  result.textContent = query
    ? `Encontramos opções para "${query}": presencial, híbrido e online ao vivo.`
    : "Temos 3 opções prontas para visita e nivelamento.";
});
