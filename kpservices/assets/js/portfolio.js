/* KP Photo Portfolio v2 — demo album data, replace image paths with your own photos. */
'use strict';
const KP_PHOTO_ALBUMS = [
  {
    "id": "mecze",
    "label": "Mecze / 01",
    "name": "Fotoreportaże meczowe",
    "category": "mecze",
    "categoryLabel": "MECZE",
    "description": "Pełne galerie z jednego spotkania: rozgrzewka, akcja, emocje, zakończenie.",
    "cover": "cover-mecze.svg",
    "photos": [
      "assets/portfolio/mecze-01.svg",
      "assets/portfolio/mecze-02.svg",
      "assets/portfolio/mecze-03.svg",
      "assets/portfolio/mecze-04.svg",
      "assets/portfolio/mecze-05.svg",
      "assets/portfolio/mecze-06.svg"
    ]
  },
  {
    "id": "kulisy",
    "label": "Matchday / 02",
    "name": "Kulisy dnia meczowego",
    "category": "mecze",
    "categoryLabel": "MECZE",
    "description": "Zanim rozlegnie się pierwszy gwizdek i kiedy emocje już opadają.",
    "cover": "cover-kulisy.svg",
    "photos": [
      "assets/portfolio/kulisy-01.svg",
      "assets/portfolio/kulisy-02.svg",
      "assets/portfolio/kulisy-03.svg",
      "assets/portfolio/kulisy-04.svg"
    ]
  },
  {
    "id": "wydarzenia",
    "label": "Event / 03",
    "name": "Turnieje i wydarzenia",
    "category": "wydarzenia",
    "categoryLabel": "WYDARZENIA",
    "description": "Atmosfera, ludzie, przebieg wydarzenia i momenty, do których warto wracać.",
    "cover": "cover-wydarzenia.svg",
    "photos": [
      "assets/portfolio/wydarzenia-01.svg",
      "assets/portfolio/wydarzenia-02.svg",
      "assets/portfolio/wydarzenia-03.svg",
      "assets/portfolio/wydarzenia-04.svg",
      "assets/portfolio/wydarzenia-05.svg",
      "assets/portfolio/wydarzenia-06.svg"
    ]
  },
  {
    "id": "player",
    "label": "Player / 04",
    "name": "Player Matchday",
    "category": "zawodnicy",
    "categoryLabel": "ZAWODNICY",
    "description": "Indywidualna opowieść jednego zawodnika — od przygotowań po ostatni gwizdek.",
    "cover": "cover-player.svg",
    "photos": [
      "assets/portfolio/player-01.svg",
      "assets/portfolio/player-02.svg",
      "assets/portfolio/player-03.svg",
      "assets/portfolio/player-04.svg"
    ]
  },
  {
    "id": "portrety",
    "label": "Studio / 05",
    "name": "Media Day i portrety",
    "category": "zawodnicy",
    "categoryLabel": "ZAWODNICY",
    "description": "Materiały wizerunkowe do profili, grafik, komunikacji oraz współprac.",
    "cover": "cover-portrety.svg",
    "photos": [
      "assets/portfolio/portrety-01.svg",
      "assets/portfolio/portrety-02.svg",
      "assets/portfolio/portrety-03.svg",
      "assets/portfolio/portrety-04.svg"
    ]
  },
  {
    "id": "komercja",
    "label": "Brand / 06",
    "name": "Lifestyle i komercyjne",
    "category": "komercja",
    "categoryLabel": "KOMERCYJNE",
    "description": "Sesje casual, marki, produkty i kampanie — miejsce na realizacje reklamowe.",
    "cover": "cover-komercja.svg",
    "photos": [
      "assets/portfolio/komercja-01.svg",
      "assets/portfolio/komercja-02.svg",
      "assets/portfolio/komercja-03.svg",
      "assets/portfolio/komercja-04.svg"
    ]
  }
];
(() => {
  const buttons = [...document.querySelectorAll('[data-album-filter]')];
  const cards = [...document.querySelectorAll('[data-album]')];
  const countLabel = document.getElementById('photo-count');
  const albumDialog = document.getElementById('photo-album-dialog');
  const lightbox = document.getElementById('photo-lightbox');
  const thumbs = document.getElementById('photo-thumbnails');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCount = document.getElementById('lightbox-count');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const nextButton = document.getElementById('lightbox-next');
  const prevButton = document.getElementById('lightbox-prev');
  let currentAlbum = null;
  let currentPhoto = 0;
  let openingElement = null;
  function setFilter(category) {
    let shown = 0;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.albumFilter === category)));
    cards.forEach(card => {
      card.hidden = !(category === 'all' || card.dataset.category === category);
      if (!card.hidden) shown++;
    });
    if (countLabel) countLabel.textContent = shown === 1 ? '1 kolekcja' : `${shown} kolekcji`;
  }
  buttons.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.albumFilter)));
  function openAlbum(id, clicked) {
    const album = KP_PHOTO_ALBUMS.find(a => a.id === id);
    if (!album || !albumDialog || !thumbs) return;
    currentAlbum = album;
    openingElement = clicked;
    document.getElementById('album-dialog-category').textContent = album.categoryLabel + ' / DEMO';
    document.getElementById('album-dialog-title').textContent = album.name;
    document.getElementById('album-dialog-description').textContent = album.description;
    thumbs.replaceChildren();
    album.photos.forEach((path, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'photo-thumb';
      button.setAttribute('aria-label', `Zobacz obraz ${i+1} z ${album.photos.length}`);
      const img = document.createElement('img');
      img.src = path;
      img.alt = `Grafika demonstracyjna ${i+1}, kategoria ${album.name}`;
      img.loading = 'lazy';
      const caption = document.createElement('small');
      caption.textContent = `KADR ${String(i+1).padStart(2, '0')}`;
      button.append(img,caption);
      button.addEventListener('click', () => openPhoto(i));
      thumbs.append(button);
    });
    albumDialog.showModal();
    document.body.style.overflow = 'hidden';
  }
  function renderPhoto() {
    if (!currentAlbum || !lightboxImage) return;
    const path = currentAlbum.photos[currentPhoto];
    lightboxImage.src = path;
    lightboxImage.alt = `${currentAlbum.name}: grafika zastępcza ${currentPhoto+1}`;
    lightboxCount.textContent = `${currentPhoto+1} / ${currentAlbum.photos.length}`;
    lightboxCaption.textContent = `${currentAlbum.name} · placeholder do podmiany na autentyczne zdjęcie`;
  }
  function openPhoto(i) {
    if (!currentAlbum || !lightbox) return;
    currentPhoto = i;
    renderPhoto();
    lightbox.showModal();
  }
  function step(dir) {
    if (!currentAlbum) return;
    currentPhoto = (currentPhoto + dir + currentAlbum.photos.length) % currentAlbum.photos.length;
    renderPhoto();
  }
  cards.forEach(card => card.addEventListener('click', () => openAlbum(card.dataset.album, card)));
  document.querySelector('[data-close-album]')?.addEventListener('click', () => albumDialog?.close());
  document.querySelector('[data-close-lightbox]')?.addEventListener('click', () => lightbox?.close());
  nextButton?.addEventListener('click', () => step(1));
  prevButton?.addEventListener('click', () => step(-1));
  document.addEventListener('keydown', (event) => {
    if (!lightbox?.open) return;
    if (event.key === 'ArrowRight') { event.preventDefault(); step(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); }
  });
  [albumDialog, lightbox].forEach(dialog => dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  }));
  albumDialog?.addEventListener('close', () => {
    if (lightbox?.open) lightbox.close();
    document.body.style.overflow = '';
    openingElement?.focus({preventScroll:true});
  });
})();
