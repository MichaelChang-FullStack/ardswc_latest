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
  coolSchoolFamily.forEach(element => {
    const { SeqNo, SchoolName, Session, Attribute, BaseType } = element;
    $('#cool-school-family').append(`
      <tr>
        <td>${SeqNo < 10 ? '0' + SeqNo : SeqNo}</td>
        <td>${SchoolName}</td>
        <td>${Session}</td>
        <td>${Attribute}</td>
        <td>${BaseType}</td>
      </tr>
    `)
  });
}


$(document).ready(async function () {
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