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

$(document).ready(async function () {
  const classroomApplys = await getClassroomApply();
  console.log({classroomApplys});
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
})