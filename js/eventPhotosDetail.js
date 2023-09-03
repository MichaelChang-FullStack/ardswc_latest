async function getEventPhotos(id) {
  var apiUrl = '/server/eventImages.php';
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
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAlbumDetail(id) {
  var apiUrl = '/server/albumDetail.php';
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
      return data[0];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

$(document).ready(async function () {
  const {id} = getQueryString();
  if(!id) return;
  const album = await getAlbumDetail(id);
  const images = await getEventPhotos(id);
  console.log({images, album})
  const {AL_NAME, AL_DATE} = album;
  document.querySelector('#bread-title > h6').innerHTML = AL_NAME;
  document.querySelector('#resource-title > h2').innerHTML = AL_NAME;
  $('#resource-image-count').append(
    `
      <h5 class="numberofimagedata">照片數量共: ${images.length < 10 ? '0' + images.length : images.length}張</h5>
    `
  )

  $('#resource-image-upload-date').append(
    `
      <h5 class="imageadddate">上傳日期:${getFormattedDate(AL_DATE.date)}</h5>
    `
  )

  images.forEach(image => {
    const {IM_FILE} = image
    $('#mainContainer').append(
      `
        <div class="main_container_part5_child1_sub2_block1">
          <div class="mainbookinfo">
            <div class="mainbookinfo_part1">
                <div class="mainbookinfo_part12">
                  <div class="hero-slider" id="image_slide">
                  <div class="slide-item">
                    <a class="fresco" href="/Files/Photo/${id}/${IM_FILE}"  data-fresco-group="projects1">
                        <img loading="lazy" id="slider1-img1" class="mainbookinfo_part12_img" src="/Files/Photo/${id}/${IM_FILE}"  alt="${AL_NAME}">
                    </a>
                </div>
                </div>

                </div>
            </div>

          </div>
        </div>
      `
    )
  });

  function updateItemsPerPage() {
    const containerWidth = $(window).width();
    console.log(containerWidth);
    if (containerWidth < 519) {
      itemsPerPage1 = 16; // 2 items per row
    } else if (containerWidth < 690) {
      itemsPerPage1 = 15; // 3 items per row
    } else if (containerWidth < 2264) {
      itemsPerPage1 = 30; // 4 items per row
    } else if (containerWidth < 2535) {
      itemsPerPage1 = 42; // 4 items per row
    } else {
      itemsPerPage1 = 40; // 5 items per row
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
    if (containerWidth < 519) {
      itemsPerPage1 = 16; // 2 items per row
    } else if (containerWidth < 690) {
      itemsPerPage1 = 15; // 3 items per row
    } else if (containerWidth < 2264) {
      itemsPerPage1 = 30; // 4 items per row
    } else if (containerWidth < 2535) {
      itemsPerPage1 = 42; // 4 items per row
    } else {
      itemsPerPage1 = 40; // 5 items per row
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



$(document).ready(function () {
  const slider = $('.hero-slider');
  let isAutoSlide = false;

  // Function to check if the slider content overflows the container
  function checkOverflow() {
    const slider = $('.hero-slider');
    const sliderWidth = slider.width();
    const slideItem = slider.find('.fresco').eq(0);
    const numberOfSlideItems = slider.find('.fresco').length;
    const totalWidthOfSlideItems = slideItem.outerWidth(true) * numberOfSlideItems;
    const divded = Math.floor(sliderWidth % numberOfSlideItems);
    console.log(divded);
    console.log(sliderWidth);
    console.log(totalWidthOfSlideItems);
    if (sliderWidth > totalWidthOfSlideItems) {
      isautoplay = false;
    }
    else {
      isautoplay = true;
    }



  }

  // Check if autoplay is needed and update the Slick slider options accordingly
  checkOverflow();

});
