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

  // ── NUMBER COUNTUP ──
  function countUp(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 2000;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = timestamp - startTime;
      var percentage = Math.min(progress / duration, 1);
      // Ease out — starts fast, slows at end
      var eased = 1 - Math.pow(1 - percentage, 3);
      var current = Math.floor(eased * target);
      el.textContent = current;
      if (percentage < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(step);
  }

  function countUp(el, startTime, timestamp) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 2000;
    var progress = timestamp - startTime;
    var percentage = Math.min(progress / duration, 1);
    var eased = 1 - Math.pow(1 - percentage, 3);
    el.textContent = Math.floor(eased * target);
    if (percentage < 1) {
      requestAnimationFrame(function (ts) {
        countUp(el, startTime, ts);
      });
    } else {
      el.textContent = target;
    }
  }

  var statsTriggered = false;

  function checkStats() {
    if (statsTriggered) return;
    var statsRow = document.querySelector('.stats-row');
    if (!statsRow) return;
    var rect = statsRow.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      statsTriggered = true;
      // All three start at exactly the same timestamp
      requestAnimationFrame(function (startTimestamp) {
        document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
          el.textContent = '0';
          countUp(el, startTimestamp, startTimestamp);
        });
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
