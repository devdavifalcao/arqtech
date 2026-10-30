document.addEventListener("DOMContentLoaded", () => {
  // Atualiza os projetos salvos no navegador.
  const cards = document.querySelectorAll(".project-card");

  for (let i = 1; i <= 3; i++) {
    const card = cards[i - 1];
    if (!card) continue;

    const title = localStorage.getItem(`project${i}-title`);
    const desc = localStorage.getItem(`project${i}-desc`);
    const img = localStorage.getItem(`project${i}-img`);

    if (title) card.querySelector(".project-title").textContent = title;
    if (desc) card.querySelector(".project-description").textContent = desc;
    if (img) card.querySelector("img").src = img;
  }

  // Menu mobile.
  const menu = document.getElementById("mobile-menu");
  window.toggleMenu = () => {
    if (menu) menu.classList.toggle("hidden");
  };

  menu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => menu.classList.add("hidden"));
  });

  // Carrossel de imagens.
  const slide = document.querySelector(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (!slide || !prevBtn || !nextBtn) return;

  let storedImages = [];
  try {
    storedImages = JSON.parse(localStorage.getItem("carouselImages") || "[]");
    if (!Array.isArray(storedImages)) storedImages = [];
  } catch {
    storedImages = [];
  }

  storedImages.forEach((src, index) => {
    if (typeof src !== "string") return;
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Imagem do projeto ${index + 1}`;
    slide.appendChild(img);
  });

  const images = Array.from(slide.querySelectorAll("img"));
  let counter = 0;

  function updateSlide() {
    const width = slide.parentElement.clientWidth;
    slide.style.transform = `translateX(-${width * counter}px)`;
    const disabled = images.length <= 1;
    prevBtn.disabled = disabled;
    nextBtn.disabled = disabled;
  }

  nextBtn.addEventListener("click", () => {
    if (images.length <= 1) return;
    counter = (counter + 1) % images.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    if (images.length <= 1) return;
    counter = (counter - 1 + images.length) % images.length;
    updateSlide();
  });

  window.addEventListener("resize", updateSlide);
  updateSlide();
});
