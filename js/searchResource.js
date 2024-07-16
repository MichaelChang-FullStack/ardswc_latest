function getFilterText(filterId) {
  const types = ["2", "3", "4", "5"];
  if(!filterId) return "";
  let filterIds = filterId.split(",");
  filterIds.forEach(id => {
    if(types.includes(id)) {
      const subSearchItem = document.querySelector(`.sub-searchitem-${id}`);
      const subCheckboxs = subSearchItem.querySelectorAll('input[type="checkbox"]');
      subCheckboxs.forEach(checkbox => {
        if(checkbox.checked) {
          filterIds.push(checkbox.id.split("resource")[1]);
        }
      })
    }
  })
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

function isResourceTypes(id) {
  const types = ['2', '3', '4', '5'];
  let isType = false;
  for(let i = 0; i < types.length; i++) {
    const checkboxes = document.querySelectorAll(`.sub-searchitem-${types[i]} input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
      if(checkbox.value === id) {
        isType = true
      }
    });
  }
  return isType
}

function classifyResource(filterId) {
  let resourceTypeNames = [];
  let topicNames = [];
  let resourceCategoryNames = [];
  let targetNames = [];
  let learnClassNames = [];
  let deviceTypeNames = [];
  if(!filterId) return {
    resourceTypeNames: '',
    topicNames: '',
    resourceCategoryNames: '',
    targetNames: '',
    learnClassNames: '',
    deviceTypeNames: ''
  };
  const ids = filterId.split(",");
  ids.forEach((id) => {
    document.querySelectorAll('#resourceTypeNames input[type="checkbox"]').forEach(checkbox => {
      if (checkbox.id.split("resource")[1] === id) resourceTypeNames.push(id);
    });

    document.querySelectorAll('#topicNames input[type="checkbox"]').forEach(checkbox => {
      if (checkbox.id.split("resource")[1] === id) topicNames.push(id);
    });

    document.querySelectorAll('#resourceCategoryNames input[type="checkbox"]').forEach(checkbox => {
      if (checkbox.id.split("resource")[1] === id) resourceCategoryNames.push(id);
    });

    document.querySelectorAll('#targetNames input[type="checkbox"]').forEach(checkbox => {
      if (checkbox.id.split("resource")[1] === id) targetNames.push(id);
    });

    document.querySelectorAll('#learnClassNames input[type="checkbox"]').forEach(checkbox => {
      if (checkbox.id.split("resource")[1] === id) learnClassNames.push(id);
    });

    document.querySelectorAll('#deviceTypeNames input[type="checkbox"]').forEach(checkbox => {
      if (checkbox.id.split("resource")[1] === id) deviceTypeNames.push(id);
    });
  })
  return {
    resourceTypeNames: getFilterText(getUniqueArray(resourceTypeNames).join(',')),
    topicNames: getFilterText(getUniqueArray(topicNames).join(',')),
    resourceCategoryNames: getFilterText(getUniqueArray(resourceCategoryNames).join(',')),
    targetNames: getFilterText(getUniqueArray(targetNames).join(',')),
    learnClassNames: getFilterText(getUniqueArray(learnClassNames).join(',')),
    deviceTypeNames: getFilterText(getUniqueArray(deviceTypeNames).join(','))
  }
}

// init AbortController
const controller = typeof AbortController !== 'undefined' ? new AbortController() : { signal: null };
const signal = controller.signal;

async function getSearchResource (queryObj, pageNumber) {
    const {searchText, filterId} = queryObj;
    var apiUrl = '/server/searchResource.php'
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              queryText: searchText ? searchText : "",
              ...classifyResource(filterId),
              pageNumber
            }),
            signal: signal
        })
        if (response.ok) {
            const data = await response.json();
            return data.map(resource => toResource(resource)).sort((a, b) => {
              if(a.ONDate === null) return 1;
              if(b.ONDate === null) return -1;
              return new Date(a.ONDate) - new Date(b.ONDate);
          });;
        }
    } catch (error) {
        throw new Error('網路請求失敗: ' + error);
    }
}

async function setResource(searchResult, queryObj) {
  const {searchText} = queryObj;

  searchResult.forEach(async (result) => {
      const {imageFileName, title, description, type, target, tags, BT_Name, BookID} = result;
      const image = getImagePath(imageFileName, BT_Name)
      let link = getDetailLink(result);
      const badge = type ?? '教案'
      const imageElement = badge === '教案' ?
      `
        <div class="resource-teach-book"><h5>${title}</h5></div>
      `
      :
      `
        <div class="mainbookinfo_part12"><img loading="lazy" src="${image}" onError="this.onerror=null; this.src='../asset/images/search-result-default-img.png';" alt="${title}"></div>
      `
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
                    <div class="mainbookinfo_part11"><span>${badge}</span></div>
                    ${imageElement}
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
                              <img loading="lazy" src="../asset/images/Teacher_Edition_Home/icon_user.svg" alt="icon_user" loading="lazy">
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
              <a class="result-link" href="${link}" name="${title}"></a>
          </div>
          `
      )
  });
}

async function pagination(totalItems) {
  // Constants
  const itemsPerPage = 10;

  // Calculate total number of pages
  let totalPages = Math.ceil(totalItems / itemsPerPage);

  function updatePagination() {
    totalPages = Math.ceil(totalItems / itemsPerPage);

    // Create page buttons
    const pageButtonsContainer = $('.pageButtons');
    pageButtonsContainer.empty();
    for (let i = 1; i <= totalPages; i++) {
      pageButtonsContainer.append(`<button class="pageButton" data-page="${i}">${i}</button>`);
    }

    // Show first page on load
    showPage(1);
  }

  // Call updatePagination function initially to set up pagination
  updatePagination();

  // Handle page navigation buttons
  $('.gotoFirstPage').on('click', async function() {
    scrollToTop();
    await checkboxQueryFilter(1)
    showPage(1);
  });

  $('.gotoBeforePage').on('click', async function() {
    const currentPage = $('.pageButton.active').data('page');
    if (currentPage > 1) {
      scrollToTop();
      await checkboxQueryFilter(currentPage - 1)
      showPage(currentPage - 1);
    }
  });

  $('.gotoNextPage').on('click', async function() {
    const currentPage = $('.pageButton.active').data('page');
    if (currentPage < totalPages) {
      scrollToTop();
      await checkboxQueryFilter(currentPage + 1)
      showPage(currentPage + 1);
    }
  });

  $('.gotoLastPage').on('click', async function() {
    scrollToTop();
    await checkboxQueryFilter(totalPages)
    showPage(totalPages);
  });

  // Handle direct page navigation
  $('.pageButton').on('click', async function() {
    scrollToTop();
    const page = $(this).data('page');
    await checkboxQueryFilter(page)
    showPage(page);
  });

  function showPage(page) {
    // Mark current page button as active
    $(".pageButton").removeClass("active");
    $(`.pageButton[data-page="${page}"]`).addClass("active");

    // Calculate start and end index of items to be shown
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

    $(".gotoFirstPage, .gotoBeforePage").prop("disabled", page === 1);
    $(".gotoNextPage, .gotoLastPage").prop("disabled", page === totalPages);

    // Update "five page direct navigate button"
    updateFivePageButtons(page, totalPages);

    // Update the count display
    const countDisplay = $(".countDisplay");
    countDisplay.text(`第 ${page}/${totalPages}頁,共${totalItems}筆`);
  }

  function updateFivePageButtons(currentPage, totalPages) {
    const pageButtons = $('.pageButton');
    let maxVisibleButtons = 5;
    if(document.documentElement.clientWidth <= 750) {
      maxVisibleButtons = 3
    }

    // Calculate the first and last page numbers for the five-page navigation
    let firstPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let lastPage = Math.min(totalPages, firstPage + maxVisibleButtons - 1);

    // Make sure there are exactly maxVisibleButtons buttons visible
    if (lastPage - firstPage + 1 < maxVisibleButtons) {
      lastPage = Math.min(totalPages, lastPage + (maxVisibleButtons - (lastPage - firstPage + 1)));
      firstPage = Math.max(1, lastPage - maxVisibleButtons + 1);
    }

    // Show/hide buttons based on the calculated range
    pageButtons.hide();
    $(`.pageButton:nth-child(n + ${firstPage}):nth-child(-n + ${lastPage})`).show();

    // Mark current page button as active
    pageButtons.removeClass('active');
    $(`.pageButton[data-page="${currentPage}"]`).addClass('active');
  }
};

async function getResourceTotalCount(queryObj) {
  const { searchText, filterId } = queryObj;
  var apiUrl = "/server/resourceTotalCount.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        queryText: searchText ? searchText : "",
        ...classifyResource(filterId),
      }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw new Error("網路請求失敗: " + error);
  }
}

function getQueryFilter() {
  const inputVlue = document.getElementById("search-result-input").value;
  let checkedCheckboxNames = [];

  var reGetCheckboxs = document.querySelectorAll(
    '.main_container_part5_child1 input[type="checkbox"]'
  );
  reGetCheckboxs.forEach(function (c) {
    if (c.checked) {
      checkedCheckboxNames.push(c.id.split("resource")[1]);
    }
  });
  const filterId = getUniqueArray(checkedCheckboxNames).join(",");
  history.replaceState(
    null,
    "",
    `/pages/Search_Result.html?searchText=${inputVlue}&filterId=${filterId}`
  );
  return {
    searchText: inputVlue,
    filterId,
  };
}

async function checkboxQueryFilter(pageNumber) {
  //loading start
  $("#search-content").empty();
  const searchResource = await getSearchResource(getQueryFilter(), pageNumber);
  await setResource(searchResource, getQueryFilter());
  //loading done
}

$(document).ready(async function () {
  const queryObj = getQueryString();
  const {searchText} = queryObj;
  document.getElementById("search-text").innerText = queryObj.searchText ?? "";
  document.getElementById("search-result-input").value = queryObj.searchText ?? "";
  if (!searchText) {
    document.getElementById("search-detail").style.display = 'none';
  } else {
    document.getElementById("search-detail").style.display = 'block';
  }

  const startTime = performance.now();
  const searchResult = await getSearchResource(queryObj, 1);
  const endTime = performance.now();
  const durationInSeconds = (endTime - startTime) / 1000;
  document.getElementById("search-time").innerText = durationInSeconds.toFixed(2)

  await setResource(searchResult, queryObj);

  const itemTotalNumber = await getResourceTotalCount(queryObj);
  document.getElementById("search-result-number").innerText = " " + itemTotalNumber + " ";
  pagination(itemTotalNumber);

  window.onscroll = function() {stickyFunction()};

  var filterButton = document.getElementById("ad-filter-button");
  var filterNavBlock = document.querySelector(".main_container_part4_child8");
  var sticky = filterButton.offsetTop;

  function stickyFunction() {
    var width = document.documentElement.clientWidth;
    if(width > 1024) return;
    if ((window.pageYOffset+160) >= sticky) {
      filterNavBlock.classList.add('search-button-botttom-sticky');
    } else {
      filterNavBlock.classList.remove('search-button-botttom-sticky');
    }
  }

  //ajax
  var checkboxes = document.querySelectorAll('.main_container_part5_child1 input[type="checkbox"]');

  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('click', async function() {
      if(controller.signal){
        controller.abort();
      }
      var idCheckboxs = document.querySelectorAll('[id="' + checkbox.id + '"]');
      idCheckboxs.forEach(function (innerCheckbox) {
        innerCheckbox.checked = checkbox.checked;
      });
      const itemTotalNumber = await getResourceTotalCount(getQueryFilter());
      checkboxQueryFilter(1);
      pagination(itemTotalNumber);
    });
  });
})
