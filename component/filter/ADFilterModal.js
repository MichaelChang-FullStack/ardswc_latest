function ADFilter() {
  return `
  <div id="ad-filter" class="modal">
    <div class="modal-content">
      <h3>進階篩選</h3>
      <hr />
      <p>資源類型</p>
      <div class="filter-blocker" id="select-main-block-1">
        <div>
          <input type="checkbox" class="checkbox" id="select-all-block-1" name="全選" value="全選">
          <label for="select-all-block-1"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1" id="resource2" name="圖書" value="圖書">
          <label for="resource2"> 圖書 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1" id="resource3" name="教材" value="教材">
          <label for="resource3"> 教材 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1" id="resource4" name="教案" value="教案">
          <label for="resource4"> 教案 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1" id="resource5" name="影片" value="影片">
          <label for="resource5"> 影片 </label><br>
        </div>
      </div>
      <div class="show-sub-checkbox-block-1">
        <div class="button-box" onclick="toggleArrow(1)">
          <div class="arrow-down-1">
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L9 9L17 1" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <hr />
      </div>
      <div class="filter-blocker sub-checkbox-block-1">
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-2" id="resource6" name="水土保持季刊" value="水土保持季刊">
          <label for="resource6"> 水土保持季刊 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-2" id="resource7" name="水土保持年報" value="水土保持年報">
          <label for="resource7"> 水土保持年報 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-2" id="resource8" name="台灣水土保持" value="台灣水土保持">
          <label for="resource8"> 台灣水土保持 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-2" id="resource9" name="水與土通訊" value="水與土通訊">
          <label for="resource9"> 水與土通訊 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-2" id="resource10" name="圖文專書" value="圖文專書">
          <label for="resource10"> 圖文專書 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-2" id="resource11" name="靜態繪本" value="靜態繪本">
          <label for="resource11"> 靜態繪本 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-2" id="resource12" name="動畫繪本" value="動畫繪本">
          <label for="resource12"> 動畫繪本 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-2" id="resource13" name="水保手冊" value="水保手冊">
          <label for="resource13"> 水保手冊 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-3" id="resource14" name="網頁遊戲" value="網頁遊戲">
          <label for="resource14"> 網頁遊戲 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-3" id="resource80" name="APP下載" value="APP下載">
          <label for="resource80"> APP下載 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-3" id="resource15" name="AR遊戲" value="AR遊戲">
          <label for="resource15"> AR遊戲 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-3" id="resource16" name="VR遊戲" value="VR遊戲">
          <label for="resource16"> VR遊戲 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-3" id="resource17" name="教學圖卡" value="教學圖卡">
          <label for="resource17"> 教學圖卡 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-3" id="resource18" name="教具設計" value="教具設計">
          <label for="resource18"> 教具設計 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-3" id="resource19" name="實體教具" value="實體教具">
          <label for="resource19"> 實體教具 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-3" id="resource20" name="懶人包" value="懶人包">
          <label for="resource20"> 懶人包 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-4" id="resource61" name="課堂學習" value="課堂學習">
          <label for="resource61"> 課堂學習 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-4" id="resource21" name="活動競賽" value="活動競賽">
          <label for="resource21"> 活動競賽 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-4" id="resource22" name="實驗手作" value="實驗手作">
          <label for="resource22"> 實驗手作 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-4" id="resource23" name="戶外體驗" value="戶外體驗">
          <label for="resource23"> 戶外體驗 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-4" id="resource62" name="角色扮演" value="角色扮演">
          <label for="resource62"> 角色扮演 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-5" id="resource24" name="宣導短片" value="宣導短片">
          <label for="resource24"> 宣導短片 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-5" id="resource25" name="新聞紀實" value="新聞紀實">
          <label for="resource25"> 新聞紀實 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-5" id="resource26" name="專業研習" value="專業研習">
          <label for="resource26"> 專業研習 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-5" id="resource27" name="社區活動" value="社區活動">
          <label for="resource27"> 社區活動 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-5" id="resource28" name="導覽解說" value="導覽解說">
          <label for="resource28"> 導覽解說 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-5" id="resource29" name="教學示範" value="教學示範">
          <label for="resource29"> 教學示範 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-5" id="resource30" name="戲劇表演" value="戲劇表演">
          <label for="resource30"> 戲劇表演 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-1 checkbox-block-1-5" id="resource31" name="微電影" value="微電影">
          <label for="resource31"> 微電影 </label><br>
        </div>
        </div>
      <hr />
      <p>議題融入</p>
      <div class="filter-blocker" id="select-main-block-2">
        <div>
          <input type="checkbox" class="checkbox" id="select-all-block-2" name="全選" value="全選">
          <label for="select-all-block-2"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2" id="resource32" name="環境教育" value="環境教育">
          <label for="resource32"> 環境教育 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2" id="resource33" name="防災教育" value="防災教育">
          <label for="resource33"> 防災教育 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2" id="resource34" name="戶外教育" value="戶外教育">
          <label for="resource34"> 戶外教育 </label><br>
        </div>
      </div>
      <div class="show-sub-checkbox-block-2">
        <div class="button-box" onclick="toggleArrow(2)">
          <div class="arrow-down-2">
            <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L9 9L17 1" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
        <hr />
      </div>
      <div class="filter-blocker sub-checkbox-block-2">
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-32" id="resource35" name="環境倫理" value="環境倫理">
          <label for="resource35"> 環境倫理 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-32" id="resource36" name="永續發展" value="永續發展">
          <label for="resource36"> 永續發展 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-32" id="resource37" name="氣侯變遷" value="氣侯變遷">
          <label for="resource37"> 氣侯變遷 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-32" id="resource38" name="災害防救" value="災害防救">
          <label for="resource38"> 災害防救 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-32" id="resource63" name="能源資源永續利用" value="能源資源永續利用">
          <label for="resource63"> 能源資源永續利用 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-33" id="resource39" name="災害風險與衝擊" value="災害風險與衝擊">
          <label for="resource39"> 災害風險與衝擊 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-33" id="resource40" name="災害風險的管理" value="災害風險的管理">
          <label for="resource40"> 災害風險的管理 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-33" id="resource41" name="災害防救的演練" value="災害防救的演練">
          <label for="resource41"> 災害防救的演練 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-34" id="resource42" name="有意義的學習" value="有意義的學習">
          <label for="resource42"> 有意義的學習 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-34" id="resource43" name="健康的身心" value="健康的身心">
          <label for="resource43"> 健康的身心 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-34" id="resource44" name="尊重與關懷他人" value="尊重與關懷他人">
          <label for="resource44"> 尊重與關懷他人 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-2 checkbox-block-2-34" id="resource45" name="友善環境" value="友善環境">
          <label for="resource45"> 友善環境 </label><br>
        </div>
      </div>
      <hr />
      <p>資源類別</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" class="checkbox" id="select-all-block-3" name="全選" value="全選">
          <label for="select-all-block-3"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-3" id="resource47" name="水土保持" value="水土保持">
          <label for="resource47"> 水土保持 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-3" id="resource48" name="土石流防災" value="土石流防災">
          <label for="resource48"> 土石流防災 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-3" id="resource49" name="農村再生" value="農村再生">
          <label for="resource49"> 農村再生 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-3" id="resource50" name="其他" value="其他">
          <label for="resource50"> 其他 </label><br>
        </div>
      </div>
      <hr />
      <p>適用對象</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" class="checkbox" id="select-all-block-4" name="全選" value="全選">
          <label for="select-all-block-4"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-4" id="resource54" name="幼兒階段" value="幼兒階段">
          <label for="resource54"> 幼兒階段 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-4" id="resource55" name="國小低年級" value="國小低年級">
          <label for="resource55"> 國小低年級 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-4" id="resource56" name="國小中年級" value="國小中年級">
          <label for="resource56"> 國小中年級 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-4" id="resource57" name="國小高年級" value="國小高年級">
          <label for="resource57"> 國小高年級 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-4" id="resource58" name="國中" value="國中">
          <label for="resource58"> 國中 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-4" id="resource59" name="高中" value="高中">
          <label for="resource59"> 高中 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-4" id="resource60" name="一般大眾" value="一般大眾">
          <label for="resource60"> 一般大眾 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-4" id="resource81" name="專業人士" value="專業人士">
          <label for="resource81"> 專業人士 </label><br>
        </div>
      </div>
      <hr />
      <p>領域學習課程</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" class="checkbox" id="select-all-block-5" name="全選" value="全選">
          <label for="select-all-block-5"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-5" id="resource154" name="語文" value="語文">
          <label for="resource154"> 語文 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-5" id="resource155" name="數學" value="數學">
          <label for="resource155"> 數學 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-5" id="resource156" name="社會" value="社會">
          <label for="resource156"> 社會 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-5" id="resource157" name="自然科學" value="自然科學">
          <label for="resource157"> 自然科學 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-5" id="resource158" name="藝術" value="藝術">
          <label for="resource158"> 藝術 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-5" id="resource159" name="綜合活動" value="綜合活動">
          <label for="resource159"> 綜合活動 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-5" id="resource160" name="健康與體育" value="健康與體育">
          <label for="resource160"> 健康與體育 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-5" id="resource161" name="生活課程" value="生活課程">
          <label for="resource161"> 生活課程 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-5" id="resource162" name="科技" value="科技">
          <label for="resource162"> 科技 </label><br>
        </div>
      </div>
      <hr />
      <p>載具類型</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" class="checkbox" id="select-all-block-6" name="全選" value="全選">
          <label for="select-all-block-6"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-6" id="resource254" name="智慧型手機" value="智慧型手機">
          <label for="resource254"> 智慧型手機 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-6" id="resource255" name="電腦" value="電腦">
          <label for="resource255"> 電腦 </label><br>
        </div>
        <div>
          <input type="checkbox" class="checkbox checkbox-block-6" id="resource256" name="平板" value="平板">
          <label for="resource256"> 平板 </label><br>
        </div>
      </div>
      <hr />
      <div class="btn-row">
        <button id="clear" class="btn-14main">清除篩選</button>
        <button id="filter" class="btn-14main">確認篩選</button>
      </div>
    </div>
</div>
    `
}

function toggleArrow(blockId) {
  const arrow = document.querySelector(`.arrow-down-${blockId}`);
  arrow.classList.toggle('active');

  const checkboxBlock = document.querySelector(`.sub-checkbox-block-${blockId}`);
  checkboxBlock.classList.toggle('active');

  const hr = document.querySelector(`#ad-filter > div > div.show-sub-checkbox-block-${blockId} > hr`);
  hr.classList.toggle('active');
}

document.getElementById("ad-filter-modal").innerHTML = ADFilter();


var modal = document.getElementById("ad-filter");

function openADFilterModal() {
  document.body.style.overflow = "hidden";
  modal.style.display = "block";
}


window.onclick = function(event) {
  if (event.target == modal) {
    document.body.style.overflow = "auto";
    modal.style.display = "none";
  }
}

var clear = document.getElementById("clear");
clear.onclick = function() {
  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "checkbox") {
      inputs[i].checked = false;
    }
  }
}

const filter = document.getElementById("filter");
filter.onclick = function() {
  let filterId = []
  const checkboxs = document.querySelectorAll('.checkbox');
  checkboxs.forEach(checkbox => {
    if(checkbox.checked && !checkbox.id.includes("select-all")) {
      filterId.push(checkbox.id.split('resource')[1]);
      console.log({checked: checkbox.checked, id: checkbox.id.split('resource')[1]})
    }
  })
  let searchText = ''
  if(document.getElementById("main-input")) {
     searchText =  document.getElementById("main-input").value; 
  }
  window.location.href = `/swcb-new/pages/Search_Result.html?searchText=${encodeURIComponent(searchText)}&filterId=${filterId.join(',')}`
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}


function checkSubCheckbox(subBlockNumber, resourceNumber, isChecked) {
  const checkboxs = document.querySelectorAll(`.checkbox-block-${subBlockNumber}-${resourceNumber}`);
  checkboxs.forEach(checkbox => {
    checkbox.checked = isChecked;
  })
}

function handleSubSameTypeSelect(selectMainCheckboxElement) {
  const checkboxs = selectMainCheckboxElement.querySelectorAll('input[type="checkbox"]');
  const subBlock1 = document.querySelector(`.sub-checkbox-block-1`);
  const subBlock2 = document.querySelector(`.sub-checkbox-block-2`);
  checkboxs.forEach(checkbox => {
    const resourceId = checkbox.id.split('resource')[1];
    if(checkbox.checked) {
      switch (resourceId) {
        case '2':
        case '3':
        case '4':
        case '5':
          checkSubCheckbox(1, resourceId, true);
          if(!subBlock1.classList.contains('active')) {
            toggleArrow(1);
          }
          break;
        case '33':
        case '34':
        case '35':
          const block = document.querySelector(`.sub-checkbox-block-1`);
          checkSubCheckbox(2, resourceId, true);
          if(!subBlock2.classList.contains('active')) {
            toggleArrow(2);
          }
          break;
        default:
          break;
      }
    } else {
      switch (resourceId) {
        case '2':
        case '3':
        case '4':
        case '5':
          checkSubCheckbox(1, resourceId, false);
          break;
        case '33':
        case '34':
        case '35':
          checkSubCheckbox(2, resourceId, false);
          break;
        default:
          break;
      }
    }
  })
}

function handleSelectAll(selectAllCheckbox, itemCheckboxes) {
  selectAllCheckbox.addEventListener('change', function () {
    for (let i = 0; i < itemCheckboxes.length; i++) {
      itemCheckboxes[i].checked = this.checked;
    }
  });

  for (let i = 0; i < itemCheckboxes.length; i++) {
    itemCheckboxes[i].addEventListener('change', function () {
      if (!this.checked) {
        selectAllCheckbox.checked = false;
      }
      else {
        const allChecked = Array.from(itemCheckboxes).every(item => item.checked);
        selectAllCheckbox.checked = allChecked;
      }
    });
  }
}

function handleShowSubCheckbox(selectAllCheckbox, blockId) {
  selectAllCheckbox.addEventListener('change', function () {
    const block = document.querySelector(`.sub-checkbox-block-${blockId}`);
    if(!block.classList.contains('active')) {
      toggleArrow(blockId)
    }
  });
}

async function openDefaultFilter (filterIds) {
  filterIds.forEach(id => {
    const checkbox = $(`#ad-filter`).find(`#resource${id}`)[0];
    if(checkbox) {
      checkbox.checked = true;
    }
  });
}

$(document).ready(async function() {
  const selectMainBlock1 = document.getElementById('select-main-block-1');
  const queryString = getQueryString();
  const filterIds = queryString &&　queryString.filterId ? queryString.filterId.split(",") : [''];
  if(filterIds.length > 0) {
    await openDefaultFilter(filterIds)
  }

  $('#select-main-block-1').click(function() {
    handleSubSameTypeSelect(selectMainBlock1);
  });

  const selectMainBlock2 = document.getElementById('select-main-block-2');

  $('#select-main-block-2').click(function() {
    handleSubSameTypeSelect(selectMainBlock2);
  })
  const queryObject = getQueryString();
  if(queryObject.filterId !== '') {
    handleSubSameTypeSelect(selectMainBlock1);
    handleSubSameTypeSelect(selectMainBlock1);
  }
})

const selectAllCheckbox1 = document.getElementById('select-all-block-1');
const itemCheckboxes1 = document.getElementsByClassName('checkbox-block-1');
handleSelectAll(selectAllCheckbox1, itemCheckboxes1);
handleShowSubCheckbox(selectAllCheckbox1, 1);

const selectAllCheckbox2 = document.getElementById('select-all-block-2');
const itemCheckboxes2 = document.getElementsByClassName('checkbox-block-2');
handleSelectAll(selectAllCheckbox2, itemCheckboxes2);
handleShowSubCheckbox(selectAllCheckbox2, 2);

const selectAllCheckbox3 = document.getElementById('select-all-block-3');
const itemCheckboxes3 = document.getElementsByClassName('checkbox-block-3');
handleSelectAll(selectAllCheckbox3, itemCheckboxes3);

const selectAllCheckbox4 = document.getElementById('select-all-block-4');
const itemCheckboxes4 = document.getElementsByClassName('checkbox-block-4');
handleSelectAll(selectAllCheckbox4, itemCheckboxes4);

const selectAllCheckbox5 = document.getElementById('select-all-block-5');
const itemCheckboxes5 = document.getElementsByClassName('checkbox-block-5');
handleSelectAll(selectAllCheckbox5, itemCheckboxes5);

const selectAllCheckbox6 = document.getElementById('select-all-block-6');
const itemCheckboxes6 = document.getElementsByClassName('checkbox-block-6');
handleSelectAll(selectAllCheckbox6, itemCheckboxes6);