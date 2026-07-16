/*
 * Duncan House POC — minimal vanilla JS.
 * Handles: mobile nav toggle, active-link highlighting, stubbed contact form,
 * scroll-triggered fade-ins, and a light momentum/inertia scroll on desktop.
 * No frameworks, no build step, no third-party trackers.
 */
document.addEventListener("DOMContentLoaded", function () {
  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    // Close menu when a link is tapped (mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contact form: stubbed submission (no backend wired up in this POC).
  // Production option: point this form's action at a Formspree endpoint
  // (https://formspree.io) — e.g. <form action="https://formspree.io/f/xxxxxxx" method="POST">
  // and remove the JS below, letting Formspree handle delivery + spam filtering.
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = document.getElementById("form-status");
      if (note) {
        note.textContent =
          "This is a proof-of-concept form and does not send messages yet. Please use the email or phone number above to reach Karen directly.";
        note.hidden = false;
      }
    });
  }

  // Scroll reveals: mark content blocks as .reveal, then fade each in via
  // IntersectionObserver as it enters the viewport. Progressive enhancement —
  // if this never runs (old browser, JS disabled), content is already fully
  // visible per the CSS fallback for .reveal.
  if (!reducedMotion) {
    var revealTargets = document.querySelectorAll(
      [
        ".info-card",
        ".gallery-card",
        ".quote-block",
        ".contact-card",
        ".contact-form",
        ".map-embed",
        ".rate-highlight",
        ".policy-list",
        ".two-col > div",
        ".legal-content > h2",
        ".legal-content > h3",
        ".legal-content > p",
        ".photo-strip figure",
      ].join(",")
    );

    if ("IntersectionObserver" in window && revealTargets.length) {
      revealTargets.forEach(function (el, i) {
        el.classList.add("reveal");
        // Small stagger within each cluster of cards so grids feel alive
        // rather than popping in all at once.
        el.style.transitionDelay = Math.min(i % 6, 5) * 70 + "ms";
      });

      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );

      revealTargets.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  // Momentum scroll: a light inertia/easing layer over the mouse wheel on
  // desktop. Touch devices already get native momentum scrolling from the
  // OS, so this is skipped there, and it's skipped entirely for
  // prefers-reduced-motion. Keyboard scrolling (arrows, Page Up/Down, Space)
  // and scrollbar dragging are untouched — this only intercepts the wheel.
  var isTouch = matchMedia("(pointer: coarse)").matches;
  if (!reducedMotion && !isTouch) {
    var current = window.scrollY;
    var target = window.scrollY;
    var ticking = false;
    var maxScroll = function () {
      return document.documentElement.scrollHeight - window.innerHeight;
    };

    function animateScroll() {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        ticking = false;
      } else {
        requestAnimationFrame(animateScroll);
      }
      window.scrollTo(0, current);
    }

    window.addEventListener(
      "wheel",
      function (e) {
        // Let pinch-zoom (ctrl+wheel) and horizontal scroll pass through untouched.
        if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        e.preventDefault();
        target += e.deltaY;
        target = Math.max(0, Math.min(maxScroll(), target));
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(animateScroll);
        }
      },
      { passive: false }
    );

    // Keep target/current in sync with scrolls that didn't come from the
    // wheel handler (keyboard, scrollbar, anchor links, back/forward).
    var syncTimer;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        clearTimeout(syncTimer);
        syncTimer = setTimeout(function () {
          current = window.scrollY;
          target = window.scrollY;
        }, 80);
      },
      { passive: true }
    );
  }
});
