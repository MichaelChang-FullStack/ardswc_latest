//This all filter number is using the id resource number
const subLevelMainList = ['32'];

function allCheckboxChecked (checkboxs) {
  const isCheckeds = [];
  checkboxs.forEach(checkbox => {
    isCheckeds.push(checkbox.checked)
  });
  const checkCount = isCheckeds.filter(value => value).length;
  if (checkCount === (checkboxs.length - 1)) {
    checkboxs.forEach(checkbox => {
      checkbox.checked = true;
    })
  }
}

function checkIsAllSelect () {
  subLevelMainList.forEach(id => {
    const subSearchItem = document.querySelector(`.sub-searchitem-${id}`);
    const subCheckboxs = subSearchItem.querySelectorAll('input[type="checkbox"]');
    allCheckboxChecked(subCheckboxs)
  });

  for (let i = 2; i <= 3; i++) {
    const searchItemElement = document.querySelector(`.searchitem-${i}`);
    const checkboxs = searchItemElement.querySelectorAll('input[type="checkbox"]');
    allCheckboxChecked(checkboxs)
  }
}

async function openDefaultFilterList (filterIds) {
  filterIds.forEach(id => {
    const checkbox = $(`.searchmenu`).find(`#resource${id}`)[0];
    if(subLevelMainList.includes(id)) {
      const subSearchItem = document.querySelector(`.sub-searchitem-${id}`);
      const subCheckboxs = subSearchItem.querySelectorAll('input[type="checkbox"]')
      subCheckboxs.forEach(subCheckbox => {
        subCheckbox.checked = true;
      })
    }
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

function initChecklist () {
  for(let i = 2; i <= 3; i++) {
    const searchItemElement = document.querySelector(`.searchitem-${i}`);
    if(!searchItemElement) continue;
    checkDefaultFilterList(searchItemElement, i, 1);
  }

  subLevelMainList.forEach(subLevelNumber => {
    const subSearchItemElement = document.querySelector(`.sub-searchitem-${subLevelNumber}`);
    checkDefaultFilterList(subSearchItemElement, subLevelNumber, 2);      
  });
}

/*Search Menu Start*/
$(document).ready(async function() {
    const queryString = getQueryString();
    const filterIds = queryString &&　queryString.filterId ? queryString.filterId.split(",") : [''];
    if(filterIds.length > 0) {
      await openDefaultFilterList(filterIds)
    }
    checkIsAllSelect();
    initChecklist();
    // Toggle sub searchmenus and update dropdown icon
    $('.sub-btn').click(function() {
      var subsearchmenu = $(this).closest('.searchitem').find('.sub-searchmenusub');
      subsearchmenu.slideToggle();
      $(this).find('.dropdown').toggleClass('rotatebefore rotateafter');
      console.log( $(this));
    });
  
    $('.sub-btnmain').click(function() {
      var subsearchmenu = $(this).closest('.searchitem').find('.sub-searchmenumain');
      subsearchmenu.slideToggle();
      $(this).find('.dropdown').toggleClass('rotatebefore rotateafter');
      $(this).closest('.mainmenutitle').toggleClass('Menuinopen');
      console.log( $(this));
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
        initChecklist();
      });
  
      subCheckboxes.click(function() {
        var isChecked = $(this).is(':checked');
        var parentCheckbox = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
        var childCheckboxes = $(this).closest('.sub-searchmenu').find('.child-sub-checkbox');
        if(!isChecked) {
          parentCheckbox.prop('checked', isChecked);
          childCheckboxes.prop('checked', isChecked);
        } else {
          checkIsAllSelect();
        }
      });
  
      bigsubCheckboxes.click(function() {
        var isChecked = $(this).is(':checked');
        var parentCheckbox1 = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
        var grandparentCheckbox = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
        var childCheckboxes = $(this).closest('.searchitemsub').find('.child-sub-checkbox');
        childCheckboxes.prop('checked', isChecked);
        initChecklist();
        if(!isChecked) {
          parentCheckbox1.prop('checked', isChecked);
          grandparentCheckbox.prop('checked', isChecked);
        } else {
          checkIsAllSelect();
        }
      });
  
      childSubCheckboxes.click(function() {
        var isChecked = $(this).is(':checked');
        var parentCheckbox = $(this).closest('.searchitemsub').find('.bigsub-checkbox');
        var grandparentCheckbox = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
        if(!isChecked) {
          parentCheckbox.prop('checked', isChecked);
          grandparentCheckbox.prop('checked', isChecked);
        } else {
          checkIsAllSelect();
        }
      });
    });
  
    $('.searchmenu-checkboxall').click(function() {
      var isChecked = $(this).is(':checked');
      $('.searchmenu-checkbox, .sub-checkbox, .bigsub-checkbox, .child-sub-checkbox').prop('checked', isChecked);
    });
  
  });
  
/*Search Menu End*/