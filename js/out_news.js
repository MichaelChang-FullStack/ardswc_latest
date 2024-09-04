   

    function getQueryString() {
        const urlParams = new URLSearchParams(window.location.search);
        const NE_NO = urlParams.get('NE_NO');
        return { NE_NO };
    }

    async function getOutNewsDetail(NE_NO) {
        const apiUrl = "/server/out_news.php";
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ NE_NO }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received data from fetch:', data);

            if (Array.isArray(data) && data.length > 0) {
                return toResource(data[0]);
            } else {
                console.warn('No data found for the given NE_NO.');
                return null;
            }
        } catch (error) {
            console.error('Error fetching out news detail:', error);
            return null;
        }
    }

    function toResource(data) {
        return {
            NE_NO: data.NE_NO,
            NE_SUBJECT: data.NE_SUBJECT,
            NE_CONTENT: data.NE_CONTENT,
            // 添加其他需要的字段
            NE_CREATEDATE: data.NE_CREATEDATE,
            NE_ISONLINE: data.NE_ISONLINE,
            NE_ISDEL: data.NE_ISDEL,
            NE_ISTOP: data.NE_ISTOP,
            NE_NEWWIN: data.NE_NEWWIN,
            NE_SEND_MEMBER: data.NE_SEND_MEMBER,
            NE_SOURCE_NO: data.NE_SOURCE_NO,
            NE_CATEGORY_NO: data.NE_CATEGORY_NO,
            NE_CATEGORY: data.NE_CATEGORY,
            NE_SEND_FRONT: data.NE_SEND_FRONT,
            NE_ISREAD: data.NE_ISREAD,
            NE_FILE_NAME: data.NE_FILE_NAME,
        };
    }

    // 用於下載影片的函數
    async function downloadVideo(NE_FILE_NAME) {
        try {
            const response = await fetch(`/Files/News/${NE_FILE_NAME}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
    
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = NE_FILE_NAME;
            
            document.body.appendChild(link);
            link.click();
    
            // 移除链接并释放 URL 对象
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    }
    


    function share_fb() {
        var window_location_encoded = encodeURIComponent(window.location.href);
        var share_link = "https://www.facebook.com/sharer/sharer.php?u=" + window_location_encoded;
      
        if (/Android/i.test(navigator.userAgent)) {
          // Open in Facebook app on Android devices
          window.location.href = "intent://share/#Intent;scheme=fb;action=android.intent.action.SEND;type=text/plain;S.com.facebook.katana.extra.APPLICATION_ID=com.facebook.katana;B.android.intent.extra.TEXT=" + window_location_encoded + ";end";
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          // Open in Facebook app on iOS devices
          window.location.href = "fb://share/?link=" + window_location_encoded;
        } else {
          // Open in new tab if Facebook app not installed
          window.open(share_link, '_blank');
        }
      }
      
      function shareOnLine() {
        var url = encodeURIComponent(window.location.href);
        var lineUrl = "https://social-plugins.line.me/lineit/share?url=" + url;
      
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
          // Open in Line app if installed on mobile devices
          window.location.href = "line://msg/text/" + url;
        } else if(navigator.userAgent.match(/Mac|iPad|iPhone|iPod/i) !== null){
          // Open in Line app if installed on Mac or iOS devices
          window.location.href = "line://msg/text/" + url;
        } else {
          // Open in new tab if Line app not installed
          window.open(lineUrl, '_blank');
        }
      }
      
      function share_twitter() {
      var window_location_encoded = encodeURIComponent(window.location.href);
      var share_link = "https://twitter.com/intent/tweet?url=" + window_location_encoded;
      
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Open in Twitter app on mobile devices
        window.location.href = "twitter://post?message=" + window_location_encoded;
      } else {
        // Open in new tab if Twitter app not installed or on desktop
        window.open(share_link, '_blank');
      }
      }
      
      

