/*
 * Duncan House POC — minimal vanilla JS.
 * Handles: mobile nav toggle, active-link highlighting, stubbed contact form.
 * No frameworks, no build step, no third-party trackers.
 */
document.addEventListener("DOMContentLoaded", function () {
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
});
