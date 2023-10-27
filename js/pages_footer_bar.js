$(function () {
  (async function () {
    try {
      $("#footer_main").append(
        '<div class="footer_main_part1" id="footer_main_part1">' +
          '<div class="footer_main_part1_sub1">' +
          '<span id="footermenu_btn_status"></span>' +
          "</div>" +
          '<div class="footer_main_part1_sub2" id="footershowBtn" onclick="toggleFooter()">' +
          '<img loading="lazy" src="../asset/images/footer_open_menu.svg" id="footer_hide_btn">' +
          '<img loading="lazy" src="../asset/images/footer_close_menu.svg" id="footer_hide_btn2">' +
          "</div>" +
          '<div class="footer_main_part1_sub3">' +
          "</div>" +
          "</div>" +
          '<div class="div_footer_bar_green_strip_below"><hr class="footer_bar_green_strip_below"></hr></div>' +
          '<div class="footer_main_part2" id="footer-menu" style="display:none;">' +
          '<section class="py-0 pt-7 bg-1000">' +
          '<div class="container_footter">' +
          '<div class="row">' +
          '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 col-lg-3 mb-3">' +
          '<h5 class="lh-lg fw-bold text-white">玩轉水保</h5>' +
          '<div class="footer-menu-itemhr"> <div class="footer-menu-itemhr-part1"><hr class="footer-menu-itemhr-line1"></div> <div class="footer-menu-itemhr-part2"><hr class="footer-menu-itemhr-line2"></div></div>' +
          '<ul class="list-unstyled mb-md-4 mb-lg-0">' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Search_Result.html?filterId=14,80,15,16">互動遊戲</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Search_Result.html?filterId=11,12">繪本圖書館</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Search_Result.html?filterId=24,25,26,27,28,29,30,31">水保電影院</a></li>' +
          "</ul>" +
          "</div>" +
          '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">' +
          '<h5 class="lh-lg fw-bold text-white">水保教室</h5>' +
          '<div class="footer-menu-itemhr"> <div class="footer-menu-itemhr-part1"><hr class="footer-menu-itemhr-line1"></div> <div class="footer-menu-itemhr-part2"><hr class="footer-menu-itemhr-line2"></div></div>' +
          '<div class="footterbar_main">' +
          '<div class="footterbar_main_part1">' +
          '<ul class="list-unstyled mb-md-4 mb-lg-0">' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Search_Result.html?filterId=2,55,56,57,58,59">圖書</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Search_Result.html?filterId=3,55,56,57,58,59">教材</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Search_Result.html?filterId=4,55,56,57,58,59">教案</a></li>' +
          "</ul>" +
          "</div>" +
          '<div class="footterbar_main_part2">' +
          '<ul class="list-unstyled mb-md-4 mb-lg-0">' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Search_Result.html?filterId=5,55,56,57,58,59">影片</a></li>' +
          "</ul>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">' +
          '<h5 class="lh-lg fw-bold text-white">知識寶庫</h5>' +
          '<div class="footer-menu-itemhr"> <div class="footer-menu-itemhr-part1"><hr class="footer-menu-itemhr-line1"></div> <div class="footer-menu-itemhr-part2"><hr class="footer-menu-itemhr-line2"></div></div>' +
          '<ul class="list-unstyled mb-md-4 mb-lg-0">' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Search_Result.html?filterId=6,7,8,9,10,13">水保知識學</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Search_Result.html?filterId=17,18,19,20">教學助手</a></li>' +
          "</ul>" +
          "</div>" +
          '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">' +
          '<h5 class="lh-lg fw-bold text-white">活動競賽場</h5>' +
          '<div class="footer-menu-itemhr"> <div class="footer-menu-itemhr-part1"><hr class="footer-menu-itemhr-line1"></div> <div class="footer-menu-itemhr-part2"><hr class="footer-menu-itemhr-line2"></div></div>' +
          '<ul class="list-unstyled mb-md-4 mb-lg-0">' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Event_Arena_Event_Information.html">活動訊息</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Event_Arena_Event_Photos.html">活動照片</a></li>' +
          "</ul>" +
          "</div>" +
          '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">' +
          '<h5 class="lh-lg fw-bold text-white">戶外教學趣</h5>' +
          '<div class="footer-menu-itemhr"> <div class="footer-menu-itemhr-part1"><hr class="footer-menu-itemhr-line1"></div> <div class="footer-menu-itemhr-part2"><hr class="footer-menu-itemhr-line2"></div></div>' +
          '<ul class="list-unstyled mb-md-4 mb-lg-0">' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Fun_Outdoor_Teaching_Classroom_Map.html">教室地圖</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="https://www.ardswc.gov.tw/Home/Apply/">教室申請</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Classroom_Application_Results.html">教室申請結果</a></li>' +
          "</ul>" +
          "</div>" +
          '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">' +
          '<h5 class="lh-lg fw-bold text-white">酷學校</h5>' +
          '<div class="footer-menu-itemhr"> <div class="footer-menu-itemhr-part1"><hr class="footer-menu-itemhr-line1"></div> <div class="footer-menu-itemhr-part2"><hr class="footer-menu-itemhr-line2"></div></div>' +
          '<ul class="list-unstyled mb-md-4 mb-lg-0">' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Fun_Indoor_Teaching_Classroom_Map.html">酷學校地圖</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/Cool_School_Family.html">家族查詢</a></li>' +
          '<li class="lh-lg"><a class="text-200 text-decoration-none" href="/pages/cool_school.html">積分排名</a></li>' +
          "</ul>" +
          "</div>" +
          "</div>" +
          "</div>" +
          "</section>" +
          "</div>" +
          '<div class="footer_main_part3">' +
          '<div class="footer_main_part3_sub1">' +
          '<div class="footer_main_part3_sub1_nav">' +
          '<a href="/pages/Sitemap.html">' +
          "<h5>網站導覽</h5>" +
          "</a>" +
          "</div>" +
          '<div class="footer_main_part3_sub1_nav">' +
          "<h5 >使用說明</h5>" +
          "</div>" +
          '<div class="footer_main_part3_sub1_nav">' +
          '<a href="/pages/contact_us.html">' +
          "<h5>聯絡我們</h5>" +
          "</a>" +
          "</div>" +
          '<div class="footer_main_part3_sub1_nav">' +
          '<a href="/pages/Announcement.html">' +
          "<h5>資料開放宣告</h5>" +
          "</a>" +
          "</div>" +
          '<div class="footer_main_part3_sub1_nav">' +
          '<a href="/pages/Privacy_Policy.html">' +
          "<h5>隱私權保護政策</h5>" +
          "</a>" +
          "</div>" +
          '<div class="footer_main_part3_sub1_nav">' +
          '<a href="/pages/Website_Security_Policy.html">' +
          "<h5>網站安全政策</h5>" +
          "</a>" +
          "</div>" +
          '<div class="footer_main_part3_sub1_nav">' +
          '<a href="/pages/Related_Link.html">' +
          "<h5>相關連結</h5>" +
          "</a>" +
          "</div>" +
          "</div>" +
          '<div class="footer_main_part3_sub2">' +
          '<div class="footer_main_part3_sub2_child1">' +
          '<div class="footer_main_part3_sub2_child1_1">' +
          '<div class="nav_footer_main_img">' +
          '<img loading="lazy" src="../asset/images/nav_footer_main.png" alt="nav_footer_main1">' +
          "</div>" +
          "</div>" +
          '<div class="footer_main_part3_sub2_child1_2">' +
          '<div  class="footer_main_part3_sub1_address">' +
          "<h6>版權所有 ©2023 ARDSWC ALL Rights Reserved.</h6>" +
          "</div>" +
          '<div  class="footer_main_part3_sub1_address">' +
          "<h6>地址  54044 南投縣南投市中興新村光華路6號</h6>" +
          "</div>" +
          '<div  class="footer_main_part3_sub1_address">' +
          "<h6>電話  (049)239-4300</h6>" +
          "</div>" +
          '<div  class="footer_main_part3_sub1_address">' +
          "<h6>服務時間  星期一至星期五 08:30～12:30 及 13:30～17:30</h6>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="footer_main_part3_sub2_child2">' +
          '<div class="nav_footer_certificate_img1">' +
          '<img loading="lazy" src="../asset/images/nav_footer_certificate2.png" alt="nav_footer_certificate21">' +
          "</div>" +
          '<div class="nav_footer_certificate_img2">' +
          '<img loading="lazy" src="../asset/images/nav_footer_certificate1.png" alt="nav_footer_certificate11">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div id="modal-easter-eggs"></div>'+
          '<div class="fixed-container">' +
          '<div class="easter-eggs-task">' +
          '<a href="javascript:void(0)" onclick="openEasterEggsModal()" class="js-open-task-modal">' +
          '<div id="easter-eggs-img"></div>' +
          "</a>" +
          "</div>" +
          '<div class="gototop js-top">' +
          '<a href="#" class="js-gotop">' +
          '<div class="gototopimg"></div>' +
          "</a>" +
          "</div>" +
          "</div>"+
          '<link rel="stylesheet" type="text/css" href="../component/easterEggs/easterEggs.css">'+
          '<script src="../component/easterEggs/easterEggs.js"></script>'
      );
      /*Move to Top Icon*/
      var element = document.querySelector(".gototopimg");
      var clicked = false;
      // Change background image on hover
      element.addEventListener("mouseenter", function () {
        element.style.backgroundImage =
          "url(../asset/images/icon-goto-top-hover.svg)";
      });

      element.addEventListener("mouseleave", function () {
        if (!clicked) {
          element.style.backgroundImage =
            "url(../asset/images/icon-goto-top-nomal.svg)";
        }
      });

      // Change background image on click
      element.addEventListener("click", function () {
        clicked = true;
        element.style.backgroundImage =
          "url(../asset/images/icon-goto-top-click.svg)";
        setTimeout(() => {
          element.style.backgroundImage =
            "url(../asset/images/icon-goto-top-nomal.svg)";
        }, 300);
      });

      // Restore normal background image on page refresh or navigation
      window.addEventListener("beforeunload", function () {
        element.style.backgroundImage =
          "url(../asset/images/icon-goto-top-nomal.svg)";
      });

      document.getElementById("footermenu_btn_status").innerHTML = "點選展開";
    } catch (error) {
      console.log(error);
    }
  })();
});

function toggleFooter() {
  var footerMenu = document.getElementById("footer-menu");
  var footerShowBtn = document.getElementById("footershowBtn");
  var footer_hide_btn = document.getElementById("footer_hide_btn");
  var footer_hide_btn2 = document.getElementById("footer_hide_btn2");

  if (footerMenu.style.display === "none") {
    // Animate the footer menu from top to bottom and make it visible
    footerMenu.style.display = "block";
    footer_hide_btn.style.display = "block";
    footer_hide_btn2.style.display = "none";
    footerMenu.style.animation = "showFooter 0.1s forwards";
    document.getElementById("footermenu_btn_status").innerHTML = "點選收合";
  } else {
    // Animate the footer menu from bottom to top and hide it

    footer_hide_btn.style.display = "none";
    footer_hide_btn2.style.display = "block";
    document.getElementById("footermenu_btn_status").innerHTML = "點選展開";
    footerMenu.style.animation = "hideFooter 0.1s forwards";

    setTimeout(function () {
      footerMenu.style.display = "none";
    }, 50);
  }
}

var goToTop = function () {
  $(".js-gotop").on("click", function (event) {
    event.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $("html").offset().top,
      },
      500,
      "easeInOutExpo"
    );

    return false;
  });

  $(window).scroll(function () {
    var $win = $(window);
    if ($win.scrollTop() > 200) {
      $(".js-top").addClass("active");
    } else {
      $(".js-top").removeClass("active");
    }
  });
};

goToTop();

function footer_redirect_Sitemap() {
  current_page = sessionStorage.getItem("currentpage");
  if (current_page != "Sitemap") {
    window.location.href = "Sitemap.html";
  } else {
    alert("Your already in Sitemap page");
  }
}

function footer_redirect_contact_us() {
  current_page = sessionStorage.getItem("currentpage");
  if (current_page != "contact_us") {
    window.location.href = "contact_us.html";
  } else {
    alert("Your already in contact_us page");
  }
}

function footer_redirect_Announcement() {
  current_page = sessionStorage.getItem("currentpage");
  if (current_page != "Announcement") {
    window.location.href = "Announcement.html";
  } else {
    alert("Your already in Announcement page");
  }
}

function footer_redirect_Privacy_Policy() {
  current_page = sessionStorage.getItem("currentpage");
  if (current_page != "Privacy_Policy") {
    window.location.href = "Privacy_Policy.html";
  } else {
    alert("Your already in Privacy_Policy page");
  }
}

function footer_redirect_Website_Security_Policy() {
  current_page = sessionStorage.getItem("currentpage");
  if (current_page != "Website_Security_Policy") {
    window.location.href = "Website_Security_Policy.html";
  } else {
    alert("Your already in Website_Security_Policy page");
  }
}
