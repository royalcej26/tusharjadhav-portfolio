/* ============================================
   CURSOR.JS — Custom Cursor Logic
============================================ */

(function () {
  // Only run on devices with a fine pointer (mouse)
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (!dot || !ring) return;

  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;
  let rafId;

  // Track mouse position
  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows instantly
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  // Ring follows with slight lag
  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const hoverTargets =
    "a, button, .pill, .tag, .project-card, .btn-primary, .btn-ghost";

  document.addEventListener("mouseover", function (e) {
    if (e.target.closest(hoverTargets)) {
      dot.classList.add("hovering");
      ring.classList.add("hovering");
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(hoverTargets)) {
      dot.classList.remove("hovering");
      ring.classList.remove("hovering");
    }
  });

  // Click state
  document.addEventListener("mousedown", function () {
    dot.classList.add("clicking");
    ring.classList.add("clicking");
  });

  document.addEventListener("mouseup", function () {
    dot.classList.remove("clicking");
    ring.classList.remove("clicking");
  });

  // Hide cursor when it leaves the window
  document.addEventListener("mouseleave", function () {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  document.addEventListener("mouseenter", function () {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
})();
