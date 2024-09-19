//This all filter number is using the id resource number
const subLevelMainList = ['2', '3', '4', '5', '32', '33', '34'];

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

  for (let i = 1; i <= 6; i++) {
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
  for(let i = 1; i <= 6; i++) {
    const searchItemElement = document.querySelector(`.searchitem-${i}`);
    if(!searchItemElement) continue;
    checkDefaultFilterList(searchItemElement, i, 1);
  }

  subLevelMainList.forEach(subLevelNumber => {
    const subSearchItemElement = document.querySelector(`.sub-searchitem-${subLevelNumber}`);
    checkDefaultFilterList(subSearchItemElement, subLevelNumber, 2);      
  });
}

function checkAllTop(){
  const filterIds = (new URLSearchParams(location.search).get('filterId')||'').split(',').filter(id => id.length > 0);

  if(filterIds.length > 0 || !new URLSearchParams(location.search).has('filterId')){
    document.querySelectorAll('.checkbox.searchmenu-checkbox').forEach(el => {
      const main = el.closest('.searchitemmain');
      const ids = Array.from(main.querySelectorAll('.bigsub-checkbox,.child-sub-checkbox')).map(checkbox => checkbox.id.replace(/^resource/, ''));

      const intersectionArray = intersection(filterIds, ids);

      if(intersectionArray.length === 0 || intersectionArray.length === ids.length){
        main.querySelectorAll('input[type="checkbox"]').forEach(check => check.checked = true);
      }
    });
  }
}

function intersection(arr1, arr2) {
  const set1 = new Set(arr1);

  return arr2.filter(element => set1.has(element));
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
    checkAllTop();
    // Toggle sub searchmenus and update dropdown icon
    $('.sub-btn').click(function() {
      var subsearchmenu = $(this).closest('.searchitem').find('.sub-searchmenusub');
      subsearchmenu.slideToggle();
      $(this).find('.dropdown').toggleClass('rotatebefore rotateafter');
    });
  
    $('.sub-btnmain').click(function() {
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
        var parentId = parentCheckbox.attr('id');
        // console.log({parentId})
        var grandparentCheckbox = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
        const allParentCheckboxs = document.querySelectorAll(`#${parentId}`);
        const allChildSubCheckboxs = document.querySelectorAll(`#${this.id}`);
        if(!isChecked) {
          parentCheckbox.prop('checked', isChecked);
          grandparentCheckbox.prop('checked', isChecked);
          allChildSubCheckboxs.forEach(checkbox => {
            checkbox.checked = isChecked
          });
          allParentCheckboxs.forEach(checkbox => {
            checkbox.checked = isChecked
            // console.log({check: checkbox.checked})
          })
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