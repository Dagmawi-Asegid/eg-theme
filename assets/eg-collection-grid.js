/* EG collection grid — "Load more" appends the next page of products without leaving the page.
   Dagmawi Asegid, 2026-10-18. */
(function () {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-eg-next]');
    if (!btn) return;
    e.preventDefault();
    var grid = document.getElementById('product-grid');
    if (!grid) { window.location = btn.href; return; }

    btn.setAttribute('aria-busy', 'true');
    btn.textContent = 'Loading…';

    fetch(btn.href, { credentials: 'same-origin' })
      .then(function (r) { return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var newGrid = doc.getElementById('product-grid');
        if (newGrid) {
          Array.prototype.slice.call(newGrid.children).forEach(function (li) {
            li.classList.remove('scroll-trigger', 'animate--slide-in');
            grid.appendChild(li);
          });
        }
        var shown = document.querySelector('[data-eg-shown]');
        if (shown) shown.textContent = grid.children.length;

        var nextBtn = doc.querySelector('[data-eg-next]');
        if (nextBtn) {
          btn.href = nextBtn.getAttribute('href');
          btn.textContent = 'Load more';
          btn.removeAttribute('aria-busy');
        } else {
          btn.remove();
        }
      })
      .catch(function () { window.location = btn.href; });
  });
})();
