// menu
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
  navLinks.classList.remove("active");
  burger.classList.remove("open");
}

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  burger.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
    closeMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

// progressBar

window.addEventListener("scroll", () => {
  animateProgressBars();
});

// Fonction d'animation des barres de progression
function animateProgressBars() {
  // On sélectionne toutes les barres de progression
  const progressBars = document.querySelectorAll(".progress");

  progressBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect(); // Obtient la position de la barre
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      // Si la barre est visible à l'écran, on la remplit
      const percentage = bar.getAttribute("data-percentage"); // On récupère le pourcentage
      bar.style.width = percentage + "%"; // On applique le pourcentage à la largeur de la barre
      bar.nextElementSibling.innerHTML = percentage + "%"; // On met à jour le texte avec le pourcentage

      // Optionnel: on enlève l'écouteur pour ne pas refaire l'animation plusieurs fois
      bar.removeEventListener("scroll", animateProgressBars);
    }
  });
}

// Tableau des compétences avec leurs pourcentages
const competences = {
  html: 90,
  css: 80,
  js: 70,
  php: 60,
  github: 2,
  figma: 3,
  vscode: 90,
  blender: 1,
};

// Mise à jour des attributs data-percentage au chargement de la page
Object.keys(competences).forEach((skill) => {
  const pourcentage = competences[skill];

  // On met à jour l'attribut data-percentage des barres de progression
  const progressBar = document.getElementById(`${skill}-progress`);
  if (progressBar) {
    progressBar.setAttribute("data-percentage", pourcentage);
  }

  // On met à jour le texte visible du pourcentage
  const percentageText = document.getElementById(`${skill}-percentage`);
  if (percentageText) {
    percentageText.textContent = `0%`; // Initialisation à 0% avant l'animation
  }
});

/* CAROUSEL */

const track = document.getElementById("carousel-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (track && prevBtn && nextBtn) {
  // boucle infinie
  const slides = track.children;
  const firstSlide = slides[0];
  const lastSlide = slides[slides.length - 1];

  const firstClone = firstSlide.cloneNode(true);
  const lastClone = lastSlide.cloneNode(true);

  // les clones
  track.insertBefore(lastClone, firstSlide);
  track.appendChild(firstClone);

  let currentIndex = 1; // derniere slide

  function getSlideWidth() {
    return track.clientWidth;
  }

  function updateCarousel(animate = true) {
    if (animate) {
      track.style.transition = "transform 0.5s ease";
    } else {
      track.style.transition = "none";
    }
    track.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
  }

  // position
  updateCarousel(false);

  nextBtn.addEventListener("click", () => {
    if (currentIndex >= track.children.length - 1) return; // ne reviens pas avant la slide 1
    currentIndex++;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateCarousel();
  });

  track.addEventListener("transitionend", () => {
    if (track.children[currentIndex].isEqualNode(firstClone)) {
      currentIndex = 1;
      updateCarousel(false);
    }

    if (track.children[currentIndex].isEqualNode(lastClone)) {
      currentIndex = track.children.length - 2;
      updateCarousel(false);
    }
  });

  window.addEventListener("resize", () => updateCarousel(false));
}
