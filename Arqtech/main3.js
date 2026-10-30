function readStoredImages() {
  try {
    const images = JSON.parse(localStorage.getItem("carouselImages") || "[]");
    return Array.isArray(images) ? images : [];
  } catch {
    return [];
  }
}

function saveProject(n) {
  const titleInput = document.getElementById(`title${n}`);
  const descInput = document.getElementById(`desc${n}`);
  const fileInput = document.getElementById(`img${n}`);

  if (!titleInput || !descInput || !fileInput) return;

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();
  const file = fileInput.files[0];

  function saveData(imageData) {
    try {
      localStorage.setItem(`project${n}-title`, title);
      localStorage.setItem(`project${n}-desc`, desc);
      if (imageData) localStorage.setItem(`project${n}-img`, imageData);
      alert(`Projeto ${n} salvo com sucesso!`);
    } catch (error) {
      alert("Não foi possível salvar. A imagem pode ser muito grande para o armazenamento do navegador.");
    }
  }

  if (!file) {
    saveData(null);
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Selecione um arquivo de imagem válido.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => saveData(reader.result);
  reader.onerror = () => alert("Não foi possível ler a imagem selecionada.");
  reader.readAsDataURL(file);
}

function resetProject(n) {
  if (!confirm(`Deseja resetar o Projeto ${n}? `)) return;

  localStorage.removeItem(`project${n}-title`);
  localStorage.removeItem(`project${n}-desc`);
  localStorage.removeItem(`project${n}-img`);

  const title = document.getElementById(`title${n}`);
  const desc = document.getElementById(`desc${n}`);
  const image = document.getElementById(`img${n}`);

  if (title) title.value = "";
  if (desc) desc.value = "";
  if (image) image.value = "";

  alert(`Projeto ${n} resetado. Atualize a página principal para ver a versão original.`);
}

document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageInput");
  const addImageBtn = document.getElementById("addImageBtn");
  const resetBtn = document.getElementById("resetCarouselBtn");
  const imageList = document.getElementById("imageList");
  const fileNameSpan = document.getElementById("fileName");

  if (!imageInput || !addImageBtn || !resetBtn || !imageList || !fileNameSpan) return;

  let currentImageData = null;

  function updateImageList() {
    const stored = readStoredImages();
    imageList.replaceChildren();

    stored.forEach((imgSrc, index) => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = imgSrc;
      img.style.width = "100px";
      img.style.height = "auto";
      img.alt = `Imagem ${index + 1} do carrossel`;

      const btnRemove = document.createElement("button");
      btnRemove.type = "button";
      btnRemove.textContent = "Remover";
      btnRemove.classList.add("remove-btn");
      btnRemove.addEventListener("click", () => {
        const updated = readStoredImages();
        updated.splice(index, 1);
        try {
          localStorage.setItem("carouselImages", JSON.stringify(updated));
          updateImageList();
        } catch {
          alert("Não foi possível atualizar o carrossel.");
        }
      });

      li.append(img, btnRemove);
      imageList.appendChild(li);
    });
  }

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    addImageBtn.disabled = !file;
    currentImageData = null;

    if (!file) {
      fileNameSpan.textContent = "Nenhum arquivo selecionado";
      fileNameSpan.classList.add("empty");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Selecione um arquivo de imagem válido.");
      imageInput.value = "";
      addImageBtn.disabled = true;
      fileNameSpan.textContent = "Nenhum arquivo selecionado";
      fileNameSpan.classList.add("empty");
      return;
    }

    fileNameSpan.textContent = file.name;
    fileNameSpan.classList.remove("empty");

    const reader = new FileReader();
    reader.onload = event => {
      currentImageData = event.target.result;
      addImageBtn.disabled = !currentImageData;
    };
    reader.onerror = () => {
      alert("Não foi possível ler a imagem.");
      addImageBtn.disabled = true;
    };
    reader.readAsDataURL(file);
  });

  addImageBtn.addEventListener("click", () => {
    if (!currentImageData) return;

    const stored = readStoredImages();
    stored.push(currentImageData);

    try {
      localStorage.setItem("carouselImages", JSON.stringify(stored));
      alert("Imagem adicionada ao carrossel!");
      imageInput.value = "";
      fileNameSpan.textContent = "Nenhum arquivo selecionado";
      fileNameSpan.classList.add("empty");
      addImageBtn.disabled = true;
      currentImageData = null;
      updateImageList();
    } catch {
      alert("Não foi possível salvar. A imagem pode ser muito grande para o armazenamento do navegador.");
    }
  });

  resetBtn.addEventListener("click", () => {
    if (!confirm("Deseja realmente resetar o carrossel? Todas as imagens serão removidas.")) return;
    localStorage.removeItem("carouselImages");
    updateImageList();
  });

  updateImageList();
});
