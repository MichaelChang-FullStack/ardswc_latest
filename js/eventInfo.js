async function getEventInfo() {
  var apiUrl = "/server/activities.php";
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function setEventInfo(resources) {
  $("#mainContainer").empty();
  resources.forEach((event) => {
    const { AC_SUBJECT, AC_START_DATE, AC_END_DATE, IM_FILE, LI_URL } = event;
    const startDate = getFormattedDate(AC_START_DATE.date);
    const endDate = getFormattedDate(AC_END_DATE.date);

    $("#mainContainer").append(`

      <div class="main_container_part5_child1_sub2_block1">
          <div class="mainbookinfo">
                ${
                  LI_URL
                    ? `<a href="${LI_URL}" target="_blank" name="打開活動(${AC_SUBJECT})" style="text-decoration: none; color: inherit;">`
                    : ""
                }
              <div class="mainbookinfo_part1">
                  <div class="mainbookinfo_part12">
                      <img id="activityImage" src="/files/Activities/${IM_FILE}" alt="${AC_SUBJECT}" ${
      LI_URL ? "" : 'onclick="showImage(this)"'
    }>
                  </div>
              </div>
              <div class="mainbookinfo_part2">
                  <div class="mainbookinfo_part21">
                      <span>${AC_SUBJECT}</span>
                  </div>
                  <div class="mainbookinfo_part23">
                      <div class="mainbookinfo_part23_1">
                          <img loading="lazy" src="../asset/images/Event_Arena_Event_Information/icon_calendar.svg" alt="icon_calendar">
                      </div>
                      <div class="mainbookinfo_part23_2">
                          <span>${startDate}-${endDate}</span>
                      </div>
                  </div>
              </div>
      ${LI_URL ? `</a>` : ""}
          </div>
      </div>

      
    `);

    $("#activityImage").on("click", function () {
      if ("${LI_URL}" === "") {
        // 當 LI_URL 為空時，顯示圖片預覽的小視窗
        openImagePreview("/files/Activities/${IM_FILE}", "${AC_SUBJECT}");
      }
    });

    // 預覽圖片函數
    function openImagePreview(imageUrl, subject) {
      const previewWindow = window.open("", "圖片預覽", "width=800,height=600");
      previewWindow.document.write(`<title>圖片預覽 - ${subject}</title>`);
      previewWindow.document.write(
        `<img src="${imageUrl}" alt="${subject}" style="width:100%">`
      );
    }
  });
}

$(document).ready(async function () {
  const events = await getEventInfo();
  const currentDate = new Date();
  const uniqueArray = [];
  const seenIds = new Set();
  for (const item of events) {
    if (!seenIds.has(item.AC_NO)) {
      uniqueArray.push(item);
      seenIds.add(item.AC_NO);
    }
  }

  console.log({ uniqueArray });
  setEventInfo(uniqueArray);
  $(`.main_container_part4_child4_part10`).addClass("active");

  $("#all").click(function () {
    setEventInfo(uniqueArray);
    initialData();
    $(`.main_container_part4_child4_part10`).addClass("active");
    $(`.main_container_part4_child4_part11`).removeClass("active");
    $(".main_container_part4_child4_part12").removeClass("active");
    $(".main_container_part4_child4_part13").removeClass("active");
  });

  $("#about-to-start").click(function () {
    setEventInfo(
      uniqueArray.filter((obj) => {
        const startDate = new Date(obj.AC_START_DATE.date);
        return currentDate < startDate;
      })
    );
    initialData();
    $(`.main_container_part4_child4_part11`).addClass("active");
    $(".main_container_part4_child4_part12").removeClass("active");
    $(".main_container_part4_child4_part13").removeClass("active");
    $(`.main_container_part4_child4_part10`).removeClass("active");
  });

  $("#in-progress").click(function () {
    setEventInfo(
      uniqueArray.filter((obj) => {
        const startDate = new Date(obj.AC_START_DATE.date);
        const endDate = new Date(obj.AC_END_DATE.date);
        return startDate <= currentDate && currentDate <= endDate;
      })
    );
    initialData();
    $(`.main_container_part4_child4_part12`).addClass("active");
    $(".main_container_part4_child4_part11").removeClass("active");
    $(".main_container_part4_child4_part13").removeClass("active");
    $(`.main_container_part4_child4_part10`).removeClass("active");
  });

  $("#already-end").click(function () {
    setEventInfo(
      uniqueArray.filter((obj) => {
        const endDate = new Date(obj.AC_END_DATE.date);
        return currentDate > endDate;
      })
    );
    initialData();
    $(`.main_container_part4_child4_part13`).addClass("active");
    $(".main_container_part4_child4_part12").removeClass("active");
    $(".main_container_part4_child4_part11").removeClass("active");
    $(`.main_container_part4_child4_part10`).removeClass("active");
  });

  initialData();
});

$(window).resize(function () {
  initialData();
});

function updateItemsPerPage() {
  const containerWidth = $(window).width();
  if (containerWidth < 1425) {
    itemsPerPage1 = 16; // 2 items per row
  } else if (containerWidth < 1768) {
    itemsPerPage1 = 15; // 3 items per row
  } else if (containerWidth < 2136) {
    itemsPerPage1 = 16; // 4 items per row
  } else {
    itemsPerPage1 = 30; // 5 items per row
  }
  return itemsPerPage1;
}
const itemsPerPage = updateItemsPerPage();

function updatePagination() {
  totalItems = $(".main_container_part5_child1_sub2_block1").length;
  totalPages = Math.ceil(totalItems / itemsPerPage);

  // Create page buttons
  const pageButtonsContainer = $(".pageButtons");
  pageButtonsContainer.empty();
  for (let i = 1; i <= totalPages; i++) {
    pageButtonsContainer.append(
      `<button class="pageButton" data-page="${i}">${i}</button>`
    );
  }

  // Show first page on load
  showPage(1);
}

function showPage(page) {
  // Mark current page button as active
  $(".pageButton").removeClass("active");
  $(`.pageButton[data-page="${page}"]`).addClass("active");

  // Calculate start and end index of items to be shown
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  // Hide all items and show only those on the current page
  $(".main_container_part5_child1_sub2_block1").hide();
  $(
    `.main_container_part5_child1_sub2_block1:nth-child(n + ${
      startIndex + 1
    }):nth-child(-n + ${endIndex + 1})`
  ).show();

  // Enable/disable navigation buttons based on current page
  $(".gotoFirstPage, .gotoBeforePage").prop("disabled", page === 1);
  $(".gotoNextPage, .gotoLastPage").prop("disabled", page === totalPages);

  // Update "five page direct navigate button"
  updateFivePageButtons(page, totalPages);

  // Update the count display
  const countDisplay = $(".countDisplay");
  countDisplay.text(`第 ${page}/${totalPages}頁,共${totalItems}筆`);
}

function updateFivePageButtons(currentPage, totalPages) {
  const pageButtons = $(".pageButton");
  const maxVisibleButtons = 5;

  // Calculate the first and last page numbers for the five-page navigation
  let firstPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let lastPage = Math.min(totalPages, firstPage + maxVisibleButtons - 1);

  // Make sure there are exactly maxVisibleButtons buttons visible
  if (lastPage - firstPage + 1 < maxVisibleButtons) {
    lastPage = Math.min(
      totalPages,
      lastPage + (maxVisibleButtons - (lastPage - firstPage + 1))
    );
    firstPage = Math.max(1, lastPage - maxVisibleButtons + 1);
  }

  // Show/hide buttons based on the calculated range
  pageButtons.hide();
  $(
    `.pageButton:nth-child(n + ${firstPage}):nth-child(-n + ${lastPage})`
  ).show();

  // Mark current page button as active
  pageButtons.removeClass("active");
  $(`.pageButton[data-page="${currentPage}"]`).addClass("active");
}

function initialData() {
  //Copy from updateItemsPerPage
  updatePagination();

  $(".gotoFirstPage").click(function () {
    showPage(1);
    scrollToTop();
  });

  $(".gotoBeforePage").click(function () {
    const currentPage = $(".pageButton.active").data("page");
    scrollToTop();
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  $(".gotoNextPage").click(function () {
    const currentPage = $(".pageButton.active").data("page");
    scrollToTop();
    if (currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });

  $(".gotoLastPage").click(function () {
    scrollToTop();
    showPage(totalPages);
  });

  $(".pageButton").click(function () {
    scrollToTop();
    const page = $(this).data("page");
    showPage(page);
  });
}

// 打开模态框并显示大图
function showImage(imgElement) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImage");

  modal.style.display = "flex"; // 显示模态框并使用 flex 布局居中
  modalImg.src = imgElement.src; // 设置大图的 src
}

// 关闭模态框
function closeModal() {
  var modal = document.getElementById("imageModal");
  modal.style.display = "none"; // 隐藏模态框
}

// 点击模态框背景关闭模态框
var modal = document.getElementById("imageModal");
modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal(); // 只有点击背景时才关闭模态框
  }
});
