function ADFilter() {
  return `
  <div id="ad-filter" class="modal">
    <div class="modal-content">
      <h3>進階篩選</h3>
      <hr />
      <p>資源類型</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" id="resource1" name="全選" value="全選">
          <label for="resource1"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource2" name="圖書" value="圖書">
          <label for="resource2"> 圖書 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource3" name="教材" value="教材">
          <label for="resource3"> 教材 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource4" name="教案" value="教案">
          <label for="resource4"> 教案 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource5" name="影片" value="影片">
          <label for="resource5"> 影片 </label><br>
        </div>
      </div>
      <hr />
      <div class="filter-blocker">
        <div>
          <input type="checkbox" id="resource6" name="水土保持季刊" value="水土保持季刊">
          <label for="resource6"> 水土保持季刊 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource7" name="水士保持年報" value="水士保持年報">
          <label for="resource7"> 水士保持年報 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource8" name="台灣水土保持" value="台灣水土保持">
          <label for="resource8"> 台灣水土保持 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource9" name="水與士通訊" value="水與士通訊">
          <label for="resource9"> 水與士通訊 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource10" name="圖文專書" value="圖文專書">
          <label for="resource10"> 圖文專書 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource11" name="靜態繪本" value="靜態繪本">
          <label for="resource11"> 靜態繪本 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource12" name="動畫繪本" value="動畫繪本">
          <label for="resource12"> 動畫繪本 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource13" name="水保手冊" value="水保手冊">
          <label for="resource13"> 水保手冊 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource14" name="網頁遊戲APP下載" value="網頁遊戲APP下載">
          <label for="resource14"> 網頁遊戲APP下載 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource15" name="AR遊戲" value="AR遊戲">
          <label for="resource15"> AR遊戲 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource16" name="VR遊戲" value="VR遊戲">
          <label for="resource16"> VR遊戲 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource17" name="教學圖卡" value="教學圖卡">
          <label for="resource17"> 教學圖卡 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource18" name="教具設計" value="教具設計">
          <label for="resource18"> 教具設計 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource19" name="實體教具" value="實體教具">
          <label for="resource19"> 實體教具 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource20" name="懶人包課堂學習" value="懶人包課堂學習">
          <label for="resource20"> 懶人包課堂學習 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource21" name="活動競賽" value="活動競賽">
          <label for="resource21"> 活動競賽 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource22" name="實驗手作" value="實驗手作">
          <label for="resource22"> 實驗手作 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource23" name="戶外體驗角色扮演" value="戶外體驗角色扮演">
          <label for="resource23"> 戶外體驗角色扮演 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource24" name="宣導短片" value="宣導短片">
          <label for="resource24"> 宣導短片 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource25" name="新聞紀實" value="新聞紀實">
          <label for="resource25"> 新聞紀實 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource26" name="專業研習" value="專業研習">
          <label for="resource26"> 專業研習 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource27" name="社區活動" value="社區活動">
          <label for="resource27"> 社區活動 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource28" name="導覽解說" value="導覽解說">
          <label for="resource28"> 導覽解說 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource29" name="教學示範" value="教學示範">
          <label for="resource29"> 教學示範 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource30" name="戲劇表演" value="戲劇表演">
          <label for="resource30"> 戲劇表演 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource31" name="微電影全選" value="微電影全選">
          <label for="resource31"> 微電影 </label><br>
        </div>
      </div>
      <hr />
      <p>議題融入</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" id="resource310" name="全選" value="全選">
          <label for="resource310"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource32" name="環境教育" value="環境教育">
          <label for="resource32"> 環境教育 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource33" name="防災教育" value="防災教育">
          <label for="resource33"> 防災教育 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource34" name="戶外教育" value="戶外教育">
          <label for="resource34"> 戶外教育 </label><br>
        </div>
      </div>
      <hr />
      <div class="filter-blocker">
        <div>
          <input type="checkbox" id="resource35" name="環境倫理" value="環境倫理">
          <label for="resource35"> 環境倫理 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource36" name="永續發展" value="永續發展">
          <label for="resource36"> 永續發展 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource37" name="氣侯變遷" value="氣侯變遷">
          <label for="resource37"> 氣侯變遷 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource38" name="災害防救。能源資源永續利用" value="災害防救。能源資源永續利用">
          <label for="resource38"> 災害防救。能源資源永續利用 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource39" name="災害風險與衝擊" value="災害風險與衝擊">
          <label for="resource39"> 災害風險與衝擊 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource40" name="災害風險的管理" value="災害風險的管理">
          <label for="resource40"> 災害風險的管理 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource41" name="災害防救的演練" value="災害防救的演練">
          <label for="resource41"> 災害防救的演練 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource42" name="有意義的學習" value="有意義的學習">
          <label for="resource42"> 有意義的學習 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource43" name="健康的身心" value="健康的身心">
          <label for="resource43"> 健康的身心 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource44" name="尊重與關懷他人" value="尊重與關懷他人">
          <label for="resource44"> 尊重與關懷他人 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource45" name="友善環境" value="友善環境">
          <label for="resource45"> 友善環境 </label><br>
        </div>
      </div>
      <hr />
      <p>資源類別</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" id="resource46" name="全選" value="全選">
          <label for="resource46"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource47" name="水士保持" value="水士保持">
          <label for="resource47"> 水士保持 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource48" name="防洪減災" value="防洪減災">
          <label for="resource48"> 防洪減災 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource49" name="氣候變遷" value="氣候變遷">
          <label for="resource49"> 氣候變遷 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource50" name="永續發展" value="永續發展">
          <label for="resource50"> 永續發展 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource51" name="教育推廣" value="教育推廣">
          <label for="resource51"> 教育推廣 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource53" name="其他" value="其他">
          <label for="resource53"> 其他 </label><br>
        </div>
      </div>
      <hr />
      <p>適用對象</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" id="resource53" name="全選" value="全選">
          <label for="resource53"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource54" name="幼兒階段" value="幼兒階段">
          <label for="resource54"> 幼兒階段 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource55" name="國小低年級" value="國小低年級">
          <label for="resource55"> 國小低年級 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource56" name="國小中年級" value="國小中年級">
          <label for="resource56"> 國小中年級 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource57" name="國小高年級" value="國小高年級">
          <label for="resource57"> 國小高年級 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource58" name="國中" value="國中">
          <label for="resource58"> 國中 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource59" name="高中" value="高中">
          <label for="resource59"> 高中 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource60" name="一般大眾" value="一般大眾">
          <label for="resource60"> 一般大眾 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource61" name="專業人士" value="專業人士">
          <label for="resource61"> 專業人士 </label><br>
        </div>
      </div>
      <hr />
      <p>領域學習課程</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" id="resource153" name="全選" value="全選">
          <label for="resource153"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource154" name="語文" value="語文">
          <label for="resource154"> 語文 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource155" name="數學" value="數學">
          <label for="resource155"> 數學 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource156" name="社會" value="社會">
          <label for="resource156"> 社會 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource157" name="自然科學" value="自然科學">
          <label for="resource157"> 自然科學 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource158" name="藝術" value="藝術">
          <label for="resource158"> 藝術 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource159" name="綜合活動" value="綜合活動">
          <label for="resource159"> 綜合活動 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource160" name="健康與體育" value="健康與體育">
          <label for="resource160"> 健康與體育 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource161" name="生活課程" value="生活課程">
          <label for="resource161"> 生活課程 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource162" name="科技" value="科技">
          <label for="resource162"> 科技 </label><br>
        </div>
      </div>
      <hr />
      <p>載具類型</p>
      <div class="filter-blocker">
        <div>
          <input type="checkbox" id="resource253" name="全選" value="全選">
          <label for="resource253"> 全選 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource254" name="智慧型手機" value="智慧型手機">
          <label for="resource254"> 智慧型手機 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource255" name="電腦" value="電腦">
          <label for="resource255"> 電腦 </label><br>
        </div>
        <div>
          <input type="checkbox" id="resource256" name="平板" value="平板">
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

document.getElementById("ad-filter-modal").innerHTML = ADFilter();


var modal = document.getElementById("ad-filter");
var btn = document.getElementById("ad-filter-button");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
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


