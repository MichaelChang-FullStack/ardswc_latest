async function getCoolSchoolFamily() {
  var apiUrl = '/server/coolSchoolFamily.php';
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

function setCoolSchoolFamily(coolSchoolFamily) {
  $('#cool-school-family').empty();
  coolSchoolFamily.forEach((element, index) => {
    const { SeqNo, SchoolName, Session, Attribute, BaseType, URL } = element;
    $('#cool-school-family').append(`
      <tr>
        <td>${index < 10 && index !== 0 ? `0${index}` : index }</td>
        <td>
          <a href="${URL}" name="去${SchoolName}頁面" style="text-decoration: none; color: #000000;">
          ${SchoolName}
          </a>
        </td>
        <td>${Session}</td>
        <td>${Attribute}</td>
        <td>${BaseType ? BaseType : ""}</td>
      </tr>
    `)
  });
}

async function expandContainer() {
  const inputElement = document.querySelector("#class_input_search");
  const inputValue = inputElement.value;
  if(inputValue === '') {
    alert("請輸入文字");
    return;
  }
  const classroomApplys = await getCoolSchoolFamily();
  const filteredData = classroomApplys.filter(item => {
    for (const key in item) {
      const valueAsString = String(item[key]);
      if (valueAsString.includes(inputValue)) {
        return true;
      }
    }
    return false;
  });
  setCoolSchoolFamily(filteredData)
}


$(document).ready(async function () {
  const inputElement = document.getElementById("class_input_search");
  inputElement.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      expandContainer();
    }
  });
  const coolSchoolFamily = await getCoolSchoolFamily();
  setCoolSchoolFamily(coolSchoolFamily);

  document.querySelectorAll('select').forEach(function (selectElement) {
    selectElement.addEventListener('change', () => {

      let selectedCity = document.querySelector('.drop_down_1 select').value;
      let selectedSession = document.querySelector('.drop_down_2 select').value;
      let selectedAttribute = document.querySelector('.drop_down_3 select').value;
      let selectedBaseType = document.querySelector('.drop_down_4 select').value;
      const filterDatas = coolSchoolFamily.filter(item => {
        return (
          (selectedCity === 'selectCity' || selectedCity === 'all' || item.SchoolName.includes(selectedCity)) &&
          (selectedSession === 'selectSession' || selectedSession === 'all' || item.Session === selectedSession) &&
          (selectedAttribute === 'selectAttribute' || selectedAttribute === 'all' || item.Attribute === selectedAttribute) &&
          (selectedBaseType === 'selectBaseType' || selectedBaseType === 'all' || item.BaseType === selectedBaseType)
        );
      });
      console.log({filterDatas})
      setCoolSchoolFamily(filterDatas);
    });
  });
})
