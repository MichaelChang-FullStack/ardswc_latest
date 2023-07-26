function checkIsAllSelect () {
  
}

async function openDefaultFilterList (filterIds) {
  filterIds.forEach(id => {
    const checkbox = document.getElementById(`resource${id}`);
    if(checkbox) {
      checkbox.checked = true;
    } 
  });
}

function checkDefaultFilterList(searchItemElement, blockId, level) {
  var checkboxes = searchItemElement.querySelectorAll('input[type="checkbox"]');
  switch (level) {
    case 1:
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
      break;
    case 2:
      checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
          const searchMainMenu = document.querySelector(`.sub-searchitem-${blockId} > .sub-searchmenusub`);
          searchMainMenu.style.display = 'block';
          const mainDropdown = document.querySelector(`.sub-dropdown-${blockId}`);
          mainDropdown.classList.remove('rotatebefore');
          mainDropdown.classList.add('rotateafter');
        }
      })
      break;
    default:
      break;
  }

}

function checkDefaultSubFilterList(subSearchItemElement, blockId) {
  var checkboxes = subSearchItemElement.querySelectorAll('input[type="checkbox"]');

}

/*Search Menu Start*/
$(document).ready(async function() {
    const queryString = getQueryString();
    const filterIds = queryString.filterId.split(",");
    if(filterIds.length > 0) {
      await openDefaultFilterList(filterIds)
      console.log(filterIds)
    }

    for(let i = 1; i <= 6; i++) {
      const searchItemElement = document.querySelector(`.searchitem-${i}`);
      if(!searchItemElement) continue;
      checkDefaultFilterList(searchItemElement, i, 1);
    }

    for (let j = 1; j <= 7; j++) {
      const subSearchItemElement = document.querySelector(`.sub-searchitem-${j}`);
      if(!subSearchItemElement) continue
      checkDefaultFilterList(subSearchItemElement, j, 2);      
    }

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