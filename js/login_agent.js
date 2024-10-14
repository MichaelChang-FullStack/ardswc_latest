$(document).ready(function () {
  // 偵測是否是 LINE 內建瀏覽器
  function isLineBrowser() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return userAgent.indexOf("Line") > -1;
  }

  // 偵測 LINE 瀏覽器並跳轉
  if (isLineBrowser()) {
    var currentUrl = window.location.href;

    // 檢查 URL 是否已經包含參數
    if (currentUrl.indexOf("openExternalBrowser=1") === -1) {
      // 如果沒有包含，則附加參數
      if (currentUrl.indexOf("?") === -1) {
        currentUrl += "?openExternalBrowser=1";
      } else {
        currentUrl += "&openExternalBrowser=1";
      }

      // 使用 window.location.href 進行跳轉
      window.location.href = currentUrl;
    }
  }
});
