document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var roomGalleries = {
    "room-ophelia": [
      ["upstairs-bedroom-ophelia.jpg", "Upstairs Bedroom - Ophelia"],
      ["upstairs-bedroom-ophelia-002.jpg", "Upstairs Bedroom - Ophelia"]
    ],
    "room-lolita": [
      ["upstairs-bedroom-lolita.jpg", "Upstairs Bedroom - Lolita"],
      ["upstairs-bedroom-lolita-002.jpg", "Upstairs Bedroom - Lolita"],
      ["duncan-house-bedroom-001.jpg", "Duncan House Bedroom"]
    ],
    "room-upstairs-bath": [
      ["upstairs-bathroom-003.jpg", "Upstairs Bathroom"],
      ["upstairs-bathroom-001.jpg", "Upstairs Bathroom"],
      ["upstairs-bathroom-002.jpg", "Upstairs Bathroom"]
    ],
    "room-athenia": [["downstairs-bedroom-athenia.jpg", "Downstairs Bedroom - Athenia"]],
    "room-jezebel": [
      ["downstairs-bathroom-x-3.jpg", "Downstairs Bedroom - Jezebel"],
      ["downstairs-bedroom-x2.jpg", "Downstairs Bedroom - Jezebel"]
    ],
    "room-downstairs-bath": [["downstairs-bathroom.jpg", "Downstairs Bathroom"]],
    "room-dining": [
      ["dining-room.jpg", "Dining & Sitting Rooms"],
      ["living-room-fireplace.jpg", "Dining & Sitting Rooms"],
      ["siiting-room-stove.jpg", "Dining & Sitting Rooms"],
      ["parlor-piano.jpg", "Dining & Sitting Rooms"]
    ],
    "room-kitchen": [["kitchen.jpg", "Kitchen"]],
    "room-grounds-decks": [
      ["front-deck.jpg", "Grounds & Decks"],
      ["grounds-field2.jpg", "Grounds & Decks"],
      ["grounds-chairs.jpg", "Grounds & Decks"],
      ["grounds-cows.jpg", "Grounds & Decks"],
      ["grounds-field.jpg", "Grounds & Decks"],
      ["hot-tub.jpg", "Grounds & Decks"],
      ["front-porch.jpg", "Grounds & Decks"],
      ["side-deck.jpg", "Grounds & Decks"],
      ["cows.jpg", "Grounds & Decks"],
      ["heron.jpg", "Grounds & Decks"],
      ["house-front-flowser2.jpg", "Grounds & Decks"]
    ]
  };

  /* Cloudflare Pages supports both /room-ophelia and /room-ophelia.html.
     Normalize the current path so room galleries work on either URL. */
  var roomGalleryKey = (window.location.pathname.split("/").pop() || "index").replace(/\.html$/i, "");
  var liveRoomAliases = {
    "upstairs-bedroom-ophelia": "room-ophelia",
    "upstairs-bedroom-lolita": "room-lolita",
    "upstairs-bathroom": "room-upstairs-bath",
    "downstairs-bedroom-athenia": "room-athenia",
    "downstairs-bedroom-jezebel": "room-jezebel",
    "downstairs-bathroom": "room-downstairs-bath",
    "dining-sitting-rooms": "room-dining",
    "kitchen": "room-kitchen",
    "grounds-decks": "room-grounds-decks"
  };
  var gallery = roomGalleries[liveRoomAliases[roomGalleryKey] || roomGalleryKey];
  if (gallery) {
    var section = document.createElement("section");
    section.className = "section panel-cream-deep tight live-gallery-section gallery-count-" + gallery.length;
    section.innerHTML = '<div class="container"><div class="section-head"><h2>View Gallery:</h2><p>(Click any thumbnail)</p></div><div class="gallery-grid"></div></div>';
    var grid = section.querySelector(".gallery-grid");
    gallery.forEach(function (item) {
      var figure = document.createElement("figure");
      figure.className = "gallery-card";
      figure.innerHTML = '<div class="thumb"><img src="assets/img/' + item[0] + '" alt="' + item[1].replace(/"/g, "&quot;") + '" loading="lazy"></div>';
      grid.appendChild(figure);
    });
    var reservation = document.querySelector("main .panel-cream-deep");
    if (reservation) reservation.parentNode.insertBefore(section, reservation.nextSibling);
    else document.querySelector("main").appendChild(section);
  }

  var dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";
  dialog.innerHTML = '<button type="button" aria-label="Close image">×</button><button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous image" hidden>‹</button><img alt="" hidden><button type="button" class="lightbox-nav lightbox-next" aria-label="Next image" hidden>›</button>';
  document.body.appendChild(dialog);
  var dialogImage = dialog.querySelector("img");
  var previousImageButton = dialog.querySelector(".lightbox-prev");
  var nextImageButton = dialog.querySelector(".lightbox-next");
  var activeGalleryImages = [];
  var activeGalleryIndex = 0;
  var showGalleryImage = function (index) {
    activeGalleryIndex = (index + activeGalleryImages.length) % activeGalleryImages.length;
    var activeImage = activeGalleryImages[activeGalleryIndex];
    dialogImage.src = activeImage.src;
    dialogImage.alt = activeImage.alt;
    dialogImage.hidden = false;
  };
  dialog.querySelector("button").addEventListener("click", function () { dialog.close(); });
  previousImageButton.addEventListener("click", function () { showGalleryImage(activeGalleryIndex - 1); });
  nextImageButton.addEventListener("click", function () { showGalleryImage(activeGalleryIndex + 1); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("keydown", function (event) {
    if (activeGalleryImages.length < 2) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); showGalleryImage(activeGalleryIndex - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); showGalleryImage(activeGalleryIndex + 1); }
  });
  document.querySelectorAll(".gallery-card img:not(.static-zoom-image), .outdoors-gallery img").forEach(function (image) {
    image.closest(".gallery-card")?.classList.add("is-clickable");
    image.addEventListener("click", function () {
      var gallery = image.closest(".local-shops-gallery, .outdoors-gallery, .live-gallery-section .gallery-grid");
      activeGalleryImages = gallery ? Array.from(gallery.querySelectorAll("img")) : [image];
      previousImageButton.hidden = activeGalleryImages.length < 2;
      nextImageButton.hidden = activeGalleryImages.length < 2;
      showGalleryImage(activeGalleryImages.indexOf(image));
      dialog.showModal();
    });
  });

  var footerMeta = document.querySelectorAll(".site-footer .footer-meta");
  var creditHost = footerMeta.length ? footerMeta[footerMeta.length - 1] : null;
  if (creditHost && !creditHost.querySelector(".site-credit")) {
    creditHost.insertAdjacentHTML("beforeend", '<br><span class="site-credit">Website by <a href="https://johnwangcs.com" target="_blank" rel="noopener noreferrer">johnwangcs.com</a></span>');
  }

  /* Give every page the same gentle fade-and-lift entrance as the home hero. */
  var loadGroups = document.querySelectorAll([
    ".site-header .wordmark",
    ".site-header .main-nav li",
    "main .breadcrumb",
    "main .hero-copy > *",
    "main .hero-image",
    "main .section-head > *",
    "main .two-col > *",
    "main .gallery-grid > *",
    "main .photo-strip > *",
    "main .contact-grid > *",
    "main .legal-content > *",
    "main .rate-highlight",
    "main .quote-block .container > *",
    ".site-footer .container > *"
  ].join(","));

  loadGroups.forEach(function (element, index) {
    element.classList.add("load-in");
    element.style.setProperty("--load-delay", Math.min(index * 45, 720) + "ms");
  });
  document.body.classList.add("motion-ready");

  /* The Village image begins its zoom only once it is actually on screen. */
  var viewportZoomImages = document.querySelectorAll(".split-hero ~ .section .image-panel img");
  if (viewportZoomImages.length) {
    var revealImageZoom = function (image) { image.classList.add("viewport-zoom"); };
    if ("IntersectionObserver" in window) {
      var imageZoomObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealImageZoom(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });
      viewportZoomImages.forEach(function (image) { imageZoomObserver.observe(image); });
    } else {
      viewportZoomImages.forEach(revealImageZoom);
    }
  }
});
