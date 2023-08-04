function getQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryObj = {};
    urlParams.forEach((value, key) => {
        queryObj[key] = value
    });
    return queryObj;
}

function toResource(data) {
    const { 
      Title, 
      ShortDescrip, 
      BookID, 
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
        imageFileName: BookID,
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
      default:
        return ''
    }
  }