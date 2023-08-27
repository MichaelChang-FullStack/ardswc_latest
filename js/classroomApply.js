async function getClassroomApply() {
  var apiUrl = '/server/classroomApply.php';
  try {
    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function expandContainer() {
  const inputElement = document.querySelector("#class_input_search");
  const inputValue = inputElement.value;
  if(inputValue === '') {
    alert("請輸入文字");
    return;
  }
  const classroomApplys = await getClassroomApply();
  const filteredData = classroomApplys.filter(item => {
    for (const key in item) {
      const valueAsString = String(item[key]);
      if (valueAsString.includes(inputValue)) {
        return true;
      }
    }
    return false;
  });
  setClassroomApply(filteredData)
}

function setClassroomApply(classroomApplys) {
  $("#classroom-apply").empty();
  classroomApplys.forEach(apply => {
    const {ApplyNo, ClassID, Contact, Result, VisitDate, Attendance} = apply;
    let btnColor = 'red';
    switch (Result) {
      case '審核通過':
        btnColor = 'green';
        break;
      case '婉拒申請':
        btnColor = 'red';
        break;
      case '審核中':
        btnColor = 'gray'
        break;
      default:
        break;
    }
    $("#classroom-apply").append(
      `
        <tr>
          <td>${ApplyNo}</td>
          <td>${ClassID}</td>
          <td>${Contact}</td>
          <td>${VisitDate}</td>
          <td class="centered-cell">
            <div class="download_btn ${btnColor}">
              <div class="download_btn_text">
                <h5>${Result}</h5>
              </div>
            </div>
          </td>
          <td>${Attendance}</td>
        </tr>
      `
    )
  });
}

$(document).ready(async function () {
  const inputElement = document.getElementById("class_input_search");
  inputElement.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      expandContainer();
    }
  });
  const classroomApplys = await getClassroomApply();
  setClassroomApply(classroomApplys)

  $('#in-progress-apply').click(function () {
    const inProgressApplys = classroomApplys.filter(apply => apply.Result === '審核中');
    setClassroomApply(inProgressApplys);
    $(`.main_container_part4_child4_part11`).addClass('active');
    $('.main_container_part4_child4_part12').removeClass('active');
    $('.main_container_part4_child4_part13').removeClass('active');
  });

  $('#pass-apply').click(function () {
    const passApplys = classroomApplys.filter(apply => apply.Result === '審核通過');
    setClassroomApply(passApplys);
    $(`.main_container_part4_child4_part12`).addClass('active');
    $('.main_container_part4_child4_part11').removeClass('active');
    $('.main_container_part4_child4_part13').removeClass('active');
  });
  
  $('#reject-apply').click(function () {
    const rejectApplys = classroomApplys.filter(apply => apply.Result === '婉拒申請');
    setClassroomApply(rejectApplys);
    $(`.main_container_part4_child4_part13`).addClass('active');
    $('.main_container_part4_child4_part12').removeClass('active');
    $('.main_container_part4_child4_part11').removeClass('active');
  });
})