(function () {
  if (window.Shopify && Shopify.designMode) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveals
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('eg-inview'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.eg-reveal').forEach(function (el) { io.observe(el); });

  // Parallax
  if (reduced) return;
  var items = Array.prototype.slice.call(document.querySelectorAll('.eg-parallax > img, .eg-parallax > video'));
  if (!items.length) return;
  var ticking = false;
  function update() {
    var vh = window.innerHeight;
    items.forEach(function (el) {
      var r = el.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh;   // -0.5 → 0.5
      el.style.transform = 'translateY(' + (p * 6) + '%)';
    });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();
/* Nav drawer: suppress Dawn's drill-down, keep native accordion */
(function () {
  function patch() {
    document.querySelectorAll('.menu-drawer details').forEach(function (d) {
      if (d.dataset.egAccordion === 'true') return;
      d.dataset.egAccordion = 'true';

      var summary = d.querySelector('summary');
      if (!summary) return;

      // Block Dawn's slide handler, let <details> toggle natively
      summary.addEventListener('click', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        d.open = !d.open;
      }, true);
    });
  }

  document.addEventListener('DOMContentLoaded', patch);
  document.addEventListener('shopify:section:load', patch);
  setTimeout(patch, 500);
})();