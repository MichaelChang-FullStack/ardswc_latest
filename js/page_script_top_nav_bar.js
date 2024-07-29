const teacherMenu = `
<div class="main_container_part1">
    <div class="main_container_part1_child1">
        <a  href="/" class="main_container_part1_child1_sub1">
            <img loading="lazy" src="../asset/images/logo_main11.svg" alt="logo">
        </a>
    </div>
    <div class="main_container_part1_child2">
        <div class="main_container_part1_child2_sub1">
            <img loading="lazy" src="../asset/images/Top_ass_icon.png" alt="Top_ass_icon">
        </div>
        <div class="main_container_part1_child2_sub2" id="main_container">
            <div class="search-container valid">
                <label id="main-input-label" for="main-input" class="sr-only">關鍵字搜尋：</label>
                <input type="text" class="input_search" id="nav-search-0" aria-labelledby="main-input-label" placeholder="輸入關鍵字..." required>
                <div id="main-input-description" class="sr-only">請在此輸入您想搜尋的關鍵字。</div>
                <div class="search-img" tabindex="1" onclick="topNavigateToSearchResult(0)">
                    <div class="search-img_part1">
                        <img loading="lazy" src="../asset/images/icon_search.svg" alt="Search" class="search-icon">
                    </div>
                    <div class="search-img_part2">
                        <span class="search_text">搜尋</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="main_container_part1_child2_sub3">
            <a id="loggedInContent" class="btn-14" onclick="redirectToLogin()" tabindex="2" ><span>登入</span></a>
            <a id="loggedOutContent" class="btn-14" onclick="logout()" tabindex="2" ><span>登出</span></a>
        </div>
        <div class="menu-btn">
            <div class="menu-btn__lines"></div>
        </div>
    </div>
</div>
<div class="main_container_part2">
    <header class="navbar sticky">
        <ul class="menu-items">
            <div class="nav_mobile_part1">
                <div class="nav_mobile_close_btn">
                    <img loading="lazy" src="../asset/images/menu_mobile_active.svg" alt="menu_mobile_active">
                </div>
            </div>
            <div class="nav_mobile_part2">
                <div class="search-container valid">
                    <label id="main-input-label" for="main-input" class="sr-only">關鍵字搜尋：</label>
                    <input type="text" class="input_search" id="nav-search-1" aria-labelledby="main-input-label" placeholder="輸入關鍵字..." required>
                    <div id="main-input-description" class="sr-only">請在此輸入您想搜尋的關鍵字。</div>
                    <div class="search-img" onclick="topNavigateToSearchResult(1)">
                        <div class="search-img_part1">
                            <img loading="lazy" src="../asset/images/icon_search.svg" alt="Search" class="search-icon">
                        </div>
                        <div class="search-img_part2">
                            <span class="search_text">搜尋</span>
                        </div>
                    </div>
                </div>
            </div>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item expand-btn" tabindex="4">水保教室</h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1">
                        <hr class="menu-itemhr-line1">
                    </div>
                    <div class="menu-itemhr-part2">
                        <hr class="menu-itemhr-line2">
                    </div>
                </div>
                <ul class="dropdown-menu sample">
                    <li><a href="/pages/Search_Result.html?filterId=2,55,56,57,58,59" class="menu-item">圖書</a></li>
                    <li><a href="/pages/Search_Result.html?filterId=3,55,56,57,58,59" class="menu-item">教材</a></li>
                    <li><a href="/pages/Search_Result.html?filterId=4,55,56,57,58,59" class="menu-item">教案</a></li>
                    <li><a href="/pages/Search_Result.html?filterId=5,55,56,57,58,59" class="menu-item">影片</a></li>
                </ul>
            </li>
            <li class="nav_partition">
                <hr class="partition_strip">
            </li>
            <li class="dropdown">
                <h4 class="menu-item first-item expand-btn " tabindex="3" >玩轉水保</h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1">
                        <hr class="menu-itemhr-line1">
                    </div>
                    <div class="menu-itemhr-part2">
                        <hr class="menu-itemhr-line2">
                    </div>
                </div>
                <ul class="dropdown-menu sample">
                    <li><a href="/pages/Search_Result.html?filterId=14,80,15,16" class="menu-item">互動遊戲</a></li>
                    <li><a href="/pages/Search_Result.html?filterId=11,12" class="menu-item">繪本圖書館</a></li>
                    <li><a href="/pages/Search_Result.html?filterId=24,25,26,27,28,29,30,31" class="menu-item">水保電影院</a></li>
                </ul>
            </li>
            <li class="nav_partition">
                <hr class="partition_strip">
            </li>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item expand-btn" tabindex="5">知識寶庫</h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1">
                        <hr class="menu-itemhr-line1">
                    </div>
                    <div class="menu-itemhr-part2">
                        <hr class="menu-itemhr-line2">
                    </div>
                </div>
                <ul class="dropdown-menu sample">
                    <li><a href="/pages/Search_Result.html?filterId=6,7,8,9,10,13" class="menu-item">水保知識學</a></li>
                    <li><a href="/pages/Search_Result.html?filterId=17,18,19,20" class="menu-item">教學助手</a></li>
                </ul>
            </li>
            <li class="nav_partition">
                <hr class="partition_strip">
            </li>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item expand-btn" tabindex="6">活動競賽場</h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1">
                        <hr class="menu-itemhr-line1">
                    </div>
                    <div class="menu-itemhr-part2">
                        <hr class="menu-itemhr-line2">
                    </div>
                </div>
                <ul class="dropdown-menu sample" id="menu4">
                    <li><a href="/pages/Event_Arena_Event_Information.html" class="menu-item">活動訊息</a></li>
                    <li><a href="/pages/Event_Arena_Event_Photos.html" class="menu-item">活動照片</a></li>
                </ul>
            </li>
            <li class="nav_partition">
                <hr class="partition_strip">
            </li>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item expand-btn" tabindex="7">戶外教學趣</h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1">
                        <hr class="menu-itemhr-line1">
                    </div>
                    <div class="menu-itemhr-part2">
                        <hr class="menu-itemhr-line2">
                    </div>
                </div>
                <ul class="dropdown-menu sample" id="menu5">
                    <li><a href="/pages/Fun_Outdoor_Teaching_Classroom_Map.html" class="menu-item">教室地圖</a></li>
                    <li><a href="https://www.ardswc.gov.tw/Home/Apply/" class="menu-item">教室申請</a></li>
                    <li><a href="/pages/Classroom_Application_Results.html" class="menu-item">教室申請結果</a></li>
                </ul>
            </li>
            <li class="nav_partition">
                <hr class="partition_strip">
            </li>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item expand-btn" tabindex="8">酷學校</h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1">
                        <hr class="menu-itemhr-line1">
                    </div>
                    <div class="menu-itemhr-part2">
                        <hr class="menu-itemhr-line2">
                    </div>
                </div>
                <ul class="dropdown-menu sample" id="menu6">
                    <li><a href="/pages/Fun_Indoor_Teaching_Classroom_Map.html" class="menu-item">酷學校地圖</a></li>
                    <li><a href="/pages/Cool_School_Family.html" class="menu-item">家族查詢</a></li>
                    <li><a href="/pages/cool_school.html" class="menu-item">積分排名</a></li>
                </ul>
            </li>
            <li class="nav_partition">
                <hr class="partition_strip">
            </li>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item" tabindex="8"><a href="/pages/latest_news.html">最新消息</a></h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1">
                        <hr class="menu-itemhr-line1">
                    </div>
                    <div class="menu-itemhr-part2">
                        <hr class="menu-itemhr-line2">
                    </div>
                </div>
            </li>
        </ul>
    </header>
    <div class="overlay"></div>
    <div class="nav_mobile_part3">
        <div class="search-container1 valid">
            <label id="main-input-label" for="main-input" class="sr-only">關鍵字搜尋：</label>
            <input type="text" class="input_search" id="nav-search-2" aria-labelledby="main-input-label" placeholder="輸入關鍵字..." required>
            <div id="main-input-description" class="sr-only">請在此輸入您想搜尋的關鍵字。</div>
            <div class="search-img" onclick="topNavigateToSearchResult(2)">
                <div class="search-img_part1">
                    <img loading="lazy" src="../asset/images/icon_search.svg" alt="Search" class="search-icon">
                </div>
                <div class="search-img_part2">
                    <span class="search_text">搜尋</span>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const promotionalMenu = `
<div class="main_container_part1">
    <div class="main_container_part1_child1">
        <a href="../promotional.html" class="main_container_part1_child1_sub1">
            <img loading="lazy" src="../asset/images/logo02.svg" alt="logo">
        </a>
    </div>
    <div class="main_container_part1_child2">
        <div class="main_container_part1_child2_sub1">
            <img loading="lazy" src="../asset/images/Top_ass_icon.png" alt="Top_ass_icon">
        </div>
        <div class="main_container_part1_child2_sub2" id="main_container">
            <div class="search-container valid" onclick="expandContainer()">
                <label id="main-input-label" for="main-input" class="sr-only">關鍵字搜尋：</label>
                <input type="text" class="input_search" id="nav-search-0" aria-labelledby="main-input-label" placeholder="輸入關鍵字..." required>
                <div id="main-input-description" class="sr-only">請在此輸入您想搜尋的關鍵字。</div>
                <div class="search-img" tabindex="1" onclick="topNavigateToSearchResult(0)">
                    <div class="search-img_part1">
                        <img loading="lazy" src="../asset/images/icon_search.svg" alt="Search" class="search-icon">
                    </div>
                    <div class="search-img_part2">
                        <span class="search_text">搜尋</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="main_container_part1_child2_sub3">
            <a id="loggedInContent" class="btn-14" onclick="redirectToLogin()" tabindex="2" ><span>登入</span></a>
            <a id="loggedOutContent" class="btn-14" onclick="logout()" tabindex="2" ><span>登出</span></a>
        </div>        
        <div class="menu-btn">
            <div class="menu-btn__lines"></div>
        </div>
    </div>
</div>
<div class="main_container_part2">
    <header class="navbar sticky">
        <ul class="menu-items">
            <div class="nav_mobile_part1">
                <div class="nav_mobile_close_btn">
                    <img loading="lazy" src="../asset/images/menu_mobile_active.svg" alt="menu_mobile_active">
                </div>
            </div>
            <div class="nav_mobile_part2">
                <div class="search-container valid">
                    <label id="main-input-label" for="main-input" class="sr-only">關鍵字搜尋：</label>
                    <input type="text" class="input_search" id="nav-search-1" aria-labelledby="main-input-label" placeholder="輸入關鍵字..." required>
                    <div id="main-input-description" class="sr-only">請在此輸入您想搜尋的關鍵字。</div>
                    <div class="search-img" onclick="topNavigateToSearchResult(1)">
                        <div class="search-img_part1">
                            <img loading="lazy" src="../asset/images/icon_search.svg" alt="Search" class="search-icon">
                        </div>
                        <div class="search-img_part2">
                            <span class="search_text">搜尋</span>
                        </div>
                    </div>
                </div>
            </div>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item expand-btn" tabindex="6">活動競賽場</h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div>
                    <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div>
                </div>
                <ul class="dropdown-menu sample" id="menu4" >
                    <li><a href="/pages/Event_Arena_Event_Information.html" class="menu-item">活動訊息</a></li>
                    <li><a href="/pages/Event_Arena_Event_Photos.html" class="menu-item">活動照片</a></li>
                </ul>
            </li>
            <li class="nav_partition"><hr class="partition_strip"></hr></li>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item expand-btn" tabindex="7">戶外教學趣</h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div>
                    <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div>
                </div>
                <ul class="dropdown-menu sample" id="menu5" >
                    <li><a href="/pages/Fun_Outdoor_Teaching_Classroom_Map.html" class="menu-item">教室地圖</a></li>
                    <li><a href="https://www.ardswc.gov.tw/Home/Apply/" class="menu-item">教室申請</a></li>
                    <li><a href="/pages/Classroom_Application_Results.html" class="menu-item">教室申請結果</a></li>
                </ul>
            </li>
            <li class="nav_partition"><hr class="partition_strip"></hr></li>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item expand-btn" tabindex="8">酷學校</h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div>
                    <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div>
                </div>
                <ul class="dropdown-menu sample" id="menu6" >
                    <li><a href="/pages/Fun_Indoor_Teaching_Classroom_Map.html" class="menu-item">酷學校地圖</a></li>
                    <li><a href="/pages/Cool_School_Family.html" class="menu-item">家族查詢</a></li>
                    <li><a href="/pages/cool_school.html" class="menu-item">積分排名</a></li>
                </ul>
            </li>
            <li class="nav_partition"><hr class="partition_strip"></hr></li>
            <li class="dropdown">
                <h4 href="#" class="menu-item first-item" tabindex="8"><a href="/pages/latest_news.html">最新消息</a></h4>
                <div class="menu-itemhr">
                    <div class="menu-itemhr-part1"><hr class="menu-itemhr-line1"></div>
                    <div class="menu-itemhr-part2"><hr class="menu-itemhr-line2"></div>
                </div>
            </li>
        </ul>
    </header>
    <div class="overlay"></div>
    <div class="nav_mobile_part3">
        <div class="search-container1 valid">
            <label id="main-input-label" for="main-input" class="sr-only">關鍵字搜尋：</label>
            <input type="text" class="input_search" id="nav-search-2" aria-labelledby="main-input-label" placeholder="輸入關鍵字..." required>
            <div id="main-input-description" class="sr-only">請在此輸入您想搜尋的關鍵字。</div>
            <div class="search-img" onclick="topNavigateToSearchResult(2)">
                <div class="search-img_part1">
                    <img loading="lazy" src="../asset/images/icon_search.svg" alt="Search" class="search-icon">
                </div>
                <div class="search-img_part2">
                    <span class="search_text">搜尋</span>
                </div>
            </div>
        </div>
    </div>
</div>

`;

function changeMainPage(params) {
    localStorage.setItem("pageVersion", params);
    switch (params) {
        case 'teach':
            window.location.href = '/'
            break;
        case 'promo':
            window.location.href = '/promotional.html'
            break;
        default:
            break;
    }
}

function topNavigateToSearchResult(id) {
    const inputVlue = document.getElementById(`nav-search-${id}`).value;
    if (!inputVlue) {
        alert("請輸入關鍵字");
        return;
    } else {
        window.location.href = "/pages/Search_Result.html?searchText=" + inputVlue;
    }
}

$(function () {
    (async function () {
        try {
            const pageVersion = localStorage.getItem("pageVersion");

            const menu = !pageVersion || pageVersion === 'teach' ? teacherMenu : promotionalMenu;
            $("#main_container_top_nav_bar").append(menu);

            checkLoginStatus();

            const searchContainer = document.querySelector(".search-container");
            searchContainer.addEventListener("change", function () {
                if (this.querySelector("#input_search").validity.valid) {
                    this.classList.add("valid");
                    document.querySelector(
                        ".main_container_part1_child2_sub2"
                    ).style.width = "50%";
                    //document.querySelector(".main_container_part1_child2_sub2").style["max-width"] = "554px";

                    console.log("50%");
                } else {
                    this.classList.remove("valid");
                    document.querySelector(
                        ".main_container_part1_child2_sub2"
                    ).style.width = "auto";
                }
            });

            /* JS Nav Bar Start*/
            const overlay = document.querySelector(".overlay");
            const body = document.querySelector("body");
            const menuBtn = document.querySelector(".menu-btn");
            const menuItems = document.querySelector(".menu-items");
            const expandBtn = document.querySelectorAll(".expand-btn");

            const menuCloseBtn = document.querySelector(".nav_mobile_close_btn");

            function toggle() {
                // disable overflow body
                body.classList.toggle("overflow");
                // dark background
                overlay.classList.toggle("overlay--active");
                // add open class
                menuBtn.classList.toggle("open");
                menuItems.classList.toggle("open");
            }

            menuBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                toggle();
            });

            menuCloseBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                toggle();
            });

            window.onkeydown = function (event) {
                const key = event.key; // const {key} = event; in ES6+
                const active = menuItems.classList.contains("open");
                if (key === "Escape" && active) {
                    toggle();
                }
            };

            document.addEventListener("click", (e) => {
                let target = e.target,
                    its_menu = target === menuItems || menuItems.contains(target),
                    its_hamburger = target === menuBtn,
                    menu_is_active = menuItems.classList.contains("open");
                if (!its_menu && !its_hamburger && menu_is_active) {
                    toggle();
                }
            });

            // mobile menu expand
            expandBtn.forEach((btn) => {
                btn.addEventListener("click", () => {
                    btn.classList.toggle("open");
                });
            });
        } catch (error) {
            console.log(error);
        }
    })();
});

function expandContainer() {
    document.getElementById("main_container").style.width = "50%";
    document.querySelector(".search-container").classList.add("valid");
    document.getElementById("input_search").focus();
}

function shrinkContainer() {
    document.getElementById("main_container").style.width = "auto";
}


function redirectToLogin() {
    const currentOrigin = window.location.origin;

    const loginPath = '/pages/login.html';

    const loginUrl = new URL(loginPath, currentOrigin);

    window.location.href = loginUrl.href;
}


function checkLoginStatus() {
    const MNo = localStorage.getItem("MNo");
    console.log("會員編號:", MNo);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("登入狀態:", isLoggedIn);

    const loginButton = document.getElementById("loggedInContent");
    const logoutButton = document.getElementById("loggedOutContent");

    if (loginButton && logoutButton) {
        if (isLoggedIn) {
            loginButton.style.display = "none";
            logoutButton.style.display = "block";
            console.log("顯示登出按鈕");
        } else {
            loginButton.style.display = "block";
            logoutButton.style.display = "none";
            console.log("顯示登入按鈕");
        }
    } else {
        console.error("無法找到登入或登出按鈕");
    }
}

function login(MNo) {
    // 執行登入邏輯...
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("MNo", MNo);
    checkLoginStatus();
    redirectToUser();
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("MNo");
    checkLoginStatus();
    document.getElementById('status').innerHTML = '已登出';
}