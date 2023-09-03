function ADFilter() {
    return `
    <div id="ad-filter" class="modal">
      <div class="modal-content">
        <span class="close" style="cursor: pointer;">&times;</span>
        <h3>選擇遊戲</h3>
        <hr />
        <div id="game-container">

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

  document.getElementById("game-modal").innerHTML = ADFilter();


  var modal = document.getElementById("ad-filter");

  function openPromotionalGameModal() {
    document.body.style.overflow = "hidden";
    modal.style.display = "block";
  }


  window.onclick = function(event) {
    if (event.target == modal) {
      document.body.style.overflow = "auto";
      modal.style.display = "none";
    }
  }


  $(document).ready(async function() {
    openPromotionalGameModal();
    const game1 = await getResourceDetail('GA2021111010520201');
    const game2 = await getResourceDetail('GA2021101309592101');
    const game3 = await getResourceDetail('GA2020100818260001');
    console.log(game1)

    $("#game-container").append(`
      <div class="game1">
        <a href="/pages/Advanced_Filter_Games.html?bookId=GA2021111010520201">
          <div class="img-container">
            <img loading="lazy" src="${getImagePath(game1.IM_FILE, game1.BT_Name)}"/>
          </div>
          <h4>${game1.title}</h4>
        </a
      </div>
    `)

    $("#game-container").append(`
      <div class="game2">
        <a href="/pages/Advanced_Filter_Games.html?bookId=GA2021101309592101">
        <div class="img-container">

          <img loading="lazy" src="${getImagePath(game2.IM_FILE, game2.BT_Name)}"/>
          </div>
          <h4>${game2.title}</h4>
        </a
      </div>
    `)

  $("#game-container").append(`
    <div class="game3">
      <a href="/pages/Advanced_Filter_Games.html?bookId=GA2020100818260001">
      <div class="img-container">

        <img loading="lazy" src="${getImagePath(game3.IM_FILE, game3.BT_Name)}"/>
        </div>
        <h4>${game3.title}</h4>
      </a
    </div>
  `)




    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }


    const allCheckboxs = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxs.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        checkAllSelect();
      })
    })

  })
