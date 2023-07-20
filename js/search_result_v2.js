/*
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
            console.log('origin', data);
            const formatBooks = data.map(book => {
                const {Title, ShortDescrip, BookID, BC_Name, TC_Name, FC_Name} = book;
                const type = BC_Name ?? TC_Name ?? FC_Name
                return {
                    title: Title,
                    description: ShortDescrip,
                    image: '../../swcb_110/Files/cover/'+ BookID + '.jpg',
                    type
                }
            })
            return formatBooks;
        } 
    } catch (error) {
        throw new Error('網路請求失敗: ' + error);
    }
}

$(function () {
    (async function () {
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
            const {image, title, description, type} = result
            $("#search-content").append(
                `
                <div class="search-card">
                    <div class="card-image">
                        <img src="${image}" onError="this.onerror=null; this.src='../asset/images/search-result-default-img.png';">
                        <span class="card-image-tag">${type}</span>
                    </div>
                    <div class="card-content"> 
                        <h4>${title}</h4>
                        <div id="card-topic-tag">
                            <span>環境教育-氣候變遷</span>
                        </div>
                        <div id="card-age-range-tag">
                            <span>國小高年級，國中</span>
                        </div>

                        <p>簡介: ${description}</p>
                    </div>
                </div>
                `
            )
        });
    })();
});
*/

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
        var childCheckboxes = $(this).closest('.sub-searchmenu').find('.child-sub-checkbox');
        parentCheckbox1.prop('checked', isChecked);
        childCheckboxes.prop('checked', isChecked);
        updatesearchmenuCheckboxAll();
      });
  
      childSubCheckboxes.click(function() {
        var isChecked = $(this).is(':checked');
        var parentCheckbox = $(this).closest('.searchitemsub').find('.bigsub-checkbox');
        var grandparentCheckbox = $(this).closest('.searchitemmain').find('.searchmenu-checkbox');
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