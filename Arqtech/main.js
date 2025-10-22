document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= 3; i++) {
    const title = localStorage.getItem(`project${i}-title`);
    const desc = localStorage.getItem(`project${i}-desc`);
    const img = localStorage.getItem(`project${i}-img`);

    const card = document.querySelectorAll(".project-card")[i - 1];
    if (card) {
      if (title) card.querySelector(".project-title").textContent = title;
      if (desc) card.querySelector(".project-description").textContent = desc;
      if (img) card.querySelector("img").src = img;
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {

  for (let i = 1; i <= 3; i++) {
    const title = localStorage.getItem(`project${i}-title`);
    const desc = localStorage.getItem(`project${i}-desc`);
    const img = localStorage.getItem(`project${i}-img`);

    const card = document.querySelectorAll(".project-card")[i - 1];
    if (card) {
      if (title) card.querySelector(".project-title").textContent = title;
      if (desc) card.querySelector(".project-description").textContent = desc;
      if (img) card.querySelector("img").src = img;
    }
  }

  const slide = document.querySelector(".carousel-slide");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (slide && prevBtn && nextBtn) {
    const storedImages = JSON.parse(localStorage.getItem("carouselImages") || "[]");
    storedImages.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Imagem adicionada";
      slide.appendChild(img);
    });

    const images = slide.querySelectorAll("img");
    let counter = 0;
    let size = images[0]?.clientWidth || 0;

    function updateSlide() {
      slide.style.transform = `translateX(${-size * counter}px)`;
    }

    nextBtn.addEventListener("click", () => {
      counter = (counter + 1) % images.length;
      updateSlide();
    });

    prevBtn.addEventListener("click", () => {
      counter = (counter - 1 + images.length) % images.length;
      updateSlide();
    });

    window.addEventListener("resize", () => {
      size = images[0]?.clientWidth || 0;
      updateSlide();
    });
  }
});
