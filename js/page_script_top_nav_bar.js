$(function () {
  (async function () {
    try {
      
        $("#main_container_top_nav_bar").append(
          '<div class="main_container_part1">'+
          '<div class="main_container_part1_child1">'+
              '<div class="main_container_part1_child1_sub1">'+
                  '<img src="../asset/images/logo_main11.svg" alt="logo">'+
              '</div>'+
          '</div>'+
          '<div class="main_container_part1_child2">'+
              '<div class="main_container_part1_child2_sub1">'+
                  '<img src="../asset/images/Top_ass_icon.png" alt="Top_ass_icon">'+
              '</div>'+
              '<div class="main_container_part1_child2_sub2" id="main_container">'+
                  '<div class="search-container valid" onclick="expandContainer()">'+
                    '<input type="text" class="input_search" id="input_search" placeholder="輸入關鍵字..." required>'+
                    '<div class="search-img" tabindex="1">'+
                      '<div class="search-img_part1">'+
                        '<img src="../asset/images/icon_search.svg" alt="Search" class="search-icon">'+
                      '</div>'+
                      '<div class="search-img_part2">'+
                        '<span class="search_text">搜尋</span>'+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '<div class="main_container_part1_child2_sub3">'+
                  '<button class="btn-14" tabindex="2"><span>前往推廣版</span></button>'+
              '</div>'+
              '<div class="menu-btn">'+
                '<div class="menu-btn__lines"></div>'+
              '</div>'+
          '</div>'+
      '</div>'+
      '<div class="main_container_part2">'+
        '<header class="navbar sticky">'+
          '<ul class="menu-items">'+
                  '<div class="nav_mobile_part1">'+
                    '<div class="nav_mobile_close_btn">'+
                        '<img src="../asset/images/menu_mobile_active.svg" alt="menu_mobile_active">'+
                    '</div>'+
                  '</div>'+
                  '<div class="nav_mobile_part2">'+
                      '<div class="search-container valid">'+
                        '<input type="text" class="input_search" id="input_search2" placeholder="輸入關鍵字..." required>'+
                        '<div class="search-img">'+
                          '<div class="search-img_part1">'+
                            '<img src="../asset/images/icon_search.svg" alt="Search" class="search-icon">'+
                          '</div>'+
                          '<div class="search-img_part2">'+
                            '<span class="search_text">搜尋</span>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                  '</div>'+
                  '<li class="dropdown">'+
                    '<h4 class="menu-item first-item expand-btn " tabindex="3" >玩轉水保</h4>'+
                  '<div class="menu-itemhr"> <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div> <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div></div>'+
                    '<ul class="dropdown-menu sample">'+
                      '<li><a href="#" class="menu-item">互動遊戲</a></li>'+
                      '<li><a href="#" class="menu-item">繪本圖書館</a></li>'+
                      '<li><a href="#" class="menu-item">水保電影院</a></li>'+
                    '</ul>'+
                  '</li>'+
                  '<li class="nav_partition"><hr class="partition_strip"></hr></li>'+
                  '<li class="dropdown">'+
                    '<h4 href="#" class="menu-item first-item expand-btn" tabindex="4">水保教室</h4>'+
                    '<div class="menu-itemhr"> <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div> <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div></div>'+
                    '<ul class="dropdown-menu sample" >'+
                      '<li><a href="#" class="menu-item">圖書</a></li>'+
                      '<li><a href="#" class="menu-item">教材</a></li>'+
                      '<li><a href="#" class="menu-item">教案</a></li>'+
                      '<li><a href="#" class="menu-item">影片</a></li>'+
                    '</ul>'+
                  '</li>'+
                  '<li class="nav_partition"><hr class="partition_strip"></hr></li>'+
                  '<li class="dropdown">'+
                    '<h4 href="#" class="menu-item first-item expand-btn" tabindex="5">知識寶庫</h4>'+
                    '<div class="menu-itemhr"> <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div> <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div></div>'+
                    '<ul class="dropdown-menu sample" >'+
                      '<li><a href="#" class="menu-item">水保知識學</a></li>'+
                      '<li><a href="#" class="menu-item">教學助手</a></li>'+
                    '</ul>'+
                  '</li>'+
                  '<li class="nav_partition"><hr class="partition_strip"></hr></li>'+
                  '<li class="dropdown">'+
                    '<h4 href="#" class="menu-item first-item expand-btn" tabindex="6">活動競賽場</h4>'+
                    '<div class="menu-itemhr"> <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div> <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div></div>'+
                    '<ul class="dropdown-menu sample" id="menu4" >'+
                      '<li><a href="#" class="menu-item">活動訊息</a></li>'+
                      '<li><a href="#" class="menu-item">活動照片</a></li>'+
                    '</ul>'+
                  '</li>'+
                  '<li class="nav_partition"><hr class="partition_strip"></hr></li>'+
                  '<li class="dropdown">'+
                    '<h4 href="#" class="menu-item first-item expand-btn" tabindex="7">戶外教學趣</h4>'+
                    '<div class="menu-itemhr"> <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div> <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div></div>'+
                    '<ul class="dropdown-menu sample" id="menu5" >'+
                      '<li><a href="#" class="menu-item">教室地圖</a></li>'+
                      '<li><a href="#" class="menu-item">教室申請</a></li>'+
                      '<li><a href="#" class="menu-item">教室申請結果</a></li>'+
                    '</ul>'+
                  '</li>'+
                  '<li class="nav_partition"><hr class="partition_strip"></hr></li>'+
                  '<li class="dropdown">'+
                    '<h4 href="#" class="menu-item first-item expand-btn" tabindex="8">酷學校</h4>'+
                    '<div class="menu-itemhr"> <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div> <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div></div>'+
                    '<ul class="dropdown-menu sample" id="menu6" >'+
                      '<li><a href="#" class="menu-item">酷學校地圖</a></li>'+
                      '<li><a href="#" class="menu-item">家族查詢</a></li>'+
                      '<li><a href="#" class="menu-item">積分排名</a></li>'+
                    '</ul>'+
                  '</li>'+
                '</ul>'+
        '</header>'+
        '<div class="overlay"></div>'+
      '<div class="nav_mobile_part3">'+
                      '<div class="search-container1 valid">'+
                        '<input type="text" class="input_search" id="input_search3" placeholder="輸入關鍵字..." required>'+
                        '<div class="search-img">'+
                          '<div class="search-img_part1">'+
                            '<img src="../asset/images/icon_search.svg" alt="Search" class="search-icon">'+
                          '</div>'+
                          '<div class="search-img_part2">'+
                            '<span class="search_text">搜尋</span>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                  '</div>'+
      '</div>'            
        );


const searchContainer = document.querySelector(".search-container");
searchContainer.addEventListener("change", function() {
    if (this.querySelector("#input_search").validity.valid) {
        this.classList.add("valid");
        document.querySelector(".main_container_part1_child2_sub2").style.width = "50%";
        //document.querySelector(".main_container_part1_child2_sub2").style["max-width"] = "554px";

        console.log("50%");
    } else {
        this.classList.remove("valid");
        document.querySelector(".main_container_part1_child2_sub2").style.width = "auto";
    }
});





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
  
        }
        catch (error) {
      console.log(error);
    }
  })();
});

function expandContainer() {
  document.getElementById('main_container').style.width = '50%';
  console.log('focus');
  document.querySelector(".search-container").classList.add("valid");
  document.getElementById('input_search').focus();
}


function shrinkContainer() {
  document.getElementById('main_container').style.width = 'auto';
}




