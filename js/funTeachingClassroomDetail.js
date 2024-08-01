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


async function getClassTrip(id) {
  var apiUrl = "/server/classTripPic.php";
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

$(document).ready(async function () {
  const { id } = getQueryString();
  const classroomDetail = await getFunTeachingClassroomDetail(id);
  const infoImages = await getClassroomInfoImages(id);
  const openTimes = await getClassroomInfoOpen(id);
  const imagePic = await getClassroomInfoPic(id);
  const facilityPic = await getClassFacilityPic(id);
  const facility = await getClassFacility(id);
  const condition = await getClassCondition(id);
  const classTrip = await getClassTrip(id);
  const {
    Title,
    BG,
    ClassName,
    Class_Introduction,
    Contact,
    Address,
    Tel,
    EMail,
    Class_Drive,
    Class_Map,
    Class_MapPic,
    Class_BUS,
  } = classroomDetail;

  document.querySelectorAll('[data-content="ClassName"]').forEach(el => el.textContent = ClassName);
  document.querySelector('[data-content="Class_Drive"]').innerHTML = Class_Drive;
  document.querySelector('[data-content="Class_BUS"]').innerHTML = Class_BUS;
  document.querySelector('[data-content="Class_Introduction"]').innerHTML = Class_Introduction;
  document.querySelector('[data-content="Contact"]').innerHTML = Contact;
  document.querySelector('[data-content="Address"]').innerHTML = Address;
  document.querySelector('[data-content="Tel"]').innerHTML = Tel;
  document.querySelector('[data-content="EMail"]').innerHTML = EMail;

  document.getElementById('outdoor').value = ClassName;
  document.getElementById('outdoor-classroom').value = ClassName;
  //Banner
  document.querySelector('[data-content="360"]').innerHTML = `
    <img loading="lazy" src="/Files/class/360/${infoImages[0].Class_360}">
  `;
  //關於圖片
  document.querySelector('[data-content="Class_Pic"]').innerHTML = `
    <img info-img mb-3 mb-md-0 loading="lazy" src="/Files/Class/about/${imagePic.Class_Pic}">
    `;

  //開放時間
  let openTimesContent = "";

  openTimes.forEach((time) => {
    const { Class_OpenDay, Class_OpenTime, Class_Memo } = time;
    openTimesContent += `
      <div >
      ${Class_OpenDay} ${Class_OpenTime}${Class_Memo ? (Class_Memo) : ""}
      </div>
    `;
  });
  document.querySelector('[data-content="Class_OpenDay"]').innerHTML = openTimesContent;

  //周邊景點
  let classTripContent = "";

  classTrip.forEach((trip) => {
    const { Class_Day, Class_Trip } = trip;
    classTripContent += `
       <div class="">
       <div class="font-weight-bold">${Class_Trip}</div>
       <span class="">${Class_Day}</span>
     </div>

     <div class="dashed-underline"></div>
     `;
  });
  document.querySelector('[data-content="classTrip"]').innerHTML = classTripContent;


  // 處理地圖
  const mapElement = document.querySelector('[data-content="Class_Map"]');
  if (mapElement) {
    mapElement.innerHTML = `
        <iframe
        src="${Class_Map}"
        style="border:0;width:100%;height:700px"
        title="GOOGLE地圖"
        sandbox="allow-scripts"
        ></iframe>
    `;
  }

  // 環境及生態解說
  if (condition.length > 0) {
    document.querySelector('[data-content="Class_Condition1"]').innerHTML += condition[0].Class_Condition1;
    document.querySelector('[data-content="Class_Condition1"]').innerHTML += condition[0].Class_Condition2;

    document.querySelector('[data-content="Class_Video"]').innerHTML += `
          <video class='youtube' controls poster='/Files/class/videos/poster.png'>
            <source src="/Files/class/videos/${condition[0].Class_MovieLink}" type='video/mp4'>
            您的瀏覽器不支援觀賞此影像!
          </video>
        `;
  }

  //生態設施
  let classFacilityContent = "";

  for (let i = 0; i < facility.length; i++) {
    const top = `
          <div class="col-12 col-md-4 mb-4">
            <div class="card h-100">
              <div id="carousel${i}" class="carousel slide" data-ride="carousel" data-interval="false">
                <ol class="carousel-indicators">
                  <li data-target="#carousel${i}" data-slide-to="0" class="active"></li>
                  <li data-target="#carousel${i}" data-slide-to="1"></li>
                  <li data-target="#carousel${i}" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">`;

    let center = "";
    for (let j = 0; j < facilityPic.length; j++) {
      if (facilityPic[j].Class_Facility === facility[i].Class_Facility) {
        center += `
                  <div class="carousel-item ${center === "" ? "active" : ""}">
                    <img class="d-block w-100" src="/Files/class/facility/${facilityPic[j].Facility_Pic}" 
                    alt="${facility[i].Class_Facility}${facilityPic[j].Facility_Pic}">
                  </div>`;
      }
    }

    const footer = `
                </div>
                <a class="carousel-control-prev" href="#carousel${i}" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel${i}" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <div class="card-body">
                <h5 class="card-title">${facility[i].Class_Facility}</h5>
                <p class="card-text">${facility[i].Facility_Description}</p>
              </div>
            </div>
          </div>`;

    classFacilityContent += top + center + footer;
  }

  document.querySelector('[data-content="class-facility"]').innerHTML = classFacilityContent;



  //園區相簿
  // /Files/class/album/class_15/class15_001/class15_001_001.jpg

  let albumImages = "";
  for (var i = 1; i <= 12; i++) {
    const imageId = i >= 10 ? "0" + i : "00" + i;

    albumImages += `
        <div class="col-6 col-sm-6 col-md-3">
            <a href="#"
            onfocus="$('#photo0').fadeTo('fast', 0.5)" onblur="$('#photo0').fadeTo('fast', 1.0)"
            class="fancybox" data-fancybox="gallery" data-transition-effect="circular"
            data-loop="true">
            <img loading="lazy" class="photofade"
            src="/Files/class/album/${id}/${id.split("_").join("")}_001/${id
        .split("_")
        .join("")}_001_${imageId}.jpg">
            </a>
        </div>
    `;
  }


  document.querySelector('[data-content="albumImages"]').innerHTML = albumImages;

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


function redirectToMap() {
  const currentOrigin = window.location.origin;

  const loginPath = '/pages/Fun_Outdoor_Teaching_Classroom_Map.html';

  const loginUrl = new URL(loginPath, currentOrigin);

  window.location.href = loginUrl.href;
}


// Initial call
// updateMenuDisplay();

// Listen for window resize events
// window.addEventListener("resize", updateMenuDisplay);
