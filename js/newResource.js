async function getNewResource() {
  var apiUrl = '/server/newResource.php';
  try {
    var response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error('網路請求失敗: ' + response.status);
    }
    const data = await response.json();
    return data.map((d) => toResource(d));
  } catch (error) {
    console.error(error)
  }
}
$(document).ready(async function () {
  const resources = await getNewResource();

  let cardInd = 0;
  resources.forEach(resource => {
    const { title, BT_Name, type, target, tags, imageFileName, BookID } = resource;
    const image = getImagePath(imageFileName, BT_Name)
    const tagElement = tags.map((tag) => {
      return `
              <div class="frequest_search1">
                <span>${tag}</span>
              </div>
            `
    }).join(" ");
    $("#new-resource").append(
      `
        <div class="card">
          <div class="mainbookinfo">
            <div class="mainbookinfo_part1">
              <div class="mainbookinfo_part11"><span>${type ?? '教案'}</span></div>
              <div class="mainbookinfo_part12"><img ${cardInd++>0?'loading="lazy"':''} src="${image}" onError="this.onerror=null; this.src='./asset/images/search-result-default-img.png';" alt="${title}"></div>
            </div>
            <div class="mainbookinfo_part2">
              <div class="mainbookinfo_part21">
                  <h4>${title}</h4>
              </div>
              <div class="mainbookinfo_part22">
                ${tagElement}
              </div>
              <div class="mainbookinfo_part23">
                  <div class="">
                      <img loading="lazy" src="asset/images/Teacher_Edition_Home/icon_user.svg" alt="icon_user">
                  </div>
                  <div class="mainbookinfo_part23_2">
                      <span>${target}</span>
                  </div>
              </div>
            </div>
          </div>
          <a class="resource-detail" name="${title}" href="${getDetailLink(resource)}" title="${title}"></a>
        </div>
      `
    )
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
        breakpoint: 1430,
        settings: {
          slidesToShow: 3,
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
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          adaptiveHeight: true
        }
      },
      {
        breakpoint: 385,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
          adaptiveHeight: true
        }
      }
    ]
  });
})
