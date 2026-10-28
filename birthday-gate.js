'use strict';
(() => {
  // Una sola apertura: medianoche del 30 de octubre de 2026 en Uruguay.
  const OPEN_AT = Date.parse('2026-10-30T00:00:00-03:00');
  const getCountdown = now => {
    const total = Math.max(0, Math.ceil((OPEN_AT - now) / 1000));
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor(total % 86400 / 3600),
      minutes: Math.floor(total % 3600 / 60),
      seconds: total % 60,
      ready: now >= OPEN_AT
    };
  };
  if (typeof module === 'object' && module.exports) {
    module.exports = { OPEN_AT, getCountdown };
    return;
  }
  const gate = document.getElementById('birthday-gate');
  const gift = document.getElementById('gift-root');
  const template = document.getElementById('birthday-gift');
  let opened = false;
  let timer = null;
  const cells = ['days', 'hours', 'minutes', 'seconds'];
  function openGift() {
    if (opened) return;
    opened = true;
    if (timer !== null) clearInterval(timer);
    gift.appendChild(template.content.cloneNode(true));
    gift.hidden = false;
    gate.hidden = true;
    document.body.classList.remove('birthday-locked');
    document.title = 'Feliz cumple, Toty';
    template.remove();
    // Los tests, favoritos y música se inicializan recién cuando se abre el regalo.
    const app = document.createElement('script');
    app.src = 'app.js';
    app.onerror = () => {
      const note = document.createElement('p');
      note.className = 'gift-load-error';
      note.setAttribute('role', 'alert');
      note.textContent = 'El regalo ya está abierto, pero algo no terminó de cargar. Recargá la página y probamos de nuevo.';
      gift.prepend(note);
    };
    document.body.appendChild(app);
    const heading = gift.querySelector('h1');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
    window.scrollTo(0, 0);
  }
  function tick() {
    const remaining = getCountdown(Date.now());
    cells.forEach(key => {
      document.getElementById('count-' + key).textContent =
        String(remaining[key]).padStart(2, '0');
    });
    if (remaining.ready) openGift();
  }
  tick();
  if (!opened) timer = setInterval(tick, 250);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !opened) tick();
  });
  window.addEventListener('pageshow', () => { if (!opened) tick(); });
})();
