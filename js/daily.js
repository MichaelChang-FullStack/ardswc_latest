jQuery($ => {
    if (localStorage.getItem('MNo') && localStorage.getItem('dailyFn')) {
        const urlParams = new URLSearchParams(location.search);

        const dailyFn = JSON.parse(localStorage.getItem('dailyFn'));

        const countdown = {
            'push': 120000,
            'picbook': 120000,
            'video': 60000,
            'game': 120000,
            'plan': 100,
        };

        const eventBind = {
            book: ['.main_container_part4_child3_subchild3', '.book-container'],
            video: ['.main_container', '#resource-video'],
            game: ['.game_container', '.game_carousel-cell a'],
            plan: ['.main_container_part4', '#download-resource,#resource-download'],
        }

        const dailyDatas = {
            backPause: false,
            timeoutSet: false,
            taskName: '',
            currentTarget: null,
            beforeUnloadHandler(event){
                if(this.currentTarget === event.currentTarget){
                    // 
                }else{
                    event.preventDefault();
                    event.returnValue = true;

                    $('.daily-note').removeClass('hidden');
                    this.currentTarget = event.currentTarget;
                }
            },
            pauseDialog(){
                $('body').append(`
                <div class="daily-note hidden" x-data x-cloak>
                    <div class="content-wrap">
                        <div class="note-content">
                            <h2>每日任務 規則說明</h2>
                            <p>每日任務計時中，現在關閉頁面將無法完成任務</p>
                        </div>
                        <div class="close-button" @click="$root.classList.add('hidden')">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 8.05635L0.414214 14.1421L1.82843 15.5564L7.91421 9.47056L14.1421 15.6985L15.5563 14.2843L9.32843 8.05635L15.9706 1.41421L14.5563 0L7.91421 6.64214L1.41421 0.142138L0 1.55635L6.5 8.05635Z" fill="black"/>
                            </svg>                
                        </div>
                    </div>
                    <div class="bg-cover" @click="$root.classList.add('hidden')"></div>
                </div>
                `);
                this.backPause = true;
            },
            myFetch(apiUrl, options, resolve) {
                fetch(apiUrl, options)
                  .then((res) => {
                    const contentType = res.headers.get("content-type");
                    if (!contentType || !contentType.includes("application/json")) {
                      console.log("非 JSON 格式資料");
                      res = res.text();
                    } else {
                      res = res.json();
                    }
                    return res;
                  })
                  .then(resolve)
                  .catch((e) => console.log(e));
            },
            completeTask(){
                const requestBody = {
                    MNo: localStorage.getItem('MNo'),
                    Task: this.taskName,
                };

                const apiUrl = '/server/routes.php?action=daily';

                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }).then(res => {
                    const contentType = res.headers.get('content-type');
                    if (!contentType || !contentType.includes('application/json')) {
                        res = res.text();
                    } else {
                        res = res.json();
                    }
                    return res;
                })
                .then(data => {
                    if ('done!' === data) {
                        $('body').append(`
                        <div class="daily" x-data>
                        <div class="layer" @click="$root.classList.add('hidden')"></div>
                        <div class="wrap">
                            <img src="../asset/images/Advanced_Filter_Books_Introduction/completed.png" />
                            <p>恭喜你完成任務<br>
                            獲得積分<strong>5點</strong></p>
                            <button type="button" @click="$root.classList.add('hidden')">確定</button>
                        </div>
                        </div>`);
                        // document.querySelector('.daily').classList.remove('hidden');
                    }
                    // console.log(data);
                    this.endTaskCounter();
                })
                .catch(e => console.log(e));
            },
            startTaskCounter(){
                if(!this.backPause){
                    history.pushState(null, null);
                    // window.addEventListener("beforeunload", this.beforeUnloadHandler);
                    window.addEventListener("popstate", this.beforeUnloadHandler);
                    document.querySelectorAll('a').forEach(ele => ele.addEventListener('click', this.beforeUnloadHandler));
                    this.pauseDialog();
                }
            },
            endTaskCounter(){
                // window.removeEventListener("beforeunload", this.beforeUnloadHandler);
                window.removeEventListener("popstate", this.beforeUnloadHandler);
                document.querySelectorAll('a').forEach(ele => ele.removeEventListener('click', this.beforeUnloadHandler));
                $('.daily-note').addClass('hidden');
            },
        };

        dailyDatas.taskName = dailyFn.name;

        let pageName = '';

        switch(location.pathname.split('/')[location.pathname.split('/').length-1]){
            case 'Advanced_Filter_Books_Introduction.html':
                pageName = 'book';
                break;
            case 'Advanced_Screening_Teaching_Plan_Introduction.html':
                pageName = 'plan';
                break;
            case 'Advanced_Filter_Video.html':
                pageName = 'video';
                break;
            case 'Advanced_Filter_Games.html':
                pageName = 'game';
                break;

        }

        switch (dailyFn.name) {
            case 'picbook':
            case 'push':
            case 'video':
            case 'game':
            case 'plan':
                if (urlParams.get('bookId') == dailyFn.bookId) {
                    // console.log(eventBind[dailyFn.name][0], eventBind[dailyFn.name][1])
                    const apiUrl = '/server/routes.php?action=daily&MNo=' + localStorage.getItem('MNo');
                    dailyDatas.myFetch(
                        apiUrl,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        },
                        completedTasks => {
                            if(completedTasks.includes(dailyFn.name)){
                                // console.log('already done!');
                            }else{
                                // console.log(dailyFn);
                                const storedDate = new Date(dailyFn.time);
                                if (new Date().toISOString().split('T')[0] == storedDate.toISOString().split('T')[0]) {
                                    if('video' === pageName){
                                        var target = document.querySelector(`${eventBind[pageName][0]} ${eventBind[pageName][1]}`);

                                        // create an observer instance
                                        var observer = new MutationObserver(function (mutations) {
                                            mutations.forEach(function (mutation) {
                                                // console.log(mutation)
                                                if(mutation.addedNodes){
                                                    mutation.addedNodes.forEach(v => {
                                                        if('#text' !== v.nodeName.toLowerCase()){
                                                            const ve = v.querySelector('video');
                                                            if('video' === v.nodeName.toLowerCase() || ve){
                                                                if(ve){
                                                                    v = ve;
                                                                }
                                                                v.addEventListener('play', () => {
                                                                    dailyDatas.startTaskCounter();
                                                                });
                                                                v.addEventListener('ended', () => {
                                                                    dailyDatas.completeTask();
                                                                    dailyDatas.endTaskCounter();
                                                                });
                                                                observer.disconnect();
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        });
                            
                                        var config = { attributes: true, childList: true, characterData: true };
                            
                                        observer.observe(target, config);
                                    }else{
                                        const parentSelector = eventBind[pageName][0];
                                        const childSelector = 'plan' === dailyFn.name ? '#resource-download' : eventBind[pageName][1];
                                        // console.log(parentSelector, childSelector)
                                        $(parentSelector).on('click', childSelector, e => {
                                            dailyDatas.startTaskCounter();

                                            if(false === dailyDatas.timeoutSet){
                                                setTimeout(function () {
                                                    dailyDatas.completeTask();
                                                    dailyDatas.endTaskCounter();
                                                }, countdown[dailyFn.name]);

                                                dailyDatas.timeoutSet = true;
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    )
                }
                break;
        }
    }
});