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
      EC_Name,
      CS_Name,
      CR_Name
    } = data;
    const type = BC_Name ?? TC_Name ?? FC_Name;
    
    return {
        title: Title,
        description: ShortDescrip,
        image: '../../swcb_110/Files/cover/'+ BookID + '.jpg',
        type,
        target: OB_Name,
        tags: [
          ...toTags(RS_Name),
          ...toTags(TP_Name),
          ...toTags(EC_Name),
          ...toTags(CS_Name),
          ...toTags(CR_Name),
        ]
    }
  }

  function toTags(tags) {
    if (tags === null) return [];
    return tags.split(",");
  }