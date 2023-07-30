function getFilterText(filterId) {
  if(!filterId) return "";
  const filterIds = filterId.split(",");
  return filterIds.map(id => $(`#resource${id}`).val()).join(",");
}

function setColor(searchText, text) {
  if (!searchText) return text;
  let changeText = text;
  searchText.split(" ").map((st) => {
    const coloredText = `<span class="search-highlight">${st}</span>`;
    changeText = changeText.replace(new RegExp(st, 'g'), coloredText);
  });
  return changeText;
}

async function getSearchResource (queryObj) {
    const {searchText, filterId} = queryObj;
    console.log({searchText,filterId: getFilterText(filterId)});
    var apiUrl = '/swcb-new/server/search_resource.php'
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              queryText: searchText ? searchText : "",
              filterName: getFilterText(filterId)
            })
        })
        if (response.ok) {
            const data = await response.json();
            return data.map(resource => toResource(resource));
        } 
    } catch (error) {
        throw new Error('網路請求失敗: ' + error);
    }
}

async function setResource(queryObj) {
  const { searchText } = queryObj;

  if (!searchText) {
    document.getElementById("search-detail").style.display = 'none';
  } else {
    document.getElementById("search-detail").style.display = 'block';
  }

  const startTime = performance.now();
  const searchResult = await getSearchResource(queryObj);
  const endTime = performance.now();
  const durationInSeconds = (endTime - startTime) / 1000;
  document.getElementById("search-time").innerText = durationInSeconds.toFixed(2)
  document.getElementById("search-result-number").innerText = searchResult.length;
  searchResult.forEach(result => {
      const {image, title, description, type, target, tags} = result;
      
      const tagElement = tags.map((tag) => {
        return `
          <div class="frequest_search1">
            <span>${tag}</span>
          </div>
        `
      }).join(" ");
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
                          <span>${setColor(searchText, title)}</span>
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
                          <h5 class="mainbookinfo_part24_text2"><span class="mainbookinfo_part24_text1">簡介：</span>${setColor(searchText, description)}</h5>
                      </div>
          
                  </div>
          
              </div>

          </div>
          `
      )
  });
}

$(document).ready(function () {
  const queryObj = getQueryString();
  document.getElementById("search-text").innerText = queryObj.searchText ?? ""
  document.getElementById("search-result-input").value = queryObj.searchText ?? ""
  setResource(queryObj).then(() => {
    setColor();
    pagination();

    window.onscroll = function() {stickyFunction()};

    var filterButton = document.getElementById("ad-filter-button");
    var filterNavBlock = document.getElementById("filter-button-block");
    var sticky = filterButton.offsetTop;
  
    function stickyFunction() {
      var width = document.documentElement.clientWidth;
      if(width > 1024) return;
      if (window.pageYOffset >= sticky) {
        filterNavBlock.style.display = "block"
      } else {
        filterNavBlock.style.display = "none"
      }
    }
  })

  //ajax
  var checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', async function() {
      let checkedCheckboxNames = [];
      checkboxes.forEach(function(c) {
        if(c.checked) {
          $("#search-content").empty();
          checkedCheckboxNames.push(c.id.split('resource')[1]);
        }
      });
      await setResource({
        searchText: '',
        filterId: checkedCheckboxNames.join(",")
      });
      pagination();
    });
  });
})