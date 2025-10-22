function saveProject(n) {
  const title = document.getElementById(`title${n}`).value.trim();
  const desc = document.getElementById(`desc${n}`).value.trim();
  const fileInput = document.getElementById(`img${n}`);
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const imgData = reader.result;
      localStorage.setItem(`project${n}-img`, imgData);
      localStorage.setItem(`project${n}-title`, title);
      localStorage.setItem(`project${n}-desc`, desc);
      alert(`Projeto ${n} salvo com sucesso!`);
    };
    reader.readAsDataURL(file);
  } else {
    
    localStorage.setItem(`project${n}-title`, title);
    localStorage.setItem(`project${n}-desc`, desc);
    alert(`Projeto ${n} salvo (sem nova imagem).`);
  }
}

function resetProject(n) {
  localStorage.removeItem(`project${n}-title`);
  localStorage.removeItem(`project${n}-desc`);
  localStorage.removeItem(`project${n}-img`);
  alert(`Projeto ${n} resetado!`);
}

const imageInput = document.getElementById('imageInput');
const addImageBtn = document.getElementById('addImageBtn');
const resetBtn = document.getElementById('resetCarouselBtn');
const imageList = document.getElementById('imageList');
const fileNameSpan = document.getElementById('fileName');

let currentImageData = null;

function updateImageList() {
  const stored = JSON.parse(localStorage.getItem('carouselImages') || '[]');
  imageList.innerHTML = '';

  stored.forEach((imgSrc, index) => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = '100px';
    img.style.height = 'auto';
    img.alt = `Imagem ${index + 1}`;

    const btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remover';
    btnRemove.classList.add('remove-btn');
    btnRemove.addEventListener('click', () => {
      stored.splice(index, 1);
      localStorage.setItem('carouselImages', JSON.stringify(stored));
      updateImageList();
    });

    li.appendChild(img);
    li.appendChild(btnRemove);
    imageList.appendChild(li);
  });
}

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  addImageBtn.disabled = !file;

  if (file) {
    fileNameSpan.textContent = file.name;
    fileNameSpan.classList.remove('empty');

    const reader = new FileReader();
    reader.onload = function (e) {
      currentImageData = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    fileNameSpan.textContent = 'Nenhum arquivo selecionado';
    fileNameSpan.classList.add('empty');
    currentImageData = null;
  }
});

addImageBtn.addEventListener('click', () => {
  if (!currentImageData) return;

  const stored = JSON.parse(localStorage.getItem('carouselImages') || '[]');
  stored.push(currentImageData);
  localStorage.setItem('carouselImages', JSON.stringify(stored));

  alert('Imagem salva para o carrossel!');
  imageInput.value = '';
  fileNameSpan.textContent = 'Nenhum arquivo selecionado';
  fileNameSpan.classList.add('empty');
  addImageBtn.disabled = true;
  currentImageData = null;

  updateImageList();
});

resetBtn.addEventListener('click', () => {
  if (confirm('Deseja realmente resetar o carrossel? Todas as imagens serão removidas.')) {
    localStorage.removeItem('carouselImages');
    updateImageList();
  }
});

updateImageList();
