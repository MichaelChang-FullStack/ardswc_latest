function toTags(tags) {
  if (tags === null) return [];
  return tags.split(",");
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


async function getSearchResource (queryObj) {
    var apiUrl = '/swcb-new/server/search_resource.php'
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryObj)
        })
        if (response.ok) {
            const data = await response.json();
            return data.map(resource => toResource(resource));
        } 
    } catch (error) {
        throw new Error('網路請求失敗: ' + error);
    }
}

async function setResource() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  // 遍历所有参数
  const queryObj = {};
  urlParams.forEach((value, key) => {
    queryObj[key] = value
  });
  document.getElementById("search-text").innerText = queryObj.searchText
  document.getElementById("search-result-input").value = queryObj.searchText
  const startTime = performance.now();
  const searchResult = await getSearchResource(queryObj);
  const endTime = performance.now();
  const durationInSeconds = (endTime - startTime) / 1000;
  document.getElementById("search-time").innerText = durationInSeconds.toFixed(2)
  document.getElementById("search-result-number").innerText = searchResult.length
  console.log(searchResult)
  searchResult.forEach(result => {
      const {image, title, description, type, target, tags} = result
      const tagElement = tags.map((tag) => {
        return `
          <div class="frequest_search1">
            <span>${tag}</span>
          </div>
        `
      }).join(" ");
      console.log({tagElement})
      $("#search-content").append(
          `
            <div class="main_container_part5_child1_sub2_block1">
              <div class="mainbookinfo">
                  <div class="mainbookinfo_part1">
                      <div class="mainbookinfo_part11"><span>${type ?? '教案'}</span></div>
                      <div class="mainbookinfo_part12"><img src="${image}" onError="this.onerror=null; this.src='../asset/images/search-result-default-img.png';" alt="${title}"></div>
                  </div>
                  <div class="mainbookinfo_part2">
                      <div class="mainbookinfo_part21">
                          <span>${title}</span>
                      </div>
                      <div class="mainbookinfo_part22">
                        ${tagElement}
                      </div>
                      <div class="mainbookinfo_part23">
                          <div class="mainbookinfo_part23_1">
                              <img src="../asset/images/Teacher_Edition_Home/icon_user.svg" alt="icon_user">
                          </div>
                          <div class="mainbookinfo_part23_2">
                              <span>${target}</span>
                          </div>
          
                      </div>
                      <div class="mainbookinfo_part24">
                          <h5 class="mainbookinfo_part24_text2"><span class="mainbookinfo_part24_text1">簡介：</span>${description}</h5>
                      </div>
          
                  </div>
          
              </div>

          </div>
          `
      )
  });
}




$(document).ready(function () {
  setResource().then(() => {
    pagination();
  })
})