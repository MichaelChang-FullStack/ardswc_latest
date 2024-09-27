async function getClassroom() {
  var apiUrl = "/server/outdoorClassroomList.php";
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

function setClassroom(classroom) {
  $("#outdoor-classroom-list").empty();

  classroom.forEach((element, index) => {
    const {
      ClassID,
      ClassName,
      Title,
      BG,
      Class_Introduction,
      Class_Drive,
      Class_BUS,
      Class_Map,
      Class_MapPic,
      Class_Album1,
      MapX,
      MapY,
      Contact,
      Address,
      Tel,
      EMail,
      minNumber,
      ApplyURL,
      isdel,
    } = element;

    var url = `${window.location.origin}/pages/Fun_Outdoor_Teaching_Classroom_Map_Detail.html?id=${ClassID}`;

    $("#outdoor-classroom-list").append(`
        <tr>
  <td data-label="序號" style="font-family: 'Noto Sans TC', sans-serif;">${
    index + 1 < 10 ? `0${index + 1}` : index + 1
  }</td>
  <td data-label="教室名稱" style="font-family: 'Noto Sans TC', sans-serif;">
    <a href="${url}" name="去${ClassName}頁面" style="font-family: 'Noto Sans TC', sans-serif;">
      ${ClassName}
    </a>
  </td>
  <td data-label="單位" style="font-family: 'Noto Sans TC', sans-serif;">${Contact}</td>
  <td data-label="地址" style="font-family: 'Noto Sans TC', sans-serif;">${Address}</td>
  <td data-label="電話" style="font-family: 'Noto Sans TC', sans-serif;">${Tel}</td>
  <td data-label="信箱" style="font-family: 'Noto Sans TC', sans-serif;">${EMail}</td>
  <td data-label="申請預約" style="font-family: 'Noto Sans TC', sans-serif;">
    <button class="apply-btn" onclick="showModal('${ClassID}')" style="font-family: 'Noto Sans TC', sans-serif;">
      <img
        src="../asset/images/Fun_Outdoor_Teaching_Classroom_Map_Detail/icon_outdoor.svg"
        alt=""
      />
      申請預約
    </button>
  </td>
</tr>


      `);
  });
}

async function expandContainer() {
  const inputElement = document.querySelector("#class_input_search");
  const inputValue = inputElement.value;

  const classroomApplys = await getClassroom();

  if (inputValue === "") {
    setClassroom(classroomApplys);
    return;
  }

  const filteredData = classroomApplys.filter((item) => {
    for (const key in item) {
      const valueAsString = String(item[key]);
      if (valueAsString.includes(inputValue)) {
        return true;
      }
    }
    return false;
  });
  setClassroom(filteredData);
}

var classrooms = {};

$(document).ready(async function () {
  const inputElement = document.getElementById("class_input_search");
  inputElement.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      expandContainer();
    }
  });
  const classroom = await getClassroom();

  classrooms = classroom;

  console.log({ classrooms });

  setClassroom(classroom);

  document.querySelectorAll("select").forEach(function (selectElement) {
    selectElement.addEventListener("change", () => {
      let selectedArea = document.querySelector(".drop_down_1 select").value;

      const filterDatas = classroom.filter((item) => {
        console.log(item.Area);
        console.log(selectedArea);
        return (
          selectedArea === "selectCity" ||
          selectedArea === "all" ||
          item.Area == selectedArea
        );
      });
      console.log({ filterDatas });
      setClassroom(filterDatas);
    });
  });
});
