/* ===================================================
   1. CONTROLE DO SLIDER (JORNADA DE FÉ)
=================================================== */
const track = document.getElementById('sliderTrack');
const viewport = document.querySelector('.slider-viewport');
const slides = document.querySelectorAll('.slide');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const secaoCronograma = document.getElementById('cronograma'); // Captura a seção

let currentIndex = 0;
const totalSlides = slides.length;

// Função para rolar a tela suavemente até o topo da seção
function rolarParaTopo() {
  if (secaoCronograma) {
    secaoCronograma.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Função para medir e aplicar a altura do slide atual
function ajustarAlturaViewport() {
  if (viewport && slides[currentIndex]) {
    const alturaAtual = slides[currentIndex].offsetHeight;
    viewport.style.height = `${alturaAtual}px`;
  }
}

function updateSlider() {
  // Interrompe mídias
  pausarMidias();

  // Desloca para o slide correspondente
  if (track) {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Recalcula a altura para encaixar no slide atual
  ajustarAlturaViewport();

  // Atualiza botões de navegação
  if (btnPrev) btnPrev.disabled = (currentIndex === 0);
  if (btnNext) btnNext.disabled = (currentIndex === totalSlides - 1);
}

// Eventos de clique nas setas
if (btnNext && btnPrev) {
  btnNext.addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
      updateSlider();
      rolarParaTopo(); // Rola para o topo do cronograma
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
      rolarParaTopo(); // Rola para o topo do cronograma
    }
  });

  // Ajusta a altura inicial sem rolar a tela no carregamento da página
  updateSlider();
}

// Recalcula a altura ao redimensionar ou girar a tela
window.addEventListener('resize', ajustarAlturaViewport);


/* ===================================================
   2. CONTROLE E PAUSA DE MÍDIAS (ÁUDIO E VÍDEO)
=================================================== */
function pausarMidias() {
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    audio.pause();
  });

  const iframes = document.querySelectorAll('iframe');
  iframes.forEach(iframe => {
    const srcAtual = iframe.src;
    iframe.src = srcAtual;
  });
}