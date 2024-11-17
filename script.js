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

        // Ensure scroll functionality is added after header is loaded
        const header = document.querySelector('header');
        if (header) {
          window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
              header.classList.add('scrolled');  // Add 'scrolled' class when scrolling down
            } else {
              header.classList.remove('scrolled');  // Remove 'scrolled' class when at the top
            }
          });
        }
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

    nav.forEach((link) => {
      if (link.innerHTML.includes("Home") && (location.pathname === "/" || location.pathname.includes("index"))) {
        link.classList.add("selected");
      } else if (link.innerHTML.includes("Career") && location.pathname.includes("career")) {
        link.classList.add("selected");
      } else if (link.innerHTML.includes("Services") && location.pathname.includes("services")) {
        link.classList.add("selected");
      }
    });
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
      link.addEventListener('click', function () {
        window.hideMenu();
      });
    });
  }

  const carouselImages = document.querySelectorAll(".carousel-image");
  let currentIndex = 0;
  const intervalTime = 5000; // 5 seconds

  function showSlide(index) {
    // Remove active class from all images
    carouselImages.forEach((image) => image.classList.remove("active"));

    // Add active class to the current image
    carouselImages[index].classList.add("active");
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

});
