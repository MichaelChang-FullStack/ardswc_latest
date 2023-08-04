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

function getDetailLink(resourceType, id){
  let link = '/pages/';
  switch (resourceType) {
    case '圖書':
      link = link + 'Advanced_Filter_Books_Introduction.html'
      break;    
    case '教案':
      link = link + 'Advanced_Screening_Teaching_Plan_Introduction.html'
      break
    case '教材':
      link = link + 'Advanced_Filter_Games.html'
      break
    case '影片':
      link = link + 'Advanced_Filter_Video.html'
      break
    default:
      break;
  }
  return link + `?bookId=${id}`
}