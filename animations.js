(function () {

  // ── SHOW ALL REVEAL ELEMENTS IMMEDIATELY ──
  // Then animate them in with a stagger
  var revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(function (el, i) {
    setTimeout(function () {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 150);
  });

  // ── NUMBER COUNTUP ──
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1500;
    var steps = 50;
    var stepTime = duration / steps;
    var current = 0;
    el.textContent = '0';
    var timer = setInterval(function () {
      current += Math.ceil(target / steps);
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, stepTime);
  }

  // Run countup when stats section is visible
  var statsTriggered = false;
  function checkStats() {
    if (statsTriggered) return;
    var statsRow = document.querySelector('.stats-row');
    if (!statsRow) return;
    var rect = statsRow.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      statsTriggered = true;
      document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
        countUp(el);
      });
    }
  }

  window.addEventListener('scroll', checkStats);
  window.addEventListener('load', checkStats);
  checkStats();

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
