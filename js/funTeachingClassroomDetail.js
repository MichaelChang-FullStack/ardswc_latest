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
  var apiUrl = "/server/classTrip.php";
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

async function getClassOpenTime(id) {
  var apiUrl = "/server/classOpenTime.php";
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

async function getClassHoliday(id) {
  var apiUrl = "/server/classHoliday.php";
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

async function getClassAlbum(id) {
  var apiUrl = "/server/classAlbum.php";
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
  let infoImages = await getClassroomInfoImages(id);
  let openTimes = await getClassroomInfoOpen(id);
  let imagePic = await getClassroomInfoPic(id);
  let facilityPic = await getClassFacilityPic(id);
  let facility = await getClassFacility(id);
  let condition = await getClassCondition(id);
  let classTrip = await getClassTrip(id);
  const classOpenTime = await getClassOpenTime(id);
  let classAlbum = await getClassAlbum(id);
  OpenTime = classOpenTime;
  const urlParams = new URLSearchParams(window.location.search);
  let changes = {};
  const saveChanges = localStorage.getItem(`changes-${id}`);
  if (saveChanges) {
    changes = JSON.parse(saveChanges);
    console.log("🚀 ~ loadFromLocalStorage ~ changes:", changes);
  }
  let isPreveiw = urlParams.has("preview") && Object.keys(changes).length !== 0;
  let {
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
    minNumber,
  } = classroomDetail;

  if (isPreveiw) {
    if (changes.changeClassroomName) {
      ClassName = changes.changeClassroomName;
    }
    if (changes.changeClassroomContact) {
      Contact = changes.changeClassroomContact;
    }
    if (changes.changeClassroomAddress) {
      Address = changes.changeClassroomAddress;
    }
    if (changes.changeClassroomTel) {
      Tel = changes.changeClassroomTel;
    }
    if (changes.changeClassroomMail) {
      EMail = changes.changeClassroomMail;
    }
    if (changes.changeClassroomIntroduction) {
      Class_Introduction = changes.changeClassroomIntroduction;
    }
    if (changes.changeClassroomClass_BUS) {
      Class_BUS = changes.changeClassroomClass_BUS;
    }
    if (changes.changeClassroomClass_Drive) {
      Class_Drive = changes.changeClassroomClass_Drive;
    }
    if (changes.changeClassroomClass_Map) {
      Class_Map = changes.changeClassroomClass_Map;
    }
  }

  document
    .querySelectorAll('[data-content="ClassName"]')
    .forEach((el) => (el.textContent = ClassName));
  document.querySelector('[data-content="Class_Drive"]').innerHTML =
    Class_Drive;
  document.querySelector('[data-content="Class_BUS"]').innerHTML = Class_BUS;
  document.querySelector('[data-content="Class_Introduction"]').innerHTML =
    Class_Introduction;
  document.querySelector('[data-content="Contact"]').innerHTML = Contact;
  document.querySelector('[data-content="Address"]').innerHTML = Address;
  document.querySelector('[data-content="Tel"]').innerHTML = Tel;
  document.querySelector('[data-content="EMail"]').innerHTML = EMail;

  document.getElementById("outdoor").value = ClassName;
  document.getElementById("outdoor_classroom").value = ClassName;
  document.getElementById("class_Address").value = Address;
  document.getElementById("classID").value = id;
  document.getElementById("minNumber").value = minNumber;

  var placeholderText = `請輸入阿拉伯數字 ex:10位，請填寫數字“10”`;

  document
    .getElementById("Number")
    .setAttribute("placeholder", placeholderText);

  //Banner
  // document.querySelector('[data-content="360"]').innerHTML = `
  //   <img loading="lazy" src="/Files/class/360/${infoImages[0].Class_360}">
  // `;

  //預覽用 start
  if (isPreveiw) {
    if (changes.added360Image.length > 0) {
      changes.added360Image.forEach((image) => {
        infoImages.push({
          Class_360: image,
          ClassID: id,
        });
      });
    }
    if (changes.change360ImageLink) {
      infoImages.push({
        Class_360: changes.change360ImageLink,
        ClassID: id,
      });
    }
    if (changes.deleted360Image.length > 0) {
      changes.deleted360Image.forEach((SeqNo) => {
        infoImages = infoImages.filter((item) => {
          return item.SeqNo !== parseInt(SeqNo);
        });
      });
    }
  }
  //預覽用 end

  infoImages.forEach((image) => {
    var select = document.querySelector('[data-content="360"]');
    const hasHttps = infoImages.some((image) =>
      image.Class_360.includes("https")
    );

    console.log(image.Class_360);
    if (hasHttps) {
      select.innerHTML = `
      <div>
          <iframe src="${image.Class_360}" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>`;
    } else {
      select.innerHTML = `
        <img loading="lazy" src="/Files/class/360/${image.Class_360}">
      `;
    }
  });

  const bannerContainer = document.querySelector(".banner-container");
  const banner = document.querySelector(".banner");
  const img = banner.querySelector("img");

  if (isPreveiw) {
    if (changes.changeImage) {
      imagePic = {
        Class_Pic: changes.changeImage,
        ClassID: id,
      };
    }
  }

  if (img) {
    // 先判斷 img 是否存在
    img.onload = function () {
      const containerHeight = img.offsetHeight;
      bannerContainer.style.height = `${containerHeight}px`;

      const duration = (img.offsetWidth / bannerContainer.offsetWidth) * 30;
      img.style.animationDuration = `${duration}s`;
    };
  } else {
    console.log("Image not found!");
  }
  //關於圖片
  document.querySelector('[data-content="Class_Pic"]').innerHTML = `
    <img info-img mb-3 mb-md-0 loading="lazy" src="/Files/Class/about/${imagePic.Class_Pic}">
    `;

  if (isPreveiw) {
    if (changes.addClassroomInfoOpen.length > 0) {
      changes.addClassroomInfoOpen.forEach(function (change) {
        openTimes.push({
          ClassID: id,
          Class_OpenDay: change.OpenDay,
          Class_OpenTime: change.OpenTime,
          Class_Memo: change.Class_Memo,
        });
      });
    }
    if (changes.changeClassroomInfoOpen.length > 0) {
      openTimes = openTimes.map(function (openTime) {
        const changeOpenTime =
          changes.changeClassroomInfoOpen.filter(
            (change) => change.SeqNo === openTime.SeqNo
          )[0] || undefined;
        if (changeOpenTime) {
          return {
            ClassID: id,
            Class_OpenDay: changeOpenTime.OpenDay,
            Class_OpenTime: changeOpenTime.OpenTime,
            Class_Memo: changeOpenTime.Class_Memo,
            SeqNo: openTime.SeqNo,
          };
        } else {
          return openTime;
        }
      });
    }
    if (changes.deletedClassroomInfoOpen.length > 0) {
      openTimes = openTimes.filter(
        (openTime) =>
          changes.deletedClassroomInfoOpen.filter(
            (item) => item.SeqNo === openTime.SeqNo
          ).length <= 0
      );
    }
  }

  //開放時間
  let openTimesContent = "";

  openTimes.forEach((time) => {
    const { Class_OpenDay, Class_OpenTime, Class_Memo } = time;
    openTimesContent += `
      <div >
      ${Class_OpenDay} ${Class_OpenTime}${Class_Memo ? Class_Memo : ""}
      </div>
    `;
  });
  document.querySelector('[data-content="Class_OpenDay"]').innerHTML =
    openTimesContent;

  //周邊景點
  let classTripContent = "";

  if (isPreveiw) {
    if (changes.addClassTrip.length > 0) {
      changes.addClassTrip.forEach((change) => {
        classTrip.push(change);
      });
    }
    if (changes.changeClassTrip.length > 0) {
      classTrip = classTrip.map((trip) => {
        const changeTrip =
          changes.changeClassTrip.filter(
            (change) => change.SeqNo === trip.SeqNo
          )[0] || undefined;
        if (changeTrip) {
          return {
            Class_Day: changeTrip.Class_Day,
            Class_Trip: changeTrip.Class_Trip,
            SeqNo: trip.SeqNo,
          };
        } else {
          return trip;
        }
      });
    }
    if (changes.deletedClassTrip.length > 0) {
      classTrip = classTrip.filter(
        (trip) =>
          changes.deletedClassTrip.filter((item) => item.SeqNo === trip.SeqNo)
            .length <= 0
      );
    }
  }

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
  document.querySelector('[data-content="classTrip"]').innerHTML =
    classTripContent;

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

  if (isPreveiw) {
    if (changes.changeClass_Condition) {
      condition[0].Class_Condition1 = changes.changeClass_Condition;
      condition[0].Class_Condition2 = "";
    }
    if (changes.changeClass_Condition_movie) {
      condition[0].Class_MovieLink = changes.changeClass_Condition_movie;
    }
  }

  // 環境及生態解說
  if (condition.length > 0) {
    document.querySelector('[data-content="Class_Condition1"]').innerHTML +=
      condition[0].Class_Condition1;
    document.querySelector('[data-content="Class_Condition1"]').innerHTML +=
      condition[0].Class_Condition2;

    document.querySelector('[data-content="Class_Video"]').innerHTML +=
      condition[0].Class_MovieLink.startsWith("https://")
        ? `<iframe width="100%" height="718" src="${condition[0].Class_MovieLink}"
    title="YouTube video player" frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        : `
          <video class='youtube' controls poster='/Files/class/videos/poster.png'>
            <source src="/Files/class/videos/${condition[0].Class_MovieLink}" type='video/mp4'>
            您的瀏覽器不支援觀賞此影像!
          </video>
        `;
  }

  //生態設施
  let classFacilityContent = "";

  if (isPreveiw) {
    if (changes.addClass_Facility.length > 0) {
      changes.addClass_Facility.forEach((change) => {
        facility.push({
          ClassID: id,
          Class_Facility: change.Class_Facility,
          Facility_Description: change.Facility_Description,
        });
      });
    }
    if (changes.addClass_Facility_Pic.length > 0) {
      changes.addClass_Facility_Pic.forEach((change) => {
        facilityPic.push({
          ClassID: id,
          Class_Facility: change.Class_Facility,
          Facility_Pic: change.fileName,
        });
      });
    }

    if (changes.changeClass_Facility.length > 0) {
      facility = facility.map((originItem) => {
        if (
          changes.changeClass_Facility.filter(
            (changeItem) =>
              changeItem.oldClass_Facility === originItem.Class_Facility
          ).length > 0
        ) {
          return {
            ClassID: id,
            Class_Facility: changes.changeClass_Facility.filter(
              (changeItem) =>
                changeItem.oldClass_Facility === originItem.Class_Facility
            )[0].Class_Facility,
            Facility_Description: changes.changeClass_Facility.filter(
              (changeItem) =>
                changeItem.oldClass_Facility === originItem.Class_Facility
            )[0].Facility_Description,
          };
        }
        return originItem;
      });

      facilityPic = facilityPic.map((originPicItem) => {
        if (
          changes.changeClass_Facility.filter(
            (changeItem) =>
              changeItem.oldClass_Facility === originPicItem.Class_Facility
          ).length > 0
        ) {
          return {
            ...originPicItem,
            Class_Facility: changes.changeClass_Facility.filter(
              (changeItem) =>
                changeItem.oldClass_Facility === originPicItem.Class_Facility
            )[0].Class_Facility,
          };
        } else {
          return originPicItem;
        }
      });
    }

    if (changes.deletedClass_Facility_Pic.length > 0) {
      facilityPic = facilityPic.filter((pic) => {
        return (
          changes.deletedClass_Facility_Pic.filter((SeqNo) => {
            return parseInt(SeqNo) === pic.SeqNo;
          }).length <= 0
        );
      });
    }

    if (changes.deletedClass_Facility.length > 0) {
      facility = facility.filter((originItem) => {
        return (
          changes.deletedClass_Facility.filter(
            (deletedItem) =>
              parseInt(deletedItem.Facility_SeqNo) === originItem.SeqNo
          ).length <= 0
        );
      });
    }
  }

  for (let i = 0; i < facility.length; i++) {
    const top = `
          <div class="col-12 col-md-4 mb-4">
            <div class="card h-100">
              <div id="carousel${i}" class="carousel slide" data-ride="carousel" data-interval="false">
                <ol class="carousel-indicators">`;

    let indicators = "";
    let center = "";
    let activeSet = false;
    let picCount = 0;

    for (let j = 0; j < facilityPic.length; j++) {
      if (facilityPic[j].Class_Facility === facility[i].Class_Facility) {
        indicators += `
                    <li data-target="#carousel${i}" data-slide-to="${picCount}" class="${
          picCount === 0 ? "active" : ""
        }"></li>`;

        center += `
                  <div class="carousel-item ${!activeSet ? "active" : ""}">
                    <img class="d-block w-100" src="/Files/class/facility/${
                      facilityPic[j].Facility_Pic
                    }"
                    alt="${facility[i].Class_Facility} ${
          facilityPic[j].Facility_Pic
        }">
                  </div>`;

        activeSet = true; // Set the first item as active, no need to change afterward
        picCount++;
      }
    }

    const footer = `
                </ol>
                <div class="carousel-inner">
                  ${center}
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

    classFacilityContent += top + indicators + footer;
  }

  document.querySelector('[data-content="class-facility"]').innerHTML =
    classFacilityContent;

  //園區相簿
  let albumImages = "";

  if (isPreveiw) {
    if (changes.addClassAlbum.length > 0) {
      changes.addClassAlbum.forEach((change) => {
        classAlbum.push({
          ClassID: id,
          Class_Pic: change.Class_Pic,
        });
      });
    }
    if (changes.deleteClassAlbum.length > 0) {
      classAlbum = classAlbum.filter(
        (originItem) =>
          changes.deleteClassAlbum.filter(
            (change) => change.SeqNo === originItem.SeqNo
          ).length <= 0
      );
    }
  }
  console.log("🚀 ~ classAlbum:", classAlbum);

  for (var i = 0; i < classAlbum.length; i++) {
    const fullImageUrl = `/Files/class/album/${id}/${id.replace("_", "")}_001/${
      classAlbum[i].Class_Pic
    }`;

    albumImages += `
          <div class="col-6 col-sm-6 col-md-3 mb-3">
              <a href="#" data-toggle="modal" data-target="#imageModal" data-full="${fullImageUrl}">
                  <img loading="lazy" class="img-thumbnail" src="${fullImageUrl}" alt="Thumbnail">
              </a>
          </div>
      `;
  }

  document.querySelector('[data-content="albumImages"]').innerHTML =
    albumImages;

  // Handle modal image update
  $("#imageModal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget); // Button that triggered the modal
    const fullImageUrl = button.data("full"); // Extract info from data-* attributes
    const modalImg = document.getElementById("modalImg");
    modalImg.src = fullImageUrl;
  });

  // const swiperpc = new Swiper(".sample-slider.pc", {
  //   loop: true,
  //   autoplay: {
  //     delay: 2000,
  //   },
  //   speed: 11500, // Slower transition between images
  //   slidesPerView: 1,
  //   pagination: {
  //     el: ".swiper-pagination.pc",
  //     clickable: true,
  //     renderBullet: function (index, className) {
  //       return '<span class="' + className + '">' + (index + 1) + "</span>";
  //     },
  //   },
  // });

  // swiperpc.el.addEventListener("mouseover", function () {
  //   swiperpc.autoplay.stop();
  // });

  // swiperpc.el.addEventListener("mouseleave", function () {
  //   swiperpc.autoplay.start();
  // });

  // const swipermobile = new Swiper(".sample-slider.mobile", {
  //   loop: true,
  //   autoplay: {
  //     delay: 2000,
  //   },
  //   speed: 11500, // Slower transition between images
  //   slidesPerView: 1,
  //   pagination: {
  //     el: ".swiper-pagination.mobile",
  //     clickable: true,
  //     renderBullet: function (index, className) {
  //       return '<span class="' + className + '">' + (index + 1) + "</span>";
  //     },
  //   },
  // });

  // swipermobile.el.addEventListener("mouseover", function () {
  //   swipermobile.autoplay.stop();
  // });

  // swipermobile.el.addEventListener("mouseleave", function () {
  //   swipermobile.autoplay.start();
  // });

  // const informationinformationtabs = $(".informationtab");
  // const greenLine = $(".informationgreen-line");

  // function adjustGreenLine() {
  //   const activeinformationtab = $(".informationtab.active");
  //   greenLine.css({
  //     width: activeinformationtab.outerWidth(),
  //     left: activeinformationtab.position().left,
  //   });
  // }

  // Set the first tab and its content as active by default
  // $(".informationtab:first-child").addClass("active");
  // $(".information_detail_content1-info").addClass("active-info");

  // Call the adjustGreenLine function on page load to set the initial position of the green line
  // adjustGreenLine();

  // informationinformationtabs.on("click", function () {
  //   const target = $(this).data("target");
  //   const activeinformationtab = $(".informationtab.active");
  //   const targetinformationtab = $(this);
  //   let direction;

  //   if (!targetinformationtab.hasClass("active")) {
  //     const activeIndex = activeinformationtab.index();
  //     const targetIndex = targetinformationtab.index();

  //     if (targetIndex > activeIndex) {
  //       direction = "right";
  //     } else {
  //       direction = "left";
  //     }

  //     const infoDirection = direction === "right" ? "-100%" : "100%";

  //     activeinformationtab.removeClass("active");
  //     targetinformationtab.addClass("active");

  //     const activeInfo = $(".active-info");
  //     const targetInfo = $("." + target);

  //     activeInfo.animate({ left: infoDirection }, 100, function () {
  //       activeInfo.removeClass("active-info").hide();
  //       targetInfo
  //         .css("display", "flex")
  //         .css("left", infoDirection)
  //         .show()
  //         .animate({ left: "0" }, 100, function () {
  //           targetInfo.addClass("active-info");
  //         });
  //     });

  //     adjustGreenLine();
  //   }
  // });

  // $(window).resize(function () {
  //   adjustGreenLine();
  // });

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

  const loginPath = "/pages/Fun_Outdoor_Teaching_Classroom_Map.html";

  const loginUrl = new URL(loginPath, currentOrigin);

  window.location.href = loginUrl.href;
}

// Initial call
// updateMenuDisplay();

// Listen for window resize events
// window.addEventListener("resize", updateMenuDisplay);
