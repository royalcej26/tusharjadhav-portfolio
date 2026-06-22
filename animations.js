(function () {

  // ── SCROLL REVEAL FOR CARDS ──
  var revealEls = document.querySelectorAll('.reveal');

  function checkReveal() {
    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  window.addEventListener('load', checkReveal);
  checkReveal();

  // ── ACTIVE NAV HIGHLIGHT ──
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  function updateNav() {
    var scrollY = window.scrollY || window.pageYOffset;
    sections.forEach(function (section) {
      var top = section.offsetTop - 80;
      var bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateNav);

})();
