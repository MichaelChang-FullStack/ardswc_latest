

  $(document).ready(async function() {
    const {bookId} = getQueryString();
    const detailResource = await getResourceDetail(bookId);
    const galleryDetail = await getGalleryDetail(bookId);
    const links = await getLinks(bookId);
    const {LI_NAME} = links[links.length - 1];
    const breadTitle = document.querySelector("#bread-title > h6");
    const resourceTitle = document.querySelector('.title_text_main');
    const resourceDescription = document.querySelector('#resource-description > h5');
    const resourceISName = document.querySelector("#resource-is-name > h5");
    const resourceFCName = document.querySelector("#resource-fc-name > h5");
    const resourceOBName = document.querySelector("#resource-ob-name > h5");
    const {GA_SUBJECT} = galleryDetail;
    const {ShortDescrip, tags, IS_Name, FC_Name, OB_Name, IM_FILE, type, BT_Name} = detailResource;
    resourceTitle.innerHTML = GA_SUBJECT;
    breadTitle.innerHTML = GA_SUBJECT;
    const sameResources = await getSameResource(type || BT_Name, bookId);
    const video = LI_NAME.includes(".mp4") ? LI_NAME : `${LI_NAME}.mp4`;

    $("#resource-video").append(
      `
        <video id="videoPlayer" controls poster="/Files/Gallery/${IM_FILE}">
          <source src="/Files/Videos/${video}" type="video/mp4">
          Your browser does not support HTML video.
        </video>
      `
    )

    tags.forEach(tag => {
      $("#resource-tags").append(
        `
        <div class="frequest_search1">
          <span>${tag}</span>
        </div>
        `
      )
    });

    resourceISName.innerHTML = IS_Name;
    resourceFCName.innerHTML = FC_Name;
    resourceOBName.innerHTML = OB_Name;
    resourceDescription.innerHTML = ShortDescrip;

    sameResources.forEach(resource => {
      const {title, target, tags, imageFileName, BT_Name, BookID} = toResource(resource);
      const image = getImagePath(imageFileName, BT_Name)
      const tagElement = tags.map((tag) => {
        return `
                <div class="frequest_search1">
                  <span>${tag}</span>
                </div>
              `
      }).join(" ");
      $('#same-resource').append(
        `
        <div class="card">
          <div class="mainbookinfo">
            <div class="mainbookinfo_part1">
                <div class="mainbookinfo_part11"><span>${type}</span></div>
                <div class="mainbookinfo_part12"><img loading="lazy" src="${image}" alt="${title}" onError="this.onerror=null; this.src='../asset/images/search-result-default-img.png';"></div>
            </div>
            <div class="mainbookinfo_part2">
                <div class="mainbookinfo_part21">
                    <span>${title}</span>
                </div>
                <div class="mainbookinfo_part22">
                  ${tagElement}
                </div>
                <div class="mainbookinfo_part23">
                    <div class="mainbookinfo_part23_1">
                        <img loading="lazy" src="../asset/images/Teacher_Edition_Home/icon_user.svg" alt="icon_user">
                    </div>
                    <div class="mainbookinfo_part23_2">
                        <span>${target}</span>
                    </div>
                </div>
            </div>
          </div>
          <a class="resource-detail" name=${title} href=${getDetailLink(resource)}></a>
        </div>
        `
      )
    });

    const informationinformationtabs = $(".informationtab");
    const greenLine = $(".informationgreen-line");

    function adjustGreenLine() {
      const activeinformationtab = $(".informationtab.active");
      greenLine.css({
        width: activeinformationtab.outerWidth(),
        left: activeinformationtab.position().left
      });
    }

    const informationinformationtabs1 = $(".informationtab1");
    const greenLine1 = $(".informationgreen-line1");

    function adjustGreenLine1() {
      const activeinformationtab1 = $(".informationtab1.active");
      greenLine1.css({
        width: activeinformationtab1.outerWidth(),
        left: activeinformationtab1.position().left
      });
    }
    adjustGreenLine1();

    // Set the first tab and its content as active by default
    $(".informationtab:first-child").addClass("active");
    $(".information_detail_content1-info").addClass("active-info");

    // Call the adjustGreenLine function on page load to set the initial position of the green line
    adjustGreenLine();

    informationinformationtabs.on("click", function() {
      const target = $(this).data("target");
      const activeinformationtab = $(".informationtab.active");
      const targetinformationtab = $(this);
      let direction;

      if (!targetinformationtab.hasClass("active")) {
        const activeIndex = activeinformationtab.index();
        const targetIndex = targetinformationtab.index();

        if (targetIndex > activeIndex) {
          direction = "right";
        } else {
          direction = "left";
        }

        const infoDirection = direction === "right" ? "-100%" : "100%";

        activeinformationtab.removeClass("active");
        targetinformationtab.addClass("active");

        const activeInfo = $(".active-info");
        const targetInfo = $("." + target);

        activeInfo.animate({ left: infoDirection }, 100, function() {
          activeInfo.removeClass("active-info").hide();
          targetInfo.css("display", "flex").css("left", infoDirection).show().animate(
            { left: "0" },
            100,
            function() {
              targetInfo.addClass("active-info");
            }
          );
        });

        adjustGreenLine();
      }
    });

    $(window).resize(function() {
      adjustGreenLine();
      adjustGreenLine1();
    });




    $('.card-slider').slick({
    // dots: true, // Disable default pagination dots
    arrows: true,
    slidesToShow: 3,
    infinite: true,
    responsive: [
        {
        breakpoint: 1600,
        settings: {
            slidesToShow: 3,
            arrows: true,
            adaptiveHeight: true
        }
        },
        {
        breakpoint: 1280,
        settings: {
            slidesToShow: 2,
            arrows: true,
            adaptiveHeight: true
        }
        },
        {
        breakpoint: 1060,
        settings: {
            slidesToShow: 2,
            arrows: true,
            adaptiveHeight: true
        }
        },
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
            adaptiveHeight: true
        }
        },
        {
        breakpoint: 700,
        settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
            adaptiveHeight: true
        }
        }
    ]
    });


  });



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


  function copyUrl() {
        // Create a new input element
        var input = document.createElement("input");

        // Set the input element's value to the current page URL
        input.value = window.location.href;

        // Append the input element to the document
        document.body.appendChild(input);

        // Select the input element's value
        input.select();

        // Copy the selected value to the clipboard
        document.execCommand("copy");

        // Remove the input element from the document
        document.body.removeChild(input);

        // Display a confirmation message
        alert("網址已經複製");
      }

/*
     function showQRCode() {
    // Get the current URL
    var currentURL = window.location.href;

    // Generate the QR code
    var qr = new QRious({
      element: document.getElementById("qrCodeContainer"),
      value: currentURL,
      size: 128,
    });

    // Show the popup
    var popup = window.open("", "QR Code", "width=200,height=200");
    popup.document.write('<img loading="lazy" src="' + qr.toDataURL() + '">');
  }*/
function showQRCode() {
        // Get the current URL
        var currentURL = window.location.href;

        // Generate the QR code
        var qr = new QRious({
            value: currentURL,
            size: 220,
        });

        // Get the QR code container
        var qrCodeContainer = document.getElementById("qrCodeContainer");

        // Clear any existing content inside the container
        qrCodeContainer.innerHTML = '';

        // Create an image element for the QR code and set its source
        var qrImage = document.createElement("img");
        qrImage.src = qr.toDataURL();

        // Append the QR code image to the container
        qrCodeContainer.appendChild(qrImage);

        // Show the popup
        var popupContainer = document.querySelector(".popup-container");
        popupContainer.style.display = "flex";

        // Set opacity for the background
        //document.body.style.opacity = "0.5";
    }

    function closePopup() {
        // Hide the popup
        var popupContainer = document.querySelector(".popup-container");
        popupContainer.style.display = "none";

        // Restore opacity for the background
        //document.body.style.opacity = "1";
    }

  // Close the popup if clicking outside of the content
  var popupContent = document.querySelector(".popup-content");
  var popupContainer = document.querySelector(".popup-container");
  popupContainer.addEventListener("click", function(event) {
    if (!popupContent.contains(event.target)) {
      closePopup();
    }
  });

  async function downloadVideo() {
    document.querySelector(".download_btn_icon").style.display = "none"
    document.querySelector(".loader").style.display = 'block'
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = videoPlayer.querySelector("source");
    const resourceTitle = document.querySelector('.title_text_main');
    const videoURL = videoSource.src;
    const videoName = resourceTitle.innerHTML

    const response = await fetch(videoURL);
    const blob = await response.blob();

    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = videoName;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setTimeout(() => {
      document.querySelector(".download_btn_icon").style.display = "block"
      document.querySelector(".loader").style.display = 'none'
    }, 3000);
  }

