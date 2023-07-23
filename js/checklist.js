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