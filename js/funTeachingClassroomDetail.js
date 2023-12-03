async function getFunTeachingClassroomDetail(id) {
  var apiUrl = "/server/funTeachingClassroomDetail.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data[0];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getClassroomInfoImages(id) {
  var apiUrl = "/server/classroomInfoImages.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getClassroomInfoPic(id) {
  var apiUrl = "/server/classroomInfoPic.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data[0];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getClassroomInfoOpen(id) {
  var apiUrl = "/server/classroomInfoOpen.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getClassFacilityPic(id) {
  var apiUrl = "/server/classFacilityPic.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getClassFacility(id) {
  var apiUrl = "/server/classFacility.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getClassCondition(id) {
  var apiUrl = "/server/classCondition.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function setBgImage(infoImages) {
  infoImages.forEach((image) => {
    $("#classroom-info-images").append(`
      <div class="swiper-slide"><img loading="lazy" src="/Files/class/360/${image.Class_360}"></div>
    `);

    $("#classroom-info-images-mobile").append(`
    <div class="swiper-slide"><img loading="lazy" src="/Files/class/360/${image.Class_360}"></div>
    `);
  });
}

$(document).ready(async function () {
  const { id } = getQueryString();
  const classroomDetail = await getFunTeachingClassroomDetail(id);
  const infoImages = await getClassroomInfoImages(id);
  const openTimes = await getClassroomInfoOpen(id);
  const imagePic = await getClassroomInfoPic(id);
  const facilityPic = await getClassFacilityPic(id);
  const facility = await getClassFacility(id);
  const condition = await getClassCondition(id);
  const { Title, ClassName, Class_Introduction, Contact, Address, Tel, EMail } =
    classroomDetail;

  if (condition.length > 0) {
    $("#Class_Condition1").append(condition[0].Class_Condition1);
    $("#Class_Condition2").append(condition[0].Class_Condition2);
    $("#Class_Condition1-mobile").append(condition[0].Class_Condition1);
    $("#Class_Condition2-mobile").append(condition[0].Class_Condition2);
    $("#condition-video").append(`
      <video class='youtube' controls poster='/Files/class/videos/poster.png'>
        <source  src="/Files/class/videos/${condition[0].Class_MovieLink}" & Class_MovieLink & "' type='video/mp4'>
        您的瀏覽器不支援觀賞此影像!
      </video>
    `);
    $("#condition-video-mobile").append(`
    <video style="position: relative;width: 100%;height: 100vh;" class='youtube' controls poster='/Files/class/videos/poster.png'>
      <source  src="/Files/class/videos/${condition[0].Class_MovieLink}" & Class_MovieLink & "' type='video/mp4'>
      您的瀏覽器不支援觀賞此影像!
    </video>
  `);
    $("#condition-video-mobile-error").css("display", "none");
    $("#condition-video-error").css("display", "none");

  } else {
    $("#condition-video-mobile-error").css("display", "block");
    $("#condition-video-error").css("display", "block");

    $("#condition-video").css("display", "none");
    $("#condition-video-mobile").css("display", "none");
  }

  let classFacilityContent = "";

  for (let i = 0; i < facility.length; i++) {
    const top = `<div class="detail_content_main_2_column">
    <figure>
      <div class="detail_content2_part_title">
        ${facility[i].Class_Facility}
      </div>
      <div class="detail_content2_part_content1">`;
    let center = "";
    for (let j = 0; j < facilityPic.length; j++) {
      if (facilityPic[j].Class_Facility === facility[i].Class_Facility) {
        center += ` <a href="#"
        class="fancybox" data-fancybox="gallery1" data-transition-effect="circular" data-loop="true">
        <img loading="lazy" src="/Files/class/facility/${facilityPic[j].Facility_Pic}"
          alt="${facility[i].Class_Facility}${facilityPic[j].Facility_Pic}" class="detail_content2_part_content1_img" id="img1">
      </a>`;
      }
    }
    footer = `
          </div>
          <div class="detail_content2_part_content1_detail">
            ${facility[i].Facility_Description}
          </div>
        </figure>
      </div>
    `;
    classFacilityContent += top + center + footer;
  }
  $("#class-facility-container").append(classFacilityContent);
  $("#class-facility-container-mobile").append(classFacilityContent);

  $("#classroom-title").append(`
    <img loading="lazy" src="/Files/class/title/${Title}" alt="title_class01">
  `);

  $("#bread-title").append(`
    <h6 class="text2">${ClassName}</h6>
  `);

  await setBgImage(infoImages);

  $("#class-intro").append(`
    <span class="detail_content_main_part3_content">${Class_Introduction}</span>
  `);

  $("#class-intro-mobile").append(`
    <span class="detail_content_main_part3_content">${Class_Introduction}</span>
  `);

  $("#class-pic").append(`
    <img loading="lazy" src="/Files/Class/about/${imagePic.Class_Pic}">
  `);

  openTimes.forEach((time) => {
    const { Class_OpenDay, Class_OpenTime, Class_Memo } = time;
    $("#class-times").append(`
      <div class="detail_content_main_part31">
        <span class="detail_content_main_part3_content">${Class_OpenDay} ${Class_OpenTime} <br/> ${Class_Memo}</span>
      </div>
    `);
  });

  $("#class-contact").append(`
    <div class="detail_content_main_part331_sub1">
      <span class="detail_content_main_part3_content">洽詢單位：</span>
    </div>
    <div class="detail_content_main_part331_sub1" >
      <span class="detail_content_main_part3_content">${Contact}</span>
    </div>
  `);

  $("#class-address").append(`
    <div class="detail_content_main_part331_sub1">
      <span class="detail_content_main_part3_content">園區地址：</span>
    </div>
    <div class="detail_content_main_part331_sub1">
      <span class="detail_content_main_part3_content">${Address}</span>
    </div>
  `);

  $("#class-phone").append(`
    <div class="detail_content_main_part331_sub1">
      <span class="detail_content_main_part3_content">連絡電話：</span>
    </div>
    <div class="detail_content_main_part331_sub1">
      <span class="detail_content_main_part3_content">${Tel}</span>
    </div>
  `);

  $("#class-email").append(`
    <div class="detail_content_main_part331_sub1">
      <span class="detail_content_main_part3_content">Email：</span>
    </div>
    <div class="detail_content_main_part331_sub1">
      <span class="detail_content_main_part3_content">${EMail}</span>
    </div>
  `);

  // /Files/class/album/class_15/class15_001/class15_001_001.jpg
  let albumImages = "";
  for (var i = 1; i <= 12; i++) {
    const imageId = i >= 10 ? "0" + i : "00" + i;

    albumImages += `
      <li>
        <a href="#"
          onfocus="$('#photo0').fadeTo('fast', 0.5)" onblur="$('#photo0').fadeTo('fast', 1.0)"
          class="fancybox" data-fancybox="gallery" data-transition-effect="circular"
          data-loop="true">
          <img loading="lazy" class="photofade"
          src="/Files/class/album/${id}/${id.split("_").join("")}_001/${id
      .split("_")
      .join("")}_001_${imageId}.jpg">
        </a>
      </li>
    `;
  }

  $("#album-image").append(albumImages);
  $("#album-image-desktop").append(albumImages);

  const swiperpc = new Swiper(".sample-slider.pc", {
    loop: true,
    autoplay: {
      delay: 2000,
    },
    speed: 11500, // Slower transition between images
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination.pc",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  swiperpc.el.addEventListener("mouseover", function () {
    swiperpc.autoplay.stop();
  });

  swiperpc.el.addEventListener("mouseleave", function () {
    swiperpc.autoplay.start();
  });

  const swipermobile = new Swiper(".sample-slider.mobile", {
    loop: true,
    autoplay: {
      delay: 2000,
    },
    speed: 11500, // Slower transition between images
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination.mobile",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  swipermobile.el.addEventListener("mouseover", function () {
    swipermobile.autoplay.stop();
  });

  swipermobile.el.addEventListener("mouseleave", function () {
    swipermobile.autoplay.start();
  });

  const informationinformationtabs = $(".informationtab");
  const greenLine = $(".informationgreen-line");

  function adjustGreenLine() {
    const activeinformationtab = $(".informationtab.active");
    greenLine.css({
      width: activeinformationtab.outerWidth(),
      left: activeinformationtab.position().left,
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
        targetInfo
          .css("display", "flex")
          .css("left", infoDirection)
          .show()
          .animate({ left: "0" }, 100, function () {
            targetInfo.addClass("active-info");
          });
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

const mapmobile_menu_accordionItemHeaders = document.querySelectorAll(
  ".mapmobile_menu_accordion-item-header"
);

mapmobile_menu_accordionItemHeaders.forEach(
  (mapmobile_menu_accordionItemHeader) => {
    mapmobile_menu_accordionItemHeader.addEventListener("click", (event) => {
      // Uncomment in case you only want to allow for the display of only one collapsed item at a time!

      const currentlyActivemapmobile_menu_accordionItemHeader =
        document.querySelector(
          ".mapmobile_menu_accordion-item-header.activemobilemenu"
        );
      if (
        currentlyActivemapmobile_menu_accordionItemHeader &&
        currentlyActivemapmobile_menu_accordionItemHeader !==
          mapmobile_menu_accordionItemHeader
      ) {
        currentlyActivemapmobile_menu_accordionItemHeader.classList.toggle(
          "activemobilemenu"
        );
        currentlyActivemapmobile_menu_accordionItemHeader.nextElementSibling.style.maxHeight = 0;
      }
      mapmobile_menu_accordionItemHeader.classList.toggle("activemobilemenu");
      const mapmobile_menu_accordionItemBody =
        mapmobile_menu_accordionItemHeader.nextElementSibling;
      if (
        mapmobile_menu_accordionItemHeader.classList.contains(
          "activemobilemenu"
        )
      ) {
        mapmobile_menu_accordionItemBody.style.maxHeight =
          mapmobile_menu_accordionItemBody.scrollHeight + "px";
      } else {
        mapmobile_menu_accordionItemBody.style.maxHeight = 0;
      }
    });
  }
);

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
