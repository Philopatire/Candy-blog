// Global Functions //
function selectorArray(selector) {
  return [...document.querySelectorAll(selector)];
}
// End Global Functions //

// Scroll //
let bodyElement = document.querySelector(".body");
let hash = window.location.hash;
if (hash) {
  let element = document.querySelector(hash);
  if (element) {
    bodyElement.scrollTo(0, element.offsetTop);
  }
}
// End Scroll //

// Change Theme //
function changeThemeColor(name) {
  let colorMain = colors[name].main;
  let colorAlt = colors[name].alt;
  let colorRgb = colors[name].rgb;
  let svgColors = selectorArray("svg .color");

  document.documentElement.style.setProperty("--main-color", colorMain);
  document.documentElement.style.setProperty("--main-color-alt", colorAlt);
  document.documentElement.style.setProperty("--bs-primary-rgb", colorRgb);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", colorMain);
  localStorage.setItem("theme-color", name);
  svgColors.forEach((color) => color.setAttribute("fill", colorMain));
}
const colors = {
  red: {
    main: "rgb(255, 69, 132)",
    alt: "rgb(203, 53, 104)",
    rgb: "255, 69, 132",
  },
  yellow: {
    main: "rgb(255, 153, 0)",
    alt: "rgb(219, 131, 0)",
    rgb: "255, 153, 0",
  },
  green: {
    main: "rgb(0, 150, 132)",
    alt: "rgb(0, 129, 114)",
    rgb: "0, 150, 132",
  },
  blue: {
    main: "rgb(0, 69, 132)",
    alt: "rgb(1, 49, 93)",
    rgb: "0, 69, 132",
  },
};
let colorsList = selectorArray(".color-list .color");
colorsList.forEach((color) => {
  color.addEventListener("click", () => {
    let colorName = color.getAttribute("data-color");
    changeThemeColor(colorName);
  });
});
if (localStorage.getItem("theme-color")) {
  // If there are theme stored on user device
  changeThemeColor(localStorage.getItem("theme-color"));
} else {
  // If there aren't theme stored on user device
  localStorage.setItem("theme-color", "red");
  changeThemeColor("red");
}
// End Chnage Theme //

// Toggle Menu //
let menu = document.getElementById("menu");
let menuBootstrap = new bootstrap.Offcanvas(menu);
let navLinks = selectorArray(".nav .nav-link");
let openBtn = document.getElementById("openMenu");
let closeBtn = document.getElementById("closeMenu");

openBtn.addEventListener("click", () => {
  menuBootstrap.show();
});
closeBtn.addEventListener("click", () => {
  menuBootstrap.hide();
});
navLinks.forEach((nav) => {
  nav.addEventListener("click", (e) => menuBootstrap.hide());
});
// End Toggle Menu //

// Filter Gallery //
let filterButton = selectorArray(".filter button");
let filterImage = selectorArray(".gallery .images .image");

filterButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    let filterData = btn.getAttribute("data-filter");
    filterButton.forEach((btn) => {
      if (btn.getAttribute("data-filter") != filterData) {
        btn.classList.remove("btn-primary");
      } else {
        btn.classList.add("btn-primary");
      }
    });

    filterImage.forEach((image) => {
      let categoryData = image.getAttribute("data-category");
      if (filterData !== categoryData && filterData !== "all") {
        image.style.display = "none";
      } else {
        image.style.display = "block";
      }
    });
  });
});
// End Filter Gallery //

// Toggle Skills Collapse //
let skillsBtns = selectorArray(".skills .skills-container ul li button");
skillsBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let collapse = document.getElementById(btn.getAttribute("data-target-id"));
    btn.parentElement.classList.toggle("rotated");
    new bootstrap.Collapse(collapse, {
      toggle: true,
    });
  });
});
// End Toggle Skills Collapse //
