'use strict';
// KP prototype — lightweight, dependency-free interactions.
(() => {
  document.documentElement.classList.add('js-ready');
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  const setHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 28);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle?.setAttribute('aria-expanded', String(open));
    toggle?.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    if (!open) toggle?.focus({ preventScroll: true });
  }
  toggle?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false); });

  const observer = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }, { threshold: .08, rootMargin: '0px 0px 0px 0px' }) : null;
  document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));
  document.querySelectorAll('#year').forEach(el => el.textContent = String(new Date().getFullYear()));

  const filters = [...document.querySelectorAll('.filter-button')];
  const cards = [...document.querySelectorAll('.portfolio-card')];
  filters.forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.filter;
    filters.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    cards.forEach(card => card.hidden = name !== 'all' && card.dataset.category !== name);
  }));
  document.querySelectorAll('.faq-item button').forEach(button => button.addEventListener('click', () => {
    const answer = document.getElementById(button.getAttribute('aria-controls'));
    if (!answer) return;
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    answer.hidden = open;
  }));

  // Demo contact form: no server, no collection of personal data by the website.
  const form = document.getElementById('contact-form');
  if (form) {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    const message = params.get('message');
    const offerPackage = params.get('package');
    const serviceSelect = form.querySelector('#client-type');
    if (type && serviceSelect && [...serviceSelect.options].some(o => o.value === type)) serviceSelect.value = type;
    const textBox = form.querySelector('#client-message');
    if (textBox && (message || offerPackage)) textBox.value = (message || ('Interesuje mnie pakiet: '+offerPackage+'. Proszę o szczegóły i wycenę.')).slice(0,5000);
  }
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = document.getElementById('form-feedback');
    if (!form.checkValidity()) { form.reportValidity(); if (feedback) feedback.textContent = 'Uzupełnij wymagane pola formularza.'; return; }
    const name = form.querySelector('#client-name').value.trim();
    const email = form.querySelector('#client-email').value.trim();
    const service = form.querySelector('#client-type').value;
    const message = form.querySelector('#client-message').value.trim();
    if (message.length < 12) { if (feedback) feedback.textContent = 'Opis projektu powinien mieć co najmniej 12 znaków.'; return; }
    const subject = `[KP — zapytanie] ${service}`;
    const body = `Dzień dobry,\n\n${message}\n\n--\n${name}\n${email}\nZakres: ${service}`;
    if (feedback) feedback.textContent = 'Wersja demonstracyjna: nie wysyłamy wiadomości. Formularz produkcyjny uruchomimy po wdrożeniu.';
    console.info('Podgląd zapytania:', {subject, body});
  });
})();
