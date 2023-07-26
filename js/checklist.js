async function openDefaultFilterList (filterIds) {
  filterIds.forEach(id => {
    const checkbox = document.getElementById(`resource${id}`);
    if(checkbox) {
      checkbox.checked = true;
    } 
  });
}

function checkDefaultFilterList(searchItemElement, blockId) {
  var checkboxes = searchItemElement.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      console.log('Checkbox with ID ' + checkbox.id + ' is checked.');
      const searchMainMenu = document.querySelector(`.searchitem-${blockId} > .sub-searchmenumain`);
      searchMainMenu.style.display = 'block';
      const mainDropdown = document.querySelector(`.dropdown-${blockId}`);
      mainDropdown.classList.remove('rotatebefore');
      mainDropdown.classList.add('rotateafter');
    }
  });
}

function checkDefaultSubFilterList(subSearchItemElement, blockId) {
  var checkboxes = subSearchItemElement.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      const searchMainMenu = document.querySelector(`.sub-searchitem-${blockId} > .sub-searchmenusub`);
      searchMainMenu.style.display = 'block';
      const mainDropdown = document.querySelector(`.sub-dropdown-${blockId}`);
      mainDropdown.classList.remove('rotatebefore');
      mainDropdown.classList.add('rotateafter');
    }
  })
}

/*Search Menu Start*/
$(document).ready(async function() {
    const queryString = getQueryString();
    const filterIds = queryString.filterId.split(",");
    if(filterIds.length > 0) {
      await openDefaultFilterList(filterIds)
      console.log(filterIds)
    }
      
    const searchItemElement1 = document.querySelector('.searchitem-1');
    checkDefaultFilterList(searchItemElement1, 1);
    //圖書
    const subSearchItemElement1 = document.querySelector('.sub-searchitem-1');
    checkDefaultSubFilterList(subSearchItemElement1, 1);
    //教材
    const subSearchItemElement2 = document.querySelector('.sub-searchitem-2');
    checkDefaultSubFilterList(subSearchItemElement2, 2);
    //教案
    const subSearchItemElement3 = document.querySelector('.sub-searchitem-3');
    checkDefaultSubFilterList(subSearchItemElement3, 3);
    //影片
    const subSearchItemElement4 = document.querySelector('.sub-searchitem-4');
    checkDefaultSubFilterList(subSearchItemElement4, 4);

    const searchItemElement2 = document.querySelector('.searchitem-2');
    checkDefaultFilterList(searchItemElement2, 2);
    const subSearchItemElement5 = document.querySelector('.sub-searchitem-5');
    checkDefaultSubFilterList(subSearchItemElement5, 5);
    const subSearchItemElement6 = document.querySelector('.sub-searchitem-6');
    checkDefaultSubFilterList(subSearchItemElement6, 6);
    const subSearchItemElement7 = document.querySelector('.sub-searchitem-7');
    checkDefaultSubFilterList(subSearchItemElement7, 7);

    const searchItemElement3 = document.querySelector('.searchitem-3');
    checkDefaultFilterList(searchItemElement3, 3);

    const searchItemElement4 = document.querySelector('.searchitem-4');
    checkDefaultFilterList(searchItemElement4, 4);

    const searchItemElement5 = document.querySelector('.searchitem-5');
    checkDefaultFilterList(searchItemElement5, 5);

    const searchItemElement6 = document.querySelector('.searchitem-6');
    checkDefaultFilterList(searchItemElement6, 6);

    
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
  });
  
/*Search Menu End*/