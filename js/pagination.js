/*Pagination Start*/
function pagination() {
    // Constants
    const itemsPerPage = 10;
    let totalItems = 1000;

    // Calculate total number of pages
    let totalPages = Math.ceil(totalItems / itemsPerPage);

    // Function to update pagination when totalItems change
    function updatePagination() {
      totalItems = 1000;
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

/*Pagination End*/
