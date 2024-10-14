$(document).ready(async function () {
  getUserOutdoor(localStorage.getItem("MNo"));

  $("#addnew_form_data").on("submit", function (event) {
    document.getElementById("submit-button").disabled = true;
    event.preventDefault();
    confirmApply();
  });

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

function renderTable(data, type) {
  const tbody = document.querySelector(`.${type}`);
  tbody.innerHTML = ""; // 清空現有的表格內容

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td data-label="審核狀態">
    <span class="status-tag ${getStatusClass(item)}"> ${getStatusText(
      item
    )}</span>
  </td>
      <td data-label="戶外教室">${item.Class_Name}</td>
      <td data-label="參訪時間">${formatDate(item.Visit_Time.date)}</td>
      <td data-label="參訪團體">${item.Group_name}</td>
      <td data-label="參訪人數">${item.Number}人</td>
      <td data-label="查看/編輯">
        <img class="view-button" src="../../asset/images/User/icon_viewer.svg" alt="查看" onclick="showModal(${
          item.Serial_Id
        })"/>
        <img class="edit-button"  src="../../asset/images/User/${
          item.StatusName === "待審核" && item.isEdit != 1
            ? "icon_add"
            : "icon_add_disable"
        }.svg" alt="編輯" onclick="${
      item.StatusName === "待審核" ? `editModal(${item.Serial_Id})` : ""
    }"  />
      </td>
      <td data-label="申請時間" class="date">${shortformatDate(
        item.Appli_Time.date
      )}</td>
    `;
    tbody.appendChild(row);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours()
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

function shortformatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}/${String(date.getDate()).padStart(2, "0")}`;
}

function showModal(id) {
  $("#Modal").modal("show");
  var data = allApply.filter((item) => item.Serial_Id == id)[0];
  $(".modal_location").text(data.Class_Name);
  $(".modal_group").text(data.Group_name);
  $(".modal_contact").text(data.Name);
  $(".modal_phone").text(data.Phone);
  $(".modal_address").text(data.Address);
  $(".modal_email").text(data.Email);
  $(".modal_date").text(formatDate(data.Visit_Time.date));
  $(".modal_people").text(data.Number);

  $(".modal_age").text(data.Age);
  $(".modal_purpose").text(data.Purpose);
  $(".modal_tour").text(data.Tour);
  $(".modal_remarks").text(data.Remark);
  $(".modal_result").html(`
  <div>
  <span class="result status-tag ${getStatusClass(data)}">
  ${getStatusText(data)}</span>
  </div>
  <div class="custom-modal-dialog">${
    data.Moder_Notice ? data.Moder_Notice : ""
  }  </div>
`);

  document.querySelector(".download").style.display = "none";
  if (data.StatusName === "審核完成") {
    document.querySelector(".download").style.display = "block";
  }
}

function getStatusClass(data) {
  if (data.isEdit == 1 && data.StatusName == "待審核") {
    return "processing";
  }

  switch (data.StatusName) {
    case "待審核":
      return "pending";
    case "已取消":
      return "canceled";
    case "審核完成":
      return "completed";
    case "未通過":
      return "rejected";
    default:
      return "";
  }
}

function getStatusText(data) {
  if (data.isEdit == 1 && data.StatusName == "待審核") {
    return "受理中";
  }

  switch (data.StatusName) {
    case "待審核":
      return "待審核";
    case "已取消":
      return "已取消";
    case "審核完成":
      return "預約成功";
    case "未通過":
      return "婉拒申請";
    default:
      return "";
  }
}

async function cancelReserve() {
  var id = $("#cancel_Modal").attr("data-id");
  var data = allApply.find((x) => x.Serial_Id == id);
  var notice = `您好，我們已經收到您的取消【${data.Class_Name}】參訪預約申請，還是期待您下次的預約，祝福您順心。`;

  try {
    const response = await fetch("/server/userOutdoor.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "PUT",
        id,
        notice,
      }),
    });

    console.log("Response Status:", response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    $("#cancel_Modal").modal("hide");

    getUserOutdoor(localStorage.getItem("MNo"));

    addNews("cancel");
    sendEmail(id, "outdoor_classroom_cancel");
  } catch (error) {
    console.error("Fetching user detail failed: ", error);
    throw error;
  }
}

function cancelModal(id) {
  $("#edit_Modal").modal("hide");
  $("#cancel_Modal").modal("show");
}

async function editModal(id) {
  var data = allApply.find((x) => x.Serial_Id == id);

  var today = moment().startOf("day");
  var tomorrow = moment().add(1, "days");
  var sixMonthsLater = moment().add(6, "months");

  const holidays = await getClassHoliday(data.ClassID);
  OpenTime = await getClassOpenTime(data.ClassID);

  const disabledDates = holidays.map((holiday) =>
    moment(holiday.HolidayDate.date)
  );

  $("#datetimepicker1").datetimepicker({
    locale: "zh-tw",
    format: "YYYY-MM-DD HH:mm",
    defaultDate: moment(tomorrow).set({ hour: 8, minute: 0, second: 0 }),
    minDate: moment(tomorrow).set({ hour: 8, minute: 0, second: 0 }),
    maxDate: sixMonthsLater,
    disabledDates: disabledDates,
  });

  $("#edit_Modal").attr("data-id", id);
  $("#cancel_Modal").attr("data-id", id);
  $("#edit_Modal").modal("show");

  $("#outdoor_classroom").val(data.Class_Name);
  $("#outdoor").val(data.Class_Name);
  $("#Group_name").val(data.Group_name);
  $("#Number").val(data.Number);
  $('input[name="age"][value="' + data.Age + '"]').prop("checked", true);
  $('input[name="Purpose"][value="' + data.Purpose + '"]').prop(
    "checked",
    true
  );
  $('input[name="Tour"][value="' + data.Tour + '"]').prop("checked", true);
  $('input[name="gender"][value="' + data.Gender + '"]').prop("checked", true);
  $("#Name").val(data.Name);
  $("#County").val(data.County);
  updateTowns();
  $("#District").val(data.District);
  $("#postCode").val(data.PostalCode);
  $("#Address").val(data.Address);
  $("#Email").val(data.Email);
  $("#Visit_Time").val(data.Visit_Time.date.replace(" ", "T").slice(0, 16));
  $("#Remark").val(data.Remark);
  $("#Email").val(data.Email);
  $("#Phone").val(data.Phone);
  $("#Serial_Id").val(data.Serial_Id);
}

function hideModal() {
  $(".modal").modal("hide");
}

function closeModal() {
  $("#Modal").modal("hide");
}

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

/*Generate Capcha*/
function generateRandomValue() {
  var uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
  var numbers = "0123456789";

  var char1 = uppercaseCharacters.charAt(
    Math.floor(Math.random() * uppercaseCharacters.length)
  );
  var char2 = numbers.charAt(Math.floor(Math.random() * numbers.length));
  var char3 = lowercaseCharacters.charAt(
    Math.floor(Math.random() * lowercaseCharacters.length)
  );
  var char4 = numbers.charAt(Math.floor(Math.random() * numbers.length));

  var captchaValue = [char1, char2, char3, char4];
  var captcha = shuffleArray(captchaValue).join("");

  return captcha;
}

function shuffleArray(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function regenerateCaptcha() {
  var captchaLabel = document.getElementById("captcha-label");
  captchaLabel.innerHTML = generateRandomValue();
}

// Initial captcha generation
regenerateCaptcha();

/*Speech capcha*/

$(document).ready(function () {
  $("#speak").click(function () {
    var text = document.getElementById("captcha-label").innerHTML;
    fetchSpeech(text);
  });

  $("#captcha-regenerate").click(function () {
    stopAudio(function () {
      regenerateCaptcha();
    });
  });
});

var isPlaying = false;

function fetchSpeech(text) {
  var data = {
    input: { text: text },
    voice: { languageCode: "cmn-TW", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "MP3" },
  };

  var characters = text.split("");
  var audio = document.getElementById("audio");

  function playNextCharacter(index) {
    if (index >= characters.length) {
      isPlaying = false;
      return;
    }

    var currentCharacter = characters[index];
    var isUpperCase = currentCharacter === currentCharacter.toUpperCase();

    data.input.text = currentCharacter;
    data.voice.ssmlGender = isUpperCase ? "MALE" : "FEMALE";

    $.ajax({
      type: "POST",
      url: "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyBm7vO5EBLe9rT-4RmEHhb3f5-ExfU13Mc",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      success: function (response) {
        audio.src = "data:audio/mp3;base64," + response.audioContent;
        audio.play();
        isPlaying = true;

        setTimeout(function () {
          playNextCharacter(index + 1);
        }, 1000);
      },
    });
  }

  playNextCharacter(0);
}

function stopAudio(callback) {
  var audio = document.getElementById("audio");
  audio.pause();
  audio.currentTime = 0;

  if (typeof callback === "function") {
    callback();
  }
}

// setInterval(function () {
//   if (!isPlaying) {
//     stopAudio();
//   }
// }, 100);

function validateEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function validatePhoneNumber(contact_number) {
  const pattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]*$/;
  return pattern.test(contact_number);
}

function isAtLeastTwoCharactersLong(text) {
  return text.length >= 2;
}

function validateMinNumber(number) {
  var minNumber = parseInt(document.getElementById("minNumber").value, 10);
  return number >= minNumber;
}

function checkVisitTime(visitTime) {
  var selectedDate = new Date(visitTime);
  var selectedDay = selectedDate.getDay(); // 取得星期幾 (0 表示週日, 1 表示週一, ..., 6 表示週六)
  var selectedHour = selectedDate.getHours();
  var selectedMinutes = selectedDate.getMinutes();

  // 找到對應的班級時間表

  const dayMapping = selectedDay === 0 ? 7 : selectedDay; // 修正 JS 中的星期日為 0 的情況，對應資料中的 Days=7
  const schedule = OpenTime.find((s) => s.Days === dayMapping);

  if (!schedule) {
    return false; // 沒有對應的時間表
  }

  // 將時間轉換為 Date 對象，便於比較
  var startTime = new Date(`1970-01-01T${schedule.StartTime}:00`);
  var endTime = new Date(`1970-01-01T${schedule.EndTime}:00`);

  var formattedHour = selectedHour.toString().padStart(2, "0");
  var formattedMinutes = selectedMinutes.toString().padStart(2, "0");
  var userTime = new Date(`1970-01-01T${formattedHour}:${formattedMinutes}:00`);

  // 檢查選擇的時間是否在開始時間和結束時間之間

  if (userTime >= startTime && userTime <= endTime) {
    return true;
  } else {
    alert(
      `請選擇開放時間 ${schedule.StartTime} 至 ${schedule.EndTime} 內的時間`
    );
    return false;
  }
}

function isVisitDateTenDaysAgo(visitDate) {
  const today = new Date();

  const tenDaysLater = new Date();
  tenDaysLater.setDate(today.getDate() + 10);

  const visitDateObj = new Date(visitDate);

  const hours = visitDateObj.getHours();

  if (visitDateObj <= tenDaysLater || hours >= 14) {
    alert("參訪時間不在建議時間內，因此有可能會不予通過");
  }
}

function confirmApply() {
  const form = document.getElementById("addnew_form_data");

  const formData = new FormData(form);

  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  // 使用方法
  if (checkFields()) {
    // 所有欄位都已填寫，可以提交表單
    console.log("表單可以提交");
    jQuery.ajax({
      url: "/server/outdoorClassroom.php",
      method: "POST",
      data: jQuery("form#addnew_form_data").serialize(),
      dataType: "html",
      success: function (response) {
        console.log(response);
        var data = JSON.parse(response);

        if (data.status === "true") {
          getUserOutdoor(localStorage.getItem("MNo"));
          $("#edit_Modal").modal("hide");

          addNews("update");

          var id = $("#edit_Modal").attr("data-id");

          var visitTime = new Date(document.getElementById("Visit_Time").value);
          var today = new Date();
          var tenDaysLater = new Date();
          tenDaysLater.setDate(today.getDate() + 10);

          // 檢查是否在未來10天內
          if (visitTime >= today && visitTime <= tenDaysLater) {
            console.log("訪問時間在未來 10 天內");
            sendEmail(id, "outdoor_classroom_update_late");
          } else {
            console.log("訪問時間不在未來 10 天內");
            sendEmail(id, "outdoor_classroom_update");
          }

          const add_contact_us_form =
            document.getElementById("addnew_form_data");

          add_contact_us_form.reset();

          document.getElementById("submit-button").disabled = false;

          document.getElementById("outdoor").value =
            document.getElementById("outdoor_classroom").value;
        } else if (data.status === "false" && data.message == "受審中") {
          $("#edit_Modal").modal("hide");
          $("#fail_Modal").modal("show");
          getUserOutdoor(localStorage.getItem("MNo"));
        } else {
          alert("出現一些問題，請稍後再試");
        }
      },
      error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr);
        console.log(ajaxOptions);
        console.log(thrownError);
      },
    });
  } else {
    // 有欄位未填寫，已顯示 alert
    console.log("表單不完整");
    document.getElementById("submit-button").disabled = false;
  }
}

function checkFields() {
  var outdoor_classroom = document.getElementById("outdoor_classroom").value;
  var Visit_Time = document.getElementById("Visit_Time").value;

  var Group_name = document.getElementById("Group_name").value;
  var Number = document.getElementById("Number").value;
  var Phone = document.getElementById("Phone").value;
  var postCode = document.getElementById("postCode").value;
  var Address = document.getElementById("Address").value;
  var Email = document.getElementById("Email").value;
  var Name = document.getElementById("Name").value;
  var County = document.getElementById("County").value;
  var District = document.getElementById("District").value;

  var verification_code = document.getElementById("verification_code").value;
  var captcha_label = document.getElementById("captcha-label").innerHTML;

  var checkboxes_age = document.querySelectorAll('input[name="age"]');
  var checkboxes_Purpose = document.querySelectorAll('input[name="Purpose"]');
  var checkboxes_Tour = document.querySelectorAll('input[name="Tour"]');
  var checkboxes_gender = document.querySelectorAll('input[name="gender"]');
  var checkboxes_privacyPolicy = document.querySelectorAll(
    'input[name="privacyPolicy"]'
  );

  var fields = {
    戶外教室: outdoor_classroom,
    團體名稱: Group_name,
    人數: Number,
    電話: Phone,
    郵遞區號: postCode,
    地址: Address,
    電子郵件: Email,
    姓名: Name,
    縣市: County,
    鄉鎮市區: District,
    驗證碼: verification_code,
    參觀日期: Visit_Time,
  };

  var optionalFields = ["地址", "電話", "郵遞區號", "縣市", "鄉鎮市區"];

  var emptyFields = [];

  for (var fieldName in fields) {
    if (!fields[fieldName] && !optionalFields.includes(fieldName)) {
      emptyFields.push(fieldName);
    }
  }

  // 檢查複選框
  var checkboxGroups = {
    年齡: checkboxes_age,
    參觀目的: checkboxes_Purpose,
    參觀類型: checkboxes_Tour,
    性別: checkboxes_gender,
    隱私權保護政策: checkboxes_privacyPolicy,
  };

  for (var groupName in checkboxGroups) {
    var checked = false;
    checkboxGroups[groupName].forEach(function (checkbox) {
      if (checkbox.checked) {
        checked = true;
      }
    });
    if (!checked) {
      emptyFields.push(groupName);
    }
  }

  if (emptyFields.length > 0) {
    alert("以下欄位未填寫：\n" + emptyFields.join("\n"));
    return false;
  } else if (verification_code !== captcha_label) {
    console.log(verification_code);
    alert("請輸入正確的驗證碼");
    return false;
  } else if (!validateEmail(Email)) {
    console.log(Email);
    alert("請輸入正確的信箱格式");
    return false;
  } else if (!isAtLeastTwoCharactersLong(Group_name)) {
    alert("請輸入至少 2 個字的團體名稱");
    return false;
  } else if (!checkVisitTime(Visit_Time)) {
    return false;
  }

  isVisitDateTenDaysAgo(Visit_Time);

  return true;
}

function downloadPDF() {
  const element = document.querySelector(".download-content");
  html2pdf()
    .from(element)
    .set({
      margin: 1,
      filename: "戶外教室申請單.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    })
    .save();
}

async function addNews(type) {
  var outdoor_classroom = document.getElementById("outdoor_classroom").value;
  var Visit_Time = formatDate(document.getElementById("Visit_Time").value);
  var url = window.location.origin;
  var subject = "";

  if (type == "cancel") {
    subject = `您好，您已取消預約戶外教室【${outdoor_classroom}】【${Visit_Time}】參訪，詳情請查看 戶外教室參訪 > 歷年紀錄。`;
  }
  if (type == "update") {
    var visitTime = new Date(document.getElementById("Visit_Time").value);
    var today = new Date();

    // 計算10天後的日期
    var tenDaysLater = new Date();
    tenDaysLater.setDate(today.getDate() + 10);

    // 檢查是否在未來10天內
    if (visitTime >= today && visitTime <= tenDaysLater) {
      console.log("訪問時間在未來 10 天內");
      subject = `您好，已收到您的戶外教室參訪修改預約申請【${outdoor_classroom}】，由於修改日期或修改日已為活動日前10日，故該申請並不一定能被核准，詳情請查看 戶外教室參訪 > 歷年紀錄。`;
    } else {
      console.log("訪問時間不在未來 10 天內");
      subject = `您好，您已修改預約戶外教室【${outdoor_classroom}】【${Visit_Time}】參訪，詳情請查看 戶外教室參訪 > 歷年紀錄。`;
    }
  }
  const data = {
    action: "create",
    subject: subject,
    SOURCE_NO: `${url}/pages/user.html?page=outdoor-classroom-visits`,
    CATEGORY_NO: 11,
    CATEGORY: "戶外教室參訪",
    MNo: localStorage.getItem("MNo"),
  };

  try {
    const response = await fetch("/server/userNews.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Server response:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

async function sendEmail(id, templateName) {
  const data = {
    templateName: templateName,
    id: id,
    email: [document.getElementById("Email").value],
  };

  try {
    const response = await fetch("/server/sendMail.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Server response:", result);

    $("#Get_Applications_Modal").modal("show");
  } catch (error) {
    console.log(error.message);
    console.error("Error:", error);
    alert("郵件發送失敗");
  }
}
