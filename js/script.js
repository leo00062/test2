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

function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress");

  progressBars.forEach((bar) => {
    const rect = bar.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      const percentage = bar.getAttribute("data-percentage");
      bar.style.width = percentage + "%";
      bar.nextElementSibling.innerHTML = percentage + "%";
    }
  });
  document.getElementById("html-progress").setAttribute("data-percentage", 90);
  document.getElementById("css-progress").setAttribute("data-percentage", 80);
  document.getElementById("js-progress").setAttribute("data-percentage", 70);
  document.getElementById("php-progress").setAttribute("data-percentage", 60);
  document.getElementById("github-progress").setAttribute("data-percentage", 2);
  document.getElementById("figma-progress").setAttribute("data-percentage", 3);
  document
    .getElementById("vscode-progress")
    .setAttribute("data-percentage", 90);
  document
    .getElementById("blender-progress")
    .setAttribute("data-percentage", 1);
}

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
