document.addEventListener("DOMContentLoaded", function () {
  showModal();
});

const MNo = localStorage.getItem("MNo");

const userOutdoor = getUserOutdoor(MNo);

document
  .getElementById("pendingReviewBtn")
  .addEventListener("click", function () {
    document.getElementById("pendingReviewTable").classList.add("active");
    document.getElementById("historyTable").classList.remove("active");

    // 更新按钮样式
    document.getElementById("pendingReviewBtn").classList.add("active-btn");
    document.getElementById("historyBtn").classList.remove("active-btn");
  });

document.getElementById("historyBtn").addEventListener("click", function () {
  document.getElementById("historyTable").classList.add("active");
  document.getElementById("pendingReviewTable").classList.remove("active");

  // 更新按钮样式
  document.getElementById("historyBtn").classList.add("active-btn");
  document.getElementById("pendingReviewBtn").classList.remove("active-btn");
});

var allApply = [];
var pendingApply = [];
var historyApply = [];
var pagination = {
  pendingApply: {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  },
  historyApply: {
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
  },
};

function updateTotalItems(type, dataLength) {
  pagination[type].totalItems = dataLength;
  pagination[type].totalPages = Math.ceil(
    dataLength / pagination[type].itemsPerPage
  );
}

async function getUserOutdoor(id) {
  var apiUrl = "/server/userOutdoor.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "GET",
        id,
      }),
    });

    console.log("Response Status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      allApply = data;
      pendingApply = data.filter((item) => item.StatusName === "待審核");
      historyApply = data.filter((item) => item.StatusName !== "待審核");

      renderTable(pendingApply, "pendingReviewData");
      renderTable(historyApply, "historyData");

      // 使用方法
      updateTotalItems("pendingApply", pendingApply.length);
      updateTotalItems("historyApply", historyApply.length);
      initPage();

      return data[0];
    } else {
      console.error("No data returned from server");
      return null;
    }
  } catch (error) {
    console.error("Fetching user detail failed: ", error);
    throw error;
  }
}

function renderTable(data, type) {
  const tbody = document.querySelector(`.${type}`);
  tbody.innerHTML = ""; // 清空現有的表格內容

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
    <span class="status-tag ${
      item.StatusName === "待審核"
        ? "pending"
        : item.StatusName === "已取消"
        ? "canceled"
        : item.StatusName === "審核完成"
        ? "completed"
        : item.StatusName === "未通過"
        ? "rejected"
        : ""
    }">${
      item.StatusName === "待審核"
        ? "待審核"
        : item.StatusName === "已取消"
        ? "已取消"
        : item.StatusName === "審核完成"
        ? "預約成功"
        : item.StatusName === "未通過"
        ? "婉拒申請"
        : ""
    }</span>
  </td>
      <td>${item.Class_Name}</td>
      <td>${formatDate(item.Visit_Time.date)}</td>
      <td>${item.Group_name}</td>
      <td>${item.Number}人</td>
      <td>
        <img src="../../asset/images/User/icon_viewer.svg" alt="查看" onclick="showModal(${
          item.Serial_Id
        })"/>
        <img src="../../asset/images/User/${
          item.StatusName === "待審核" ? "icon_add" : "icon_add_disable"
        }.svg" alt="編輯" onclick="${
      item.StatusName === "待審核" ? `cancelModal(${item.Serial_Id})` : ""
    }"  />
      </td>
      <td>${formatDate(item.Appli_Time.date)}</td>
    `;
    tbody.appendChild(row);
  });
}

// 輔助函數：格式化日期
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function showModal(id) {
  $("#Modal").modal("show");
  var data = allApply.filter((item) => item.Serial_Id == id)[0];
  console.log(data);
  $(".modal_location").text(data.Class_Name);
  $(".modal_group").text(data.Group_name);
  $(".modal_contact").text(data.Name);
  $(".modal_phone").text(data.Phone);
  $(".modal_address").text(data.Address);
  $(".modal_email").text(data.Email);
  $(".modal_date").text(data.Visit_Time.date);
  $(".modal_people").text(data.Number);
  // $(".modal_remarks").text(data.Remark);
  $(".modal_result").html(`
  <div>
  <span class="status-tag ${
    data.StatusName === "待審核"
      ? "pending"
      : data.StatusName === "已取消"
      ? "canceled"
      : data.StatusName === "審核完成"
      ? "completed"
      : data.StatusName === "未通過"
      ? "rejected"
      : ""
  }">${
    data.StatusName === "待審核"
      ? "待審核"
      : data.StatusName === "已取消"
      ? "已取消"
      : data.StatusName === "審核完成"
      ? "預約成功"
      : data.StatusName === "未通過"
      ? "婉拒申請"
      : ""
  }</span>
  </div>
  ${data.Remark}
`);
}

async function cancelApply() {
  var id = $("#cancel_Modal").attr("data-id");
  var apiUrl = "/server/userOutdoor.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "PUT",
        id,
      }),
    });

    console.log("Response Status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      allApply = data;
      pendingApply = data.filter((item) => item.StatusName === "待審核");
      historyApply = data.filter((item) => item.StatusName !== "待審核");

      renderTable(pendingApply, "pendingReviewData");
      renderTable(historyApply, "historyData");

      // 使用方法
      updateTotalItems("pendingApply", pendingApply.length);
      updateTotalItems("historyApply", historyApply.length);
      initPage();

      return data[0];
    } else {
      console.error("No data returned from server");
      return null;
    }
  } catch (error) {
    console.error("Fetching user detail failed: ", error);
    throw error;
  }
}
function cancelModal(id) {
  $("#cancel_Modal").attr("data-id", id);
  $("#cancel_Modal").modal("show");
}

function hideModal() {
  $("#cancel_Modal").modal("hide");
}

// pagination
const itemsPerPage = 10;

function updatePagination(type) {
  const paginationData = pagination[type];

  paginationData.totalItems =
    type === "pendingApply" ? pendingApply.length : historyApply.length;
  paginationData.totalPages = Math.ceil(
    paginationData.totalItems / paginationData.itemsPerPage
  );

  // Create page buttons
  const pageButtonsContainer = $(`.pageButtons-${type}`);
  pageButtonsContainer.empty();
  for (let i = 1; i <= paginationData.totalPages; i++) {
    pageButtonsContainer.append(
      `<button class="pageButton pageButton-${type}" data-page="${i}">${i}</button>`
    );
  }

  // Show first page on load
  showPage(type, 1);
}
function showPage(type, page) {
  const paginationData = pagination[type];
  paginationData.currentPage = page;

  // Mark current page button as active
  $(`.pageButton-${type}`).removeClass("active");
  $(`.pageButton-${type}[data-page="${page}"]`).addClass("active");

  // Calculate start and end index of items to be shown
  const startIndex = (page - 1) * paginationData.itemsPerPage;
  const endIndex = Math.min(
    startIndex + paginationData.itemsPerPage - 1,
    paginationData.totalItems - 1
  );

  // Hide all items and show only those on the current page
  $(`.table-${type} .table-row`).hide();
  $(
    `.table-${type} .table-row:nth-child(n + ${
      startIndex + 1
    }):nth-child(-n + ${endIndex + 1})`
  ).show();

  // Enable/disable navigation buttons based on current page
  $(`.gotoFirstPage-${type}, .gotoBeforePage-${type}`).toggleClass(
    "disabled",
    page === 1
  );
  $(`.gotoNextPage-${type}, .gotoLastPage-${type}`).toggleClass(
    "disabled",
    page === paginationData.totalPages
  );

  // Update "five page direct navigate button"
  updateFivePageButtons(type, page, paginationData.totalPages);

  // Update the count display
  $(`.countDisplay-${type}`).text(
    `第 ${page}/${paginationData.totalPages}頁,共${paginationData.totalItems}筆`
  );
}

function initPage() {
  // 初始化兩個表格的分頁
  updatePagination("pendingApply");
  updatePagination("historyApply");

  // 綁定頁碼按鈕點擊事件
  $(".pagination").on("click", ".pageButton", function () {
    const type = $(this).hasClass("pageButton-pendingApply")
      ? "pendingApply"
      : "historyApply";
    const page = parseInt($(this).attr("data-page"));
    showPage(type, page);
  });

  // 綁定導航按鈕點擊事件
  $(".pagination").on("click", ".gotoFirstPage:not(.disabled)", function () {
    const type = $(this).hasClass("gotoFirstPage-pendingApply")
      ? "pendingApply"
      : "historyApply";
    showPage(type, 1);
  });

  $(".pagination").on("click", ".gotoBeforePage:not(.disabled)", function () {
    const type = $(this).hasClass("gotoBeforePage-pendingApply")
      ? "pendingApply"
      : "historyApply";
    showPage(type, pagination[type].currentPage - 1);
  });

  $(".pagination").on("click", ".gotoNextPage:not(.disabled)", function () {
    const type = $(this).hasClass("gotoNextPage-pendingApply")
      ? "pendingApply"
      : "historyApply";
    showPage(type, pagination[type].currentPage + 1);
  });

  $(".pagination").on("click", ".gotoLastPage:not(.disabled)", function () {
    const type = $(this).hasClass("gotoLastPage-pendingApply")
      ? "pendingApply"
      : "historyApply";
    showPage(type, pagination[type].totalPages);
  });
}

function updateFivePageButtons(type, currentPage, totalPages) {
  const pageButtons = $(`.pageButton-${type}`);
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
    `.pageButton-${type}:nth-child(n + ${firstPage}):nth-child(-n + ${lastPage})`
  ).show();

  // Mark current page button as active
  pageButtons.removeClass("active");
  $(`.pageButton-${type}[data-page="${currentPage}"]`).addClass("active");
}
