/* EG product gallery — arrows on the main image + full-screen click-to-zoom with a Back button.
   Builds on Dawn's media-gallery (thumbnail_slider layout). Dagmawi Asegid, 2026-10-18. */
(function () {
  function largestSrc(img) {
    if (!img) return '';
    var set = img.getAttribute('srcset');
    if (!set) return img.currentSrc || img.src;
    var parts = set.split(',').map(function (s) { return s.trim().split(' ')[0]; });
    return parts[parts.length - 1] || img.src;
  }

  function initGallery(gallery) {
    if (gallery.dataset.egReady) return;
    gallery.dataset.egReady = '1';

    var viewer = gallery.querySelector('[id^="GalleryViewer-"]');
    var slides = function () {
      return Array.prototype.slice.call(gallery.querySelectorAll('.product__media-list > .product__media-item'));
    };
    var thumbs = function () {
      return Array.prototype.slice.call(gallery.querySelectorAll('.thumbnail-list .thumbnail'));
    };
    var activeIndex = function () {
      var s = slides();
      for (var i = 0; i < s.length; i++) if (s[i].classList.contains('is-active')) return i;
      return 0;
    };
    var goTo = function (i) {
      var t = thumbs();
      if (!t.length) return;
      i = (i + t.length) % t.length;
      t[i].click();
    };

    /* Arrows on the main image */
    if (viewer && slides().length > 1) {
      viewer.style.position = 'relative';
      ['prev', 'next'].forEach(function (dir) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'eg-gallery-nav eg-gallery-nav--' + dir;
        b.setAttribute('aria-label', dir === 'prev' ? 'Previous image' : 'Next image');
        b.innerHTML = dir === 'prev' ? '&#8249;' : '&#8250;';
        b.addEventListener('click', function (e) {
          e.preventDefault();
          goTo(activeIndex() + (dir === 'prev' ? -1 : 1));
        });
        viewer.appendChild(b);
      });
    }

    /* Full-screen zoom viewer */
    var zoom = document.createElement('div');
    zoom.className = 'eg-zoom';
    zoom.setAttribute('role', 'dialog');
    zoom.setAttribute('aria-modal', 'true');
    zoom.setAttribute('aria-label', 'Image viewer');
    zoom.innerHTML =
      '<button type="button" class="eg-zoom__back">&larr; Back</button>' +
      '<div class="eg-zoom__counter"></div>' +
      '<button type="button" class="eg-zoom__arrow eg-zoom__arrow--prev" aria-label="Previous image">&#8249;</button>' +
      '<div class="eg-zoom__stage"><img class="eg-zoom__img" alt=""></div>' +
      '<button type="button" class="eg-zoom__arrow eg-zoom__arrow--next" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(zoom);

    var zImg = zoom.querySelector('.eg-zoom__img');
    var counter = zoom.querySelector('.eg-zoom__counter');
    var current = 0;

    var images = function () {
      return slides()
        .map(function (li) { return li.querySelector('.product__media img'); })
        .filter(Boolean);
    };
    var show = function (i) {
      var list = images();
      if (!list.length) return;
      current = (i + list.length) % list.length;
      zoom.classList.remove('is-zoomed');
      zImg.style.transformOrigin = 'center center';
      zImg.src = largestSrc(list[current]);
      zImg.alt = list[current].alt || '';
      counter.textContent = (current + 1) + ' / ' + list.length;
      zoom.querySelectorAll('.eg-zoom__arrow').forEach(function (a) { a.hidden = list.length < 2; });
    };
    var open = function (i) {
      show(i);
      zoom.classList.add('is-open');
      document.body.classList.add('eg-zoom-open');
      zoom.querySelector('.eg-zoom__back').focus();
    };
    var close = function () {
      zoom.classList.remove('is-open', 'is-zoomed');
      document.body.classList.remove('eg-zoom-open');
      goTo(current); /* keep the page gallery on the image they were looking at */
    };

    zoom.querySelector('.eg-zoom__back').addEventListener('click', close);
    zoom.querySelector('.eg-zoom__arrow--prev').addEventListener('click', function () { show(current - 1); });
    zoom.querySelector('.eg-zoom__arrow--next').addEventListener('click', function () { show(current + 1); });

    var setOrigin = function (e) {
      var r = zImg.getBoundingClientRect();
      var x = ((e.clientX - r.left) / r.width) * 100;
      var y = ((e.clientY - r.top) / r.height) * 100;
      zImg.style.transformOrigin = x + '% ' + y + '%';
    };
    zImg.addEventListener('click', function (e) {
      setOrigin(e);
      zoom.classList.toggle('is-zoomed');
    });
    zImg.addEventListener('mousemove', function (e) {
      if (zoom.classList.contains('is-zoomed')) setOrigin(e);
    });

    document.addEventListener('keydown', function (e) {
      if (!zoom.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });

    /* Click on a gallery image opens the viewer */
    gallery.addEventListener('click', function (e) {
      var img = e.target.closest('.product__media-list .product__media img');
      if (!img) return;
      var li = img.closest('.product__media-item');
      var idx = slides().indexOf(li);
      e.preventDefault();
      open(idx < 0 ? 0 : idx);
    });
  }

  function initAll() {
    document.querySelectorAll('media-gallery').forEach(initGallery);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
  document.addEventListener('shopify:section:load', initAll);
})();
