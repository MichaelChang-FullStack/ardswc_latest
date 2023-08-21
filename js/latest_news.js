
async function getLatestNews() {
  var apiUrl = '/server/news.php';
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

/*Search Menu Start*/
$(document).ready(async function () {
  const latestNews = await getLatestNews();
  console.log({latestNews})
  latestNews.forEach(news => {
    const { NE_CREATEDATE, NE_SUBJECT, LI_URL } = news;
    const date = getFormattedDate(NE_CREATEDATE.date)
    const [msg, subject] = NE_SUBJECT.split(" ");
    $("#news-container").append(
      `
      <div class="main_container_part5_child1_sub2_block1">
        <div class="main_container_part4_child3_2">
          <hr class="gray_strip_below_title">
        </div>
        <div class="main_container">
          <div class="main_container_part4_child4_1_subchild2">
            <h4 class="latest_news_title start-title">
              <span class="date square-brackets">
                <a href="" name="${date}">${date}</a>
                &nbsp;<a href="" name="${msg}">${msg}</a>
              </span>
            </h4>
            <h4 class="latest_news_title latest-news-subject">
              <a href="${LI_URL}" name="${subject}" style="text-decoration: none;">
                <span class="content">
                  ${subject}
                </span>
              </a>
            </h4>
          </div>
        </div>
        <div class="main_container_part4_child3_2">
          <hr class="gray_strip_below_title">
        </div>
      </div>
      `
    )
  });
  // $("#new-container").append(
  //   `
  //     <div class="main_container_part4_child3_2">
  //       <hr class="gray_strip_below_title">
  //     </div>
  //   `
  // )

  // Toggle sub searchmenus and update dropdown icon
  $('.sub-btn').click(function () {
    //var subsearchmenu = $(this).next('.sub-searchmenu');
    var subsearchmenu = $(this).closest('.searchitem').find('.sub-searchmenusub');
    subsearchmenu.slideToggle();
    $(this).find('.dropdown').toggleClass('rotatebefore rotateafter');
  });

  $('.sub-btnmain').click(function () {
    //var subsearchmenu = $(this).next('.sub-searchmenu');
    var subsearchmenu = $(this).closest('.searchitem').find('.sub-searchmenumain');
    subsearchmenu.slideToggle();
    $(this).find('.dropdown').toggleClass('rotatebefore rotateafter');
  });

  // Check or uncheck checkboxes based on hierarchy
  $('.searchitem').each(function () {
    var searchmenuCheckbox = $(this).find('.searchmenu-checkbox');
    var subCheckboxes = $(this).find('.sub-checkbox');
    var bigsubCheckboxes = $(this).find('.bigsub-checkbox');
    var childSubCheckboxes = $(this).find('.child-sub-checkbox');

    searchmenuCheckbox.click(function () {
      var isChecked = searchmenuCheckbox.is(':checked');
      subCheckboxes.prop('checked', isChecked);
      bigsubCheckboxes.prop('checked', isChecked);
      childSubCheckboxes.prop('checked', isChecked);
      updatesearchmenuCheckboxAll();
    });

    subCheckboxes.click(function () {
      var isChecked = $(this).is(':checked');
      var parentCheckbox = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
      var childCheckboxes = $(this).closest('.sub-searchmenu').find('.child-sub-checkbox');
      parentCheckbox.prop('checked', isChecked);
      updatesearchmenuCheckboxAll();
    });

    bigsubCheckboxes.click(function () {
      var isChecked = $(this).is(':checked');
      var parentCheckbox1 = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
      var childCheckboxes = $(this).closest('.searchitemsub').find('.child-sub-checkbox');
      parentCheckbox1.prop('checked', isChecked);
      childCheckboxes.prop('checked', isChecked);
      updatesearchmenuCheckboxAll();
    });

    childSubCheckboxes.click(function () {
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

  $('.searchmenu-checkboxall').click(function () {
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

  $('#searchButton').click(function () {
    var checkedValues = [];
    $('.searchmenu-checkbox:checked').each(function () {
      checkedValues.push($(this).val());
    });
    $('.sub-checkbox:checked').each(function () {
      checkedValues.push($(this).val());
    });
    $('.bigsub-checkbox:checked').each(function () {
      checkedValues.push($(this).val());
    });
    $('.child-sub-checkbox:checked').each(function () {
      checkedValues.push($(this).val());
    });

    console.log(checkedValues);
  });

  // Constants
  const itemsPerPage = 20;
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
  $('.gotoFirstPage').click(function () {
    showPage(1);
  });

  $('.gotoBeforePage').click(function () {
    const currentPage = $('.pageButton.active').data('page');
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  $('.gotoNextPage').click(function () {
    const currentPage = $('.pageButton.active').data('page');
    if (currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });

  $('.gotoLastPage').click(function () {
    showPage(totalPages);
  });

  // Handle direct page navigation
  $('.pageButton').click(function () {
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
  /*Pagination End*/
});

/*Search Menu End*/