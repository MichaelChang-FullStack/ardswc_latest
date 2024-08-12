function easterEggs() {
  return `
    <div id="easter-eggs" class="modal">
      <div class="modal-content">
        <span id="modal-icon__close" class="close" style="cursor: pointer;">&times;</span>
        <div class="modal-content__logo">
          <img src="../asset/images/ardswc-logo.png"/>
        </div>
        <h3 class="modal-content__title">彩蛋任務</h3>

        <div class="modal-content_bg">
          <div class="modal-content__subtitle">
            <h5>任務完成 0 / 3</h5>
          </div>
          <div class="modal-drip__contant">

          </div>
          <img id="seater-eggs-bg-image" src="../asset/images/seasterEggs-bg.png"/>
        </div>
        <div class="modal-content__task">
          <div class="task-1">
            <h3 class="modal-content__number-1">01.</h3>
            <div class="modal-content__task-title">
              <h5 id="modal-content__task-title-h5-1">...</h5>
            </div>
            <div class="modal-task__done-1">

            </div>
          </div>
          <div class="task-2">
            <h3 class="modal-content__number-2">02.</h3>
            <div class="modal-content__task-title">
              <h5 id="modal-content__task-title-h5-2">...</h5>
            </div>
            <div class="modal-task__done-2"></div>
          </div>
          <div class="task-3">
            <h3 class="modal-content__number-3">03.</h3>
            <div class="modal-content__task-title">
              <h5 id="modal-content__task-title-h5-3">...</h5>
            </div>
            <div class="modal-task__done-3"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}
// document.getElementById("modal-easter-eggs").innerHTML = easterEggs();
// const urlParams = new URLSearchParams(window.location.search);
// const bookID = urlParams.get("bookId") || '';

const tasks = [
  {
    title: "請您透過搜尋及分類，找到水保圈圈樂網頁遊戲內容。",
    match: "GA2023083022340101",
  },
  {
    title: "請您透過搜尋及分類，找到水保季刊 創刊號進行閱覽。",
    match: "SWCB_00001",
  },
  {
    title: "請您透過搜尋及分類，找到小小故事預言家網頁遊戲進行遊玩。",
    match: "GA2023083022390001",
  },
  {
    title:
      "請您透過搜尋及分類，找到【尋保大作戰】坡地水保大富翁！影片進行觀看。",
    match: "GA2022040613312801",
  },
  {
    title: "請您透過搜尋及分類，找到山坡上的家（108課綱版）教案內容。",
    match: "IN2021110812024401",
  },
  {
    title: "請您透過搜尋及分類，找到小勇士出大任務：魔王迷宮網頁遊戲進行遊玩。",
    match: "GA2019082114274001",
  },
  {
    title: "請您透過搜尋及分類，找到水精靈，去哪兒?!(動畫版)進行閱覽。",
    match: "SWCB_00201",
  },
];

function getRandomTasks(tasks, count) {
  const shuffledTasks = [...tasks].sort(() => 0.5 - Math.random());
  return shuffledTasks.slice(0, count);
}

function setTaskTitle(selectedTasks) {
  const taskTitle1 = document.getElementById("modal-content__task-title-h5-1");
  const taskTitle2 = document.getElementById("modal-content__task-title-h5-2");
  const taskTitle3 = document.getElementById("modal-content__task-title-h5-3");

  taskTitle1.innerHTML = selectedTasks[0].title;
  taskTitle2.innerHTML = selectedTasks[1].title;
  taskTitle3.innerHTML = selectedTasks[2].title;
}

function setTask() {
  selectedTasks = getRandomTasks(tasks, 3);

  setTaskTitle(selectedTasks);

  selectedTasks.forEach((task, index) => {
    sessionStorage.setItem("match" + index, task.match);
    sessionStorage.setItem("title" + index, task.title);
  });
}

let selectedTasks = [];
let completedTasks = 0;
var modalEaster = document.getElementById("easter-eggs");
var closeIcon = document.getElementById("modal-icon__close");

$(document).ready(function () {
  document.getElementById("easter-eggs-img").style.backgroundImage =
    'url("../asset/images/task-0.svg")';
  let score = sessionStorage.getItem("score") || 0;
  document.getElementById(
    "easter-eggs-img"
  ).style.backgroundImage = `url("../asset/images/task-${score}.svg")`;
  document.querySelector(
    ".modal-content__subtitle"
  ).innerHTML = `<h5>任務完成 ${score} / 3</h5>`;
  const match0 = sessionStorage.getItem("match0") || "";
  const match1 = sessionStorage.getItem("match1") || "";
  const match2 = sessionStorage.getItem("match2") || "";
  let alreadyMatch = sessionStorage.getItem("alreadyMatch") || "";

  for (let i = 0; i < 3; i++) {
    if (
      sessionStorage.getItem("match" + i) === bookID &&
      !alreadyMatch.split(",").includes(bookID)
    ) {
      document.getElementById(
        "easter-eggs-img"
      ).style.backgroundImage = `url("../asset/images/task-${score}-new.svg")`;
      break;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (sessionStorage.getItem(`match${i}`) !== null) {
      if (
        alreadyMatch.split(",").includes(sessionStorage.getItem(`match${i}`))
      ) {
        document.querySelector(`.modal-task__done-${i + 1}`).innerHTML = `
        <div class="task-done__container">
          <div class="task-done-image"></div>
        </div>`;
      }
    }
  }

  if (match0 === "" || match1 === "" || match2 === "") {
    setTask();
  } else {
    const title0 = sessionStorage.getItem("title0") || "";
    const title1 = sessionStorage.getItem("title1") || "";
    const title2 = sessionStorage.getItem("title2") || "";
    setTaskTitle([{ title: title0 }, { title: title1 }, { title: title2 }]);
  }
});

function openEasterEggsModal() {
  let score = sessionStorage.getItem("score") || 0;
  let alreadyMatch = sessionStorage.getItem("alreadyMatch") || "";

  for (let i = 0; i < 3; i++) {
    if (
      sessionStorage.getItem("match" + i) === bookID &&
      !alreadyMatch.split(",").includes(bookID)
    ) {
      if (score === 3) return;
      score++;
      sessionStorage.setItem("score", score);
      document.querySelector(
        ".modal-content__subtitle"
      ).innerHTML = `<h5>任務完成 ${score} / 3</h5>`;
      document.getElementById(
        "easter-eggs-img"
      ).style.backgroundImage = `url("../asset/images/task-${score}.svg")`;
      sessionStorage.setItem("alreadyMatch", bookID + "," + alreadyMatch);
      document.querySelector(
        ".modal-drip__contant"
      ).innerHTML = `<img src="../asset/images/drip.gif"/>`;
      document.querySelector(`.modal-task__done-${i + 1}`).innerHTML = `
        <div class="task-done__container">
          <div class="task-done-image__active"></div>
        </div>`;
      break;
    }
  }
  if (score === 3) {
    document.getElementById("easter-eggs-link").style.opacity = 1;
    document.getElementById("easter-eggs-link").href =
      "https://user197747.pse.is/easteregg";
    document.getElementById("easter-eggs-link").target = "_blank";
  }

  document.body.style.overflow = "hidden";
  modalEaster.style.display = "block";
}

window.onclick = function (event) {
  if (event.target == modalEaster) {
    modalEaster.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

// closeIcon.onclick = function () {
//   modalEaster.style.display = "none";
//   document.body.style.overflow = "auto";
// };
