/* ============================================
   ANIMATIONS.JS — Number Countup + Scroll Reveals
============================================ */

(function () {
  /* ─── SCROLL REVEAL ───────────────────────
       Cards and sections fade up as you scroll
    ─────────────────────────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers — just show everything
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ─── NUMBER COUNTUP ──────────────────────
       Stat numbers count up from 0 when they
       scroll into view. data-target sets the end value.
    ─────────────────────────────────────────── */
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");

  function countUp(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 1200; // ms
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(function () {
      current += Math.ceil(target / steps);
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current;
    }, stepTime);
  }

  if ("IntersectionObserver" in window) {
    const statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            countUp(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  } else {
    // Fallback — just set the final numbers immediately
    statNumbers.forEach(function (el) {
      el.textContent = el.getAttribute("data-target");
    });
  }

  /* ─── ACTIVE NAV HIGHLIGHT ────────────────
       Highlights the correct nav link as you scroll
    ─────────────────────────────────────────── */
  const sections = document.querySelectorAll("section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  if ("IntersectionObserver" in window && navLinks.length) {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            navLinks.forEach(function (link) {
              link.classList.remove("active");
              if (link.getAttribute("href") === "#" + entry.target.id) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }
})();
