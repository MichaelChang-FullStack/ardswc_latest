
$(function () {
  (async function () {
    try {
      
        $("#footer_main").append(
          '<div class="footer_main_part1" id="footer_main_part1">'+
          '<div class="footer_main_part1_sub1">'+
              '<span>點選收合</span>'+
          '</div>'+
          '<div class="footer_main_part1_sub2" id="footershowBtn" onclick="toggleFooter()">'+
              '<img src="../asset/images/footer_hide_btn.png" >'+
          '</div>'+
          '<div class="footer_main_part1_sub3">'+
            '<img src="../asset/images/footerpartionstrip.png">'+
          '</div>'+
        '</div>'+
        '<div class="footer_main_part2" id="footer-menu" >'+
          '<section class="py-0 pt-7 bg-1000">'+
            '<div class="container_footter">'+
              '<div class="row">'+
                '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 col-lg-3 mb-3">'+
                  '<h5 class="lh-lg fw-bold text-white">玩轉水保</h5>'+
                  '<img class="nav_partition_for_footerbar" src="../asset/images/Nav_partition_bar.png">'+
                  '<ul class="list-unstyled mb-md-4 mb-lg-0">'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">互動遊戲</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">繪本圖書館</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">水保電影院</a></li>'+
                  '</ul>'+
                '</div>'+
                '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">'+
                  '<h5 class="lh-lg fw-bold text-white">水保教室</h5>'+
                  '<img class="nav_partition_for_footerbar" src="../asset/images/Nav_partition_bar.png">'+
                  '<div class="footterbar_main">'+
                  '<div class="footterbar_main_part1">'+
                  '<ul class="list-unstyled mb-md-4 mb-lg-0">'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">圖書</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">教材</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">教案</a></li>'+
                  '</ul>'+
                  '</div>'+
                  '<div class="footterbar_main_part2">'+
                    '<ul class="list-unstyled mb-md-4 mb-lg-0">'+
                      '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">影片</a></li>'+
                    '</ul>'+
                   '</div>'+
                '</div>'+
                '</div>'+
                '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">'+
                  '<h5 class="lh-lg fw-bold text-white">知識寶庫</h5>'+
                  '<img class="nav_partition_for_footerbar" src="../asset/images/Nav_partition_bar.png">'+
                  '<ul class="list-unstyled mb-md-4 mb-lg-0">'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">水保知識學</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">教學助手</a></li>'+
                  '</ul>'+
                '</div>'+
                '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">'+
                  '<h5 class="lh-lg fw-bold text-white">活動競賽場</h5>'+
                  '<img class="nav_partition_for_footerbar" src="../asset/images/Nav_partition_bar.png">'+
                  '<ul class="list-unstyled mb-md-4 mb-lg-0">'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">活動訊息</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">活動照片</a></li>'+
                  '</ul>'+
                '</div>'+
                '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">'+
                  '<h5 class="lh-lg fw-bold text-white">戶外教學趣</h5>'+
                  '<img class="nav_partition_for_footerbar" src="../asset/images/Nav_partition_bar.png">'+
                  '<ul class="list-unstyled mb-md-4 mb-lg-0">'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">教室地圖</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">教室申請</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">教室申請結果</a></li>'+
                  '</ul>'+
                '</div>'+
                '<div class="col-6 col-md-4 col-lg-3 col-xxl-2 mb-3">'+
                  '<h5 class="lh-lg fw-bold text-white">酷學校</h5>'+
                  '<img class="nav_partition_for_footerbar" src="../asset/images/Nav_partition_bar.png">'+
                  '<ul class="list-unstyled mb-md-4 mb-lg-0">'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">酷學校地圖</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">家族查詢</a></li>'+
                    '<li class="lh-lg"><a class="text-200 text-decoration-none" href="#!">積分排名</a></li>'+
                  '</ul>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</section>'+
        '</div>'+
        '<div class="footer_main_part3">'+
          '<div class="footer_main_part3_sub1">'+
            '<div class="footer_main_part3_sub1_nav">'+
              '<span>網站導覽</span>'+
            '</div>'+
            '<div class="footer_main_part3_sub1_nav">'+
              '<span>使用說明</span>'+
            '</div>'+
            '<div class="footer_main_part3_sub1_nav">'+
              '<span>聯絡我們</span>'+
            '</div>'+
            '<div class="footer_main_part3_sub1_nav">'+
              '<span>資料開放宣告</span>'+
            '</div>'+
            '<div class="footer_main_part3_sub1_nav">'+
              '<span>隱私權保護政策</span>'+
            '</div>'+
            '<div class="footer_main_part3_sub1_nav">'+
              '<span>網站安全政策</span>'+
            '</div>'+
          '</div>'+
          '<div class="footer_main_part3_sub2">'+
            '<div class="footer_main_part3_sub2_child1">'+
                '<div class="footer_main_part3_sub2_child1_1">'+
                    '<div class="nav_footer_main_img">'+
                      '<img src="../asset/images/nav_footer_main.png">'+
                    '</div>'+
                '</div>'+
                '<div class="footer_main_part3_sub2_child1_2">'+
                  '<div  class="footer_main_part3_sub1_address">'+
                      '<span>版權所有 ©2023 MOA ALL Rights Reserved.</span>'+
                  '</div>'+
                  '<div  class="footer_main_part3_sub1_address">'+
                      '<span>地址  54044 南投縣南投市中興新村光華路6號</span>'+
                    '</div>'+
                    '<div  class="footer_main_part3_sub1_address">'+
                      '<span>電話  (049)239-4300</span>'+
                    '</div>'+
                    '<div  class="footer_main_part3_sub1_address">'+
                      '<span>服務時間  星期一至星期五 08:30～12:30 及 13:30～17:30</span>'+
                  '</div>'+
                '</div>'+
            '</div>'+
            '<div class="footer_main_part3_sub2_child2">'+
              '<div class="nav_footer_certificate_img1">'+
                '<img src="../asset/images/nav_footer_certificate2.png">'+
              '</div>'+
              '<div class="nav_footer_certificate_img2">'+
                '<img src="../asset/images/nav_footer_certificate1.png">'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="gototop js-top">'+
          '<a href="#" class="js-gotop">'+
            '<img src="../asset/images/move_to_top.png" alt="Scroll to Top">'+
          '</a>'+
        '</div>'
        );
    } catch (error) {
      console.log(error);
    }
  })();
});


function toggleFooter() {
    var footerMenu = document.getElementById("footer-menu");
    var footerShowBtn = document.getElementById("footershowBtn");
    
    if (footerMenu.style.display === "none") {
      // Animate the footer menu from top to bottom and make it visible
      footerMenu.style.display = "block";
      footerMenu.style.animation = "showFooter 0.1s forwards";
    } else {
      // Animate the footer menu from bottom to top and hide it
      footerMenu.style.animation = "hideFooter 0.1s forwards";
      
      setTimeout(function() {
        footerMenu.style.display = "none";
      }, 50);
    }
  }


	var goToTop = function() {

$('.js-gotop').on('click', function(event){
  
  event.preventDefault();

  $('html, body').animate({
    scrollTop: $('html').offset().top
  }, 500, 'easeInOutExpo');
  
  return false;
});

$(window).scroll(function(){

  var $win = $(window);
  if ($win.scrollTop() > 200) {
    $('.js-top').addClass('active');
  } else {
    $('.js-top').removeClass('active');
  }

});

};

  goToTop();