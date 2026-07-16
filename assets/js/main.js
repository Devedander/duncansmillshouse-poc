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
    "room-ophelia.html": [
      ["upstairs-bedroom-ophelia.jpg", "Upstairs Bedroom - Ophelia"],
      ["upstairs-bedroom-ophelia-002.jpg", "Upstairs Bedroom - Ophelia"]
    ],
    "room-lolita.html": [
      ["upstairs-bedroom-lolita.jpg", "Upstairs Bedroom - Lolita"],
      ["upstairs-bedroom-lolita-002.jpg", "Upstairs Bedroom - Lolita"],
      ["duncan-house-bedroom-001.jpg", "Duncan House Bedroom"]
    ],
    "room-upstairs-bath.html": [
      ["upstairs-bathroom-003.jpg", "Upstairs Bathroom"],
      ["upstairs-bathroom-001.jpg", "Upstairs Bathroom"],
      ["upstairs-bathroom-002.jpg", "Upstairs Bathroom"]
    ],
    "room-athenia.html": [["downstairs-bedroom-athenia.jpg", "Downstairs Bedroom - Athenia"]],
    "room-jezebel.html": [
      ["downstairs-bathroom-x-3.jpg", "Downstairs Bedroom - Jezebel"],
      ["downstairs-bedroom-x2.jpg", "Downstairs Bedroom - Jezebel"]
    ],
    "room-downstairs-bath.html": [["downstairs-bathroom.jpg", "Downstairs Bathroom"]],
    "room-dining.html": [
      ["dining-room.jpg", "Dining & Sitting Rooms"],
      ["living-room-fireplace.jpg", "Dining & Sitting Rooms"],
      ["siiting-room-stove.jpg", "Dining & Sitting Rooms"],
      ["parlor-piano.jpg", "Dining & Sitting Rooms"]
    ],
    "room-kitchen.html": [["kitchen.jpg", "Kitchen"]],
    "room-grounds-decks.html": [
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

  var file = window.location.pathname.split("/").pop() || "index.html";
  var gallery = roomGalleries[file];
  if (gallery) {
    var section = document.createElement("section");
    section.className = "section panel-cream-deep tight live-gallery-section";
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
  dialog.innerHTML = '<button type="button" aria-label="Close image">×</button><img alt="" hidden>';
  document.body.appendChild(dialog);
  var dialogImage = dialog.querySelector("img");
  dialog.querySelector("button").addEventListener("click", function () { dialog.close(); });
  dialog.addEventListener("click", function (event) { if (event.target === dialog) dialog.close(); });
  document.querySelectorAll(".gallery-card img, .outdoors-gallery img").forEach(function (image) {
    image.closest(".gallery-card")?.classList.add("is-clickable");
    image.addEventListener("click", function () {
      dialogImage.src = image.src;
      dialogImage.alt = image.alt;
      dialogImage.hidden = false;
      dialog.showModal();
    });
  });

  var footerMeta = document.querySelectorAll(".site-footer .footer-meta");
  var creditHost = footerMeta.length ? footerMeta[footerMeta.length - 1] : null;
  if (creditHost && !creditHost.querySelector(".site-credit")) {
    creditHost.insertAdjacentHTML("beforeend", '<br><span class="site-credit">Website by <a href="https://johnwangcs.com" target="_blank" rel="noopener noreferrer">johnwangcs.com</a></span>');
  }
});
