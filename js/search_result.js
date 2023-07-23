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

/*Search Menu Start*/
$(document).ready(function() {

    // Toggle sub searchmenus and update dropdown icon
    $('.sub-btn').click(function() {
      //var subsearchmenu = $(this).next('.sub-searchmenu');
      var subsearchmenu = $(this).closest('.searchitem').find('.sub-searchmenusub');
      subsearchmenu.slideToggle();
      $(this).find('.dropdown').toggleClass('rotatebefore rotateafter');
    });
  
    $('.sub-btnmain').click(function() {
      //var subsearchmenu = $(this).next('.sub-searchmenu');
      var subsearchmenu = $(this).closest('.searchitem').find('.sub-searchmenumain');
      subsearchmenu.slideToggle();
      $(this).find('.dropdown').toggleClass('rotatebefore rotateafter');
    });
  
    // Check or uncheck checkboxes based on hierarchy
    $('.searchitem').each(function() {
      var searchmenuCheckbox = $(this).find('.searchmenu-checkbox');
      var subCheckboxes = $(this).find('.sub-checkbox');
      var bigsubCheckboxes = $(this).find('.bigsub-checkbox');
      var childSubCheckboxes = $(this).find('.child-sub-checkbox');
  
      searchmenuCheckbox.click(function() {
        var isChecked = searchmenuCheckbox.is(':checked');
        subCheckboxes.prop('checked', isChecked);
        bigsubCheckboxes.prop('checked', isChecked);
        childSubCheckboxes.prop('checked', isChecked);
        updatesearchmenuCheckboxAll();
      });
  
      subCheckboxes.click(function() {
        var isChecked = $(this).is(':checked');
        var parentCheckbox = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
        var childCheckboxes = $(this).closest('.sub-searchmenu').find('.child-sub-checkbox');
        parentCheckbox.prop('checked', isChecked);
        updatesearchmenuCheckboxAll();
      });
  
      bigsubCheckboxes.click(function() {
        var isChecked = $(this).is(':checked');
        var parentCheckbox1 = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
        var childCheckboxes = $(this).closest('.searchitemsub').find('.child-sub-checkbox');
        parentCheckbox1.prop('checked', isChecked);
        childCheckboxes.prop('checked', isChecked);
        updatesearchmenuCheckboxAll();
      });
  
      childSubCheckboxes.click(function() {
        var isChecked = $(this).is(':checked');
        var parentCheckbox = $(this).closest('.searchitemsub').find('.bigsub-checkbox');
        //var grandparentCheckbox = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
        parentCheckbox.prop('checked', isChecked);
        grandparentCheckbox.prop('checked', isChecked);
        updatesearchmenuCheckboxAll();
      });
    });
  
    function updatesearchmenuCheckboxAll() {
      var allCheckboxes = $('.searchmenu-checkbox, .sub-checkbox, .bigsub-checkbox, .child-sub-checkbox');
      var checkedCheckboxes = allCheckboxes.filter(':checked');
      var searchmenuCheckboxAll = $('.searchmenu-checkboxall');
      searchmenuCheckboxAll.prop('checked', allCheckboxes.length === checkedCheckboxes.length);
    }
  
    $('.searchmenu-checkboxall').click(function() {
      var isChecked = $(this).is(':checked');
      $('.searchmenu-checkbox, .sub-checkbox, .bigsub-checkbox, .child-sub-checkbox').prop('checked', isChecked);
    });
  
  /*ALL searchmenu Check RAW ARRAY*/
  
        function updatesearchmenuCheckboxAll() {
        var allCheckboxes = $('.searchmenu-checkbox, .sub-checkbox, .bigsub-checkbox, .child-sub-checkbox');
        var checkedCheckboxes = allCheckboxes.filter(':checked');
        var searchmenuCheckboxAll = $('.searchmenu-checkboxall');
        searchmenuCheckboxAll.prop('checked', allCheckboxes.length === checkedCheckboxes.length);
      }
  
      // ... (your existing code here)
  
      $('#searchButton').click(function() {
        var checkedValues = [];
        $('.searchmenu-checkbox:checked').each(function() {
          checkedValues.push($(this).val());
        });
        $('.sub-checkbox:checked').each(function() {
          checkedValues.push($(this).val());
        });
        $('.bigsub-checkbox:checked').each(function() {
          checkedValues.push($(this).val());
        });
        $('.child-sub-checkbox:checked').each(function() {
          checkedValues.push($(this).val());
        });
  
        console.log(checkedValues);
      });
  
  
  });
  
/*Search Menu End*/


/*Pagination Start*/
function pagination() {
    // Constants
    const itemsPerPage = 10;
    let totalItems = $('.main_container_part5_child1_sub2_block1').length;

    // Calculate total number of pages
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    // Function to update pagination when totalItems change
    function updatePagination() {
      totalItems = $('.main_container_part5_child1_sub2_block1').length;
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
    $('.gotoFirstPage').click(function() {
      showPage(1);
    });

    $('.gotoBeforePage').click(function() {
      const currentPage = $('.pageButton.active').data('page');
      if (currentPage > 1) {
        showPage(currentPage - 1);
      }
    });

    $('.gotoNextPage').click(function() {
      const currentPage = $('.pageButton.active').data('page');
      if (currentPage < totalPages) {
        showPage(currentPage + 1);
      }
    });

    $('.gotoLastPage').click(function() {
      showPage(totalPages);
    });

    // Handle direct page navigation
    $('.pageButton').click(function() {
      window.scrollTo(0, 0);
      const page = $(this).data('page');
      showPage(page);
    });

    function showPage(page) {
      // Mark current page button as active
      $('.pageButton').removeClass('active');
      $(`.pageButton[data-page="${page}"]`).addClass('active');

      // Calculate start and end index of items to be shown
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

      // Hide all items and show only those on the current page
      $('.main_container_part5_child1_sub2_block1').hide();
      $(`.main_container_part5_child1_sub2_block1:nth-child(n + ${startIndex + 1}):nth-child(-n + ${endIndex + 1})`).show();

      // Enable/disable navigation buttons based on current page
      $('.gotoFirstPage, .gotoBeforePage').prop('disabled', page === 1);
      $('.gotoNextPage, .gotoLastPage').prop('disabled', page === totalPages);

      // Update "five page direct navigate button"
      updateFivePageButtons(page, totalPages);

      // Update the count display
    const countDisplay = $('.countDisplay');
    countDisplay.text(`第 ${page}/${totalPages}頁,共${totalItems}筆`);
    }

    function updateFivePageButtons(currentPage, totalPages) {
      const pageButtons = $('.pageButton');
      const maxVisibleButtons = 5;

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

/*Pagination End*/


$(document).ready(function () {
  setResource().then(() => {
    pagination();
  })
})