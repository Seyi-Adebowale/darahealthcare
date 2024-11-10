document.addEventListener("DOMContentLoaded", function () {
  const headerContainers = document.querySelectorAll(".header-container");
  const footerContainers = document.querySelectorAll(".footer-container");

  function loadHeader(container) {
      fetch("header.html")
          .then((response) => response.text())
          .then((data) => {
              container.innerHTML = data;
              highlightNavLinks();
              initializeMenu();
          })
          .catch((error) => {
              console.error("Error loading header:", error);
          });
  }

  function loadFooter(container) {
      fetch("footer.html")
          .then((response) => response.text())
          .then((data) => {
              container.innerHTML = data;
          })
          .catch((error) => {
              console.error("Error loading footer:", error);
          });
  }

  headerContainers.forEach((container) => {
      loadHeader(container);
  });

  footerContainers.forEach((container) => {
      loadFooter(container);
  });

  function highlightNavLinks() {
      const nav = document.querySelectorAll("#navlinks ul li a");

      for (let i = 0; i < nav.length; i++) {

          if (
              nav[i].innerHTML.includes("Home") &&
              (location.pathname === "/" || location.pathname.includes("index"))
          ) {
              nav[i].classList.add("selected");
          } else if (
              nav[i].innerHTML.includes("Career") &&
              location.pathname.includes("career")
          ) {
              nav[i].classList.add("selected");
          } else if (
              nav[i].innerHTML.includes("Services") &&
              location.pathname.includes("services")
          ) {
              nav[i].classList.add("selected");
          }
      }
  }

  function initializeMenu() {
      const navLinks = document.querySelector("#navlinks");

      window.showMenu = function () {
          navLinks.style.right = "0";
      };
  
      window.hideMenu = function () {
          navLinks.style.right = "-800px";
      };

      const showMenuButton = document.querySelector(".show-menu-btn");
      const hideMenuButton = document.querySelector(".hide-menu-btn");
  
      if (showMenuButton && hideMenuButton) {
          showMenuButton.addEventListener("click", window.showMenu);
          hideMenuButton.addEventListener("click", window.hideMenu);
      }
  
      const menuLinks = document.querySelectorAll('#navlinks a');
      menuLinks.forEach(link => {
          link.addEventListener('click', function() {
              window.hideMenu(); 
          });
      });
  }
  
});

const carouselImages = document.querySelectorAll(".carousel-image");
const indicators = document.querySelectorAll(".indicator");

let currentIndex = 0;
const intervalTime = 5000; // 5 seconds

function showSlide(index) {
  // Remove active class from all images and indicators
  carouselImages.forEach((image) => image.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  // Add active class to the current image and indicator
  carouselImages[index].classList.add("active");
  indicators[index].classList.add("active");
}

// Automatically cycle through slides
function startCarousel() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    showSlide(currentIndex);
  }, intervalTime);
}

// Initialize
showSlide(currentIndex);
startCarousel();

// Manual slide selection
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentIndex = index;
    showSlide(currentIndex);
  });
});

