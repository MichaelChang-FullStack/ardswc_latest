async function getAlbum() {
  var apiUrl = '/server/album.php';
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

$(document).ready(async function () {
  const albums = await getAlbum();
  console.log({albums})
  albums.forEach(album => {
    const {AL_NAME, AL_DATE, AL_NO, IM_FILE, imageNumber} = album;
    const date = getFormattedDate(AL_DATE.date)
    $("#mainContainer").append(
      `
      <div class="main_container_part5_child1_sub2_block1">
        <div class="mainbookinfo">
          <div class="mainbookinfo_part1">
              <div class="mainbookinfo_part12"><img src="/Files/Photo/${AL_NO}/${IM_FILE}" alt="bookRectangle_248"></div>
          </div>
          <div class="mainbookinfo_part2">
              <div class="mainbookinfo_part21">
                  <span>${AL_NAME}</span>
              </div>
              <div class="mainbookinfo_part23">
                <div class="mainbookinfo_part231">
                  <div class="mainbookinfo_part23_1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M15 2H5C4.20462 2.00088 3.44207 2.31724 2.87965 2.87965C2.31724 3.44207 2.00088 4.20462 2 5V15C2.00088 15.7954 2.31724 16.5579 2.87965 17.1203C3.44207 17.6828 4.20462 17.9991 5 18H15C15.7954 17.9991 16.5579 17.6828 17.1203 17.1203C17.6828 16.5579 17.9991 15.7954 18 15V5C17.9991 4.20462 17.6828 3.44207 17.1203 2.87965C16.5579 2.31724 15.7954 2.00088 15 2ZM5 4H15C15.2652 4 15.5196 4.10536 15.7071 4.29289C15.8946 4.48043 16 4.73478 16 5V15C16.0002 15.1313 15.9743 15.2614 15.924 15.3827C15.8737 15.504 15.7998 15.6141 15.7067 15.7067L9.88533 9.88533C9.38526 9.38541 8.7071 9.10457 8 9.10457C7.2929 9.10457 6.61474 9.38541 6.11467 9.88533L4 12V5C4 4.73478 4.10536 4.48043 4.29289 4.29289C4.48043 4.10536 4.73478 4 5 4Z" fill="#467D1E"/>
                      <path d="M13.5 8C14.3284 8 15 7.32843 15 6.5C15 5.67157 14.3284 5 13.5 5C12.6716 5 12 5.67157 12 6.5C12 7.32843 12.6716 8 13.5 8Z" fill="#467D1E"/>
                    </svg>
                  </div>
                  <div class="mainbookinfo_part23_2">
                      <span>${imageNumber < 10 ? '0'+imageNumber : imageNumber}</span>
                  </div>
                </div>
                <div class="mainbookinfo_part232"><h6>${date}</h6></div>
              </div>
          </div>
        </div>
        <a href="/pages/Event_Competition_Field_Event_Photos.html?id=${AL_NO}" name="查看活動照片(${AL_NAME})"></a>
      </div> 
      `
    )
  });
  
  $('#album-news').click(function () {
    $(`.main_container_part4_child4_part11`).addClass('active');
    $('.main_container_part4_child4_part12').removeClass('active');
  });

  $('#album-hots').click(function () {
    $(`.main_container_part4_child4_part12`).addClass('active');
    $('.main_container_part4_child4_part11').removeClass('active');
  });


  function updateItemsPerPage() {
    const containerWidth = $(window).width();
    console.log(containerWidth);
    if (containerWidth < 1425) {
      itemsPerPage1 = 16; // 2 items per row
    } else if (containerWidth < 1768) {
      itemsPerPage1 = 15; // 3 items per row
    } else if (containerWidth < 2136) {
      itemsPerPage1 = 16; // 4 items per row
    } else {
      itemsPerPage1 = 30; // 5 items per row
    }
    return itemsPerPage1;
  }
  const itemsPerPage = updateItemsPerPage();
  const newItemsPerPage = updateItemsPerPage();
  console.log(itemsPerPage);
  let totalItems = $('.main_container_part5_child1_sub2_block1').length;
  console.log("totalItems".totalItems);

  // Calculate total number of pages
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  console.log("totalPages".totalPages);
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
});


$(window).resize(function () {
  function updateItemsPerPage() {

    const containerWidth = $(window).width();
    console.log(containerWidth);
    if (containerWidth < 1425) {
      itemsPerPage1 = 16; // 2 items per row
    } else if (containerWidth < 1768) {
      itemsPerPage1 = 15; // 3 items per row
    } else if (containerWidth < 2136) {
      itemsPerPage1 = 16; // 4 items per row
    } else {
      itemsPerPage1 = 30; // 5 items per row
    }
    return itemsPerPage1;
  }
  const itemsPerPage = updateItemsPerPage();
  const newItemsPerPage = updateItemsPerPage();
  console.log(itemsPerPage);
  let totalItems = $('.main_container_part5_child1_sub2_block1').length;
  console.log("totalItems".totalItems);

  // Calculate total number of pages
  let totalPages = Math.ceil(totalItems / itemsPerPage);
  console.log("totalPages".totalPages);
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
});
