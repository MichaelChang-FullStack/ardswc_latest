function getFormattedDate(date) {
  const originDate = new Date(date);
  const year = originDate.getFullYear();
  const month = originDate.getMonth() + 1;
  const day = originDate.getDate();
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay = day < 10 ? "0" + day : day;
  return `${year}/${formattedMonth}/${formattedDay}`;
}

function getQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryObj = {};
    urlParams.forEach((value, key) => {
        queryObj[key] = value
    });
    return queryObj;
}

function getImageFileName(data) {
  const {BT_Name, IM_FILE, CoverFileName} = data;
  switch (BT_Name) {
    case '圖書':
      return CoverFileName;
    case '教案':
    case '教材':    
    case '影片':
      return IM_FILE;
    default:
      return ''
  }

}

function toResource(data) {
    const { 
      Title, 
      ShortDescrip, 
      BC_Name, 
      TC_Name, 
      FC_Name, 
      OB_Name, 
      RS_Name,
      TP_Name,
    } = data;
    const type = BC_Name ?? TC_Name ?? FC_Name;
    
    return {
        title: Title,
        description: ShortDescrip,
        imageFileName: getImageFileName(data),
        type,
        target: OB_Name,
        tags: [
          ...toTags(RS_Name),
          ...toTags(TP_Name),
        ],
        ...data
    }
  }

  function toTags(tags) {
    if (tags === null) return [];
    return tags.split(",");
  }

  function getImagePath(fileName, type) {
    switch (type) {
      case '圖書':
        //Files/cover/R_210_${fileName}
        return `/Files/cover/${fileName}`;
      case '教案':
      case '教材':
      case '影片':
        return `/Files/Gallery/${fileName}`
      default:
        return ''
    }
  }

function getDetailLink(result){
  console.log({result})
  const {BT_Name, BookID, TC_Name} = result;
  let link = '/pages/';
  switch (BT_Name) {
    case '圖書':
      link = link + 'Advanced_Filter_Books_Introduction.html'
      break;    
    case '教案':
      link = link + 'Advanced_Screening_Teaching_Plan_Introduction.html'
      break
    case '教材':
      if(TC_Name === '教學圖卡' || TC_Name === '教具設計' || TC_Name === '實體教具' || TC_Name === '懶人包') {
        link = link + 'Advanced_Screening_Teaching_Plan_Introduction.html'
      } else {
        link = link + 'Advanced_Filter_Games.html'
      }
      break
    case '影片':
      link = link + 'Advanced_Filter_Video.html'
      break
    default:
      break;
  }
  return link + `?bookId=${BookID}`
}

function downloadResource(resourceType, id, fileName) {
  switch (resourceType) {
    case '圖書':
      fetch(`/Files/Books/${id}/web/resources/_pdfs_/${id}__.pdf`)
        .then(resp => resp.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${fileName}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(e => {
          alert("此書本無法下載")
          console.error(e)
        });
      break;
    default:
      break;
  }
}

function getUniqueArray(array) {
  return Array.from(new Set(array));
}

async function getResourceDetail(id) {
  var apiUrl = '/server/resourceDetail.php';
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        })
    })
    if (response.ok) {
        const data = await response.json();
        console.log({data})
        return toResource(data[0]);
    } 
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async function getGalleryDetail(id) {
  var apiUrl = '/server/galleryDetail.php';
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        })
    })
    if (response.ok) {
        const data = await response.json();
        console.log({gallery: data})
        return data[0];
    } 
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async function getLinks(id) {
  var apiUrl = '/server/links.php';
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        })
    })
    if (response.ok) {
        const data = await response.json();
        console.log({links: data})
        return data;
    } 
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async function getSameResource(type, bookId) {
  let apiUrl = '/server/sameResource.php';
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        typeName: type,
        bookId
      })
    })
    if(response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function getFiles(id) {
  var apiUrl = '/server/files.php';
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        })
    })
    if (response.ok) {
        const data = await response.json();
        console.log({files: data})
        return data;
    } 
  } catch (error) {
      console.error(error);
      throw error;
  }
}


async function getImages(id) {
  var apiUrl = '/server/image.php';
  try {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
        })
    })
    if (response.ok) {
        const data = await response.json();
        console.log({files: data})
        return data;
    } 
  } catch (error) {
      console.error(error);
      throw error;
  }
}