document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('MNo')) {
        const urlParams = new URLSearchParams(location.search);

        const AchievementDatas = {
            counterStarted: false,
            progressed: false,
            act: '',
            achievementName: '',
            isProgressed(){
                if(this.act){
                    const query = {
                        action: 'achievements',
                        MNo: localStorage.getItem('MNo'),
                    };
                    const apiUrl = '/server/routes.php?' + (new URLSearchParams(query).toString());

                    fetch(apiUrl, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then(res => {
                        const contentType = res.headers.get('content-type');
                        if (!contentType || !contentType.includes('application/json')) {
                            res = res.text();
                        } else {
                            res = res.json();
                        }
                        return res;
                    }).then(data => {
                        if(data){
                            if(data[this.act].includes(urlParams.get('bookId'))){
                                this.addHint();
                            }
                        }
                    });
                }
            },
            addHint(){
                let hint = '';
                switch(this.achievementName){
                    case 'book':
                        hint = '此本書已經獲得成就點數';
                        break;
                    case 'plan':
                        hint = '此教案已經獲得成就點數';
                        break;
                    case 'video':
                        hint = '此影片已經獲得成就點數';
                        break;
                    case 'game':
                        hint = '此遊戲已經獲得成就點數';
                        break;
                }
                $('.title_text_main').after(`<div class="achievement-hint" style="text-align:right;font-size:.8em;color:#aaa;letter-spacing:.2em">${hint}</div>`);
            },
            complete(act){
                const requestBody = {
                    MNo: localStorage.getItem('MNo'),
                    bookId: urlParams.get('bookId'),
                    Achievement: act,
                };

                const apiUrl = '/server/routes.php?action=achievements';

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
                        // 
                    }
                    // console.log(data);
                })
                .catch(e => console.log(e));
            }
        };

        let achievementName = '';
        let act = '';

        switch(location.pathname.split('/')[location.pathname.split('/').length-1]){
            case 'Advanced_Filter_Books_Introduction.html':
                achievementName = 'book';
                act = 'book';
                break;
            case 'Advanced_Screening_Teaching_Plan_Introduction.html':
                achievementName = 'plan';
                act = 'knowledge';
                break;
            case 'Advanced_Filter_Video.html':
                achievementName = 'video';
                act = 'knowledge';
                break;
            case 'Advanced_Filter_Games.html':
                achievementName = 'game';
                act = 'gamer';
                break;

        }
        AchievementDatas.act = act;
        AchievementDatas.achievementName = achievementName;
        AchievementDatas.isProgressed();

        const countdown = {
            'book': 120000,
            'video': 60000,
            'game': 120000,
            'plan': 10,
        };

        const eventBind = {
            book: ['#resource-img', '.book-container'],
            video: ['.main_container', '#resource-video'],
            game: ['.game_container', '.game_carousel-cell a'],
            plan: ['.main_container_part4_child3_subchild4', '#download-resource'],
        }

        switch(achievementName){
            case 'video':
                var target = document.querySelector(`${eventBind[achievementName][0]} ${eventBind[achievementName][1]}`);

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
                                        v.addEventListener('ended', () => {
                                            AchievementDatas.complete(act);
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
                break;
            case 'book':
            case 'game':
            case 'plan':
                $(eventBind[achievementName][0]).on('click', eventBind[achievementName][1], e => {
                    if(!AchievementDatas.counterStarted){
                        setTimeout(function () {
                            AchievementDatas.complete(act);
                        }, countdown[achievementName]);

                        AchievementDatas.counterStarted = true;
                    }
                });
                break;
        }
    }
});