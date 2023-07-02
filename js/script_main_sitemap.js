/*Main Search Active check*/
/*
const searchContainer = document.querySelector(".search-container");
searchContainer.addEventListener("change", function() {
    if (this.querySelector("#input_search").validity.valid) {
        this.classList.add("valid");
        document.querySelector(".main_container_part1_child2_sub2").style.width="50%";
    } else {
        this.classList.remove("valid");
        document.querySelector(".main_container_part1_child2_sub2").style.width="auto";
    }
});*/

const searchContainer = document.querySelector(".search-container");
searchContainer.addEventListener("change", function() {
    if (this.querySelector("#input_search").validity.valid) {
        this.classList.add("valid");
        document.querySelector(".main_container_part1_child2_sub2").style.width = "50%";
        console.log("50%");
    } else {
        this.classList.remove("valid");
        document.querySelector(".main_container_part1_child2_sub2").style.width = "auto";
    }
});

/*
function expandContainer() {
    document.getElementById('main_container').style.width = '50%';
    document.getElementById('input_search').focus();
    console.log('focus');
    document.querySelector(".search-container").classList.add("valid");
  }*/

  function expandContainer() {
    document.getElementById('main_container').style.width = '50%';
    console.log('focus');
    document.querySelector(".search-container").classList.add("valid");
    document.getElementById('input_search').focus();
  }
  
  
  function shrinkContainer() {
    document.getElementById('main_container').style.width = 'auto';
  }
  

/* JS Nav Bar Start*/
        const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
const menuBtn = document.querySelector(".menu-btn");
const menuItems = document.querySelector(".menu-items");
const expandBtn = document.querySelectorAll(".expand-btn");


const menuCloseBtn = document.querySelector(".nav_mobile_close_btn");

function toggle() {
  // disable overflow body
  body.classList.toggle("overflow");
  // dark background
  overlay.classList.toggle("overlay--active");
  // add open class
  menuBtn.classList.toggle("open");
  menuItems.classList.toggle("open");
}

menuBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggle();
});

menuCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggle();
});

window.onkeydown = function (event) {
  const key = event.key; // const {key} = event; in ES6+
  const active = menuItems.classList.contains("open");
  if (key === "Escape" && active) {
    toggle();
  }
};

document.addEventListener("click", (e) => {
  let target = e.target,
    its_menu = target === menuItems || menuItems.contains(target),
    its_hamburger = target === menuBtn,
    menu_is_active = menuItems.classList.contains("open");
  if (!its_menu && !its_hamburger && menu_is_active) {
    toggle();
  }
});

// mobile menu expand
expandBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
  });
});