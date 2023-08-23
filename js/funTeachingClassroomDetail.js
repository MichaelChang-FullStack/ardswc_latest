async function getFunTeachingClassroomDetail(id) {
  var apiUrl = '/server/funTeachingClassroomDetail.php';
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      })
    })
    if (response.ok) {
      const data = await response.json();
      return data[0];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


$(document).ready(async function () {
  const {id} = getQueryString();
  const classroomDetail = await getFunTeachingClassroomDetail(id);
  const {Title, ClassName} = classroomDetail;
  console.log({classroomDetail})

  $("#classroom-title").append(`
    <img src="/Files/class/title/${Title}" alt="title_class01">
  `)

  $("#bread-title").append(`
    <h6 class="text2">${ClassName}</h6>
  `)


  const informationinformationtabs = $(".informationtab");
  const greenLine = $(".informationgreen-line");

  function adjustGreenLine() {
    const activeinformationtab = $(".informationtab.active");
    greenLine.css({
      width: activeinformationtab.outerWidth(),
      left: activeinformationtab.position().left
    });
  }



  // Set the first tab and its content as active by default
  $(".informationtab:first-child").addClass("active");
  $(".information_detail_content1-info").addClass("active-info");

  // Call the adjustGreenLine function on page load to set the initial position of the green line
  adjustGreenLine();

  informationinformationtabs.on("click", function () {
    const target = $(this).data("target");
    const activeinformationtab = $(".informationtab.active");
    const targetinformationtab = $(this);
    let direction;

    if (!targetinformationtab.hasClass("active")) {
      const activeIndex = activeinformationtab.index();
      const targetIndex = targetinformationtab.index();

      if (targetIndex > activeIndex) {
        direction = "right";
      } else {
        direction = "left";
      }

      const infoDirection = direction === "right" ? "-100%" : "100%";

      activeinformationtab.removeClass("active");
      targetinformationtab.addClass("active");

      const activeInfo = $(".active-info");
      const targetInfo = $("." + target);

      activeInfo.animate({ left: infoDirection }, 100, function () {
        activeInfo.removeClass("active-info").hide();
        targetInfo.css("display", "flex").css("left", infoDirection).show().animate(
          { left: "0" },
          100,
          function () {
            targetInfo.addClass("active-info");
          }
        );
      });

      adjustGreenLine();
    }
  });

  $(window).resize(function () {
    adjustGreenLine();
  });

  function showNextTab() {
    const currentTab = $(".informationtab.active");
    const currentContent = $("." + currentTab.data("target"));
    const nextTab = currentTab.next(".informationtab");
    const nextContent = $("." + nextTab.data("target"));

    if (nextTab.length > 0) {
      currentTab.removeClass("active");
      currentContent.removeClass("active-info");
      nextTab.addClass("active");
      nextContent.addClass("active-info");
    }
  }

  function startTabCycle() {
    // Start cycling through tabs every 5 seconds
    setInterval(showNextTab, 5000);
  }

  // Call the startTabCycle function only on screens below 980px
  if ($(window).width() < 980) {
    startTabCycle();
  }

});


const swipermobile = new Swiper('.sample-slider.mobile', {
  loop: true,
  autoplay: {
    delay: 2000,
  },
  speed: 11500, // Slower transition between images
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination.mobile',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
});

swipermobile.el.addEventListener('mouseover', function () {
  swipermobile.autoplay.stop();
});

swipermobile.el.addEventListener('mouseleave', function () {
  swipermobile.autoplay.start();
});


const swiperpc = new Swiper('.sample-slider.pc', {
  loop: true,
  autoplay: {
    delay: 2000,
  },
  speed: 11500, // Slower transition between images
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination.pc',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },
});

swiperpc.el.addEventListener('mouseover', function () {
  swiperpc.autoplay.stop();
});

swiperpc.el.addEventListener('mouseleave', function () {
  swiperpc.autoplay.start();
});

const mapmobile_menu_accordionItemHeaders = document.querySelectorAll(
  ".mapmobile_menu_accordion-item-header"
);

mapmobile_menu_accordionItemHeaders.forEach((mapmobile_menu_accordionItemHeader) => {
  mapmobile_menu_accordionItemHeader.addEventListener("click", (event) => {
    // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

    const currentlyActivemapmobile_menu_accordionItemHeader = document.querySelector(
      ".mapmobile_menu_accordion-item-header.activemobilemenu"
    );
    if (
      currentlyActivemapmobile_menu_accordionItemHeader &&
      currentlyActivemapmobile_menu_accordionItemHeader !== mapmobile_menu_accordionItemHeader
    ) {
      currentlyActivemapmobile_menu_accordionItemHeader.classList.toggle("activemobilemenu");
      currentlyActivemapmobile_menu_accordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }
    mapmobile_menu_accordionItemHeader.classList.toggle("activemobilemenu");
    const mapmobile_menu_accordionItemBody = mapmobile_menu_accordionItemHeader.nextElementSibling;
    if (mapmobile_menu_accordionItemHeader.classList.contains("activemobilemenu")) {
      mapmobile_menu_accordionItemBody.style.maxHeight = mapmobile_menu_accordionItemBody.scrollHeight + "px";
    } else {
      mapmobile_menu_accordionItemBody.style.maxHeight = 0;
    }
  });
});

function updateMenuDisplay() {
  const mapMenuMobile = document.getElementById("map_menu_mobile");
  const mapMenuPC = document.getElementById("map_menu_pc");

  if (window.innerWidth <= 1080) {
    mapMenuMobile.style.display = "block";
    mapMenuPC.style.display = "none";
  } else {
    mapMenuMobile.style.display = "none";
    mapMenuPC.style.display = "block";
  }
}

// Initial call
updateMenuDisplay();

// Listen for window resize events
window.addEventListener("resize", updateMenuDisplay);