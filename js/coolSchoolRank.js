async function getCoolSchoolRank() {
  var apiUrl = '/server/coolSchoolRank.php';
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

function setCoolSchoolRank(coolSchoolRank) {
  $('#cool-school-rank').empty();
  coolSchoolRank.sort((a, b) => b.Score - a.Score);
  let currentRank = 1;
  let currentScore = coolSchoolRank[0].Score;
  coolSchoolRank.forEach((item, index) => {
    if (item.Score !== currentScore) {
      currentRank = index + 1;
      currentScore = item.Score;
    }

    item.rank = currentRank;
  });
  
  coolSchoolRank.forEach(element => {
    const { SeqNo, SchoolName, Session, Attribute, Score, rank } = element;
    $('#cool-school-rank').append(`
        <tr>
          <td>${SeqNo < 10 ? '0' + SeqNo : SeqNo}</td>
          <td>${SchoolName}</td>
          <td>${Session}</td>
          <td>${Attribute}</td>
          <td>${Score}</td>
          <td>${rank}</td>
        </tr>
      `)
  });
}

function generateCSV(data) {
  let headers = "序號,學校名稱,屆別,學校屬性,積分";
  let rows = data.map(item => {
    return [
      item.SeqNo,
      item.SchoolName,
      item.Session,
      item.Attribute,
      item.Score
    ].join(',');
  });
  let csvContent = headers + '\n' + rows.join('\n');
  return csvContent;
}


function downloadCSV(csvContent, fileName) {
  let blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'});
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

$(document).ready(async function () {
  const coolSchoolRank = await getCoolSchoolRank();
  setCoolSchoolRank(coolSchoolRank);


  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`

  document.getElementById('download-button').addEventListener('click', function() {
    let csvContent = generateCSV(coolSchoolRank);
    downloadCSV(csvContent, `酷學校積分表-${timestamp}.csv`);
  });
})