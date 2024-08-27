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
            picbook: ['#resource-img', '.book-container'],
            push: ['#resource-img', '.book-container'],
            video: ['.main_container', '#resource-video'],
            game: ['.game_container', '.game_carousel-cell a'],
            plan: ['.main_container_part4_child3_subchild4', '#download-resource'],
        }

        switch (dailyFn.name) {
            case 'picbook':
            case 'push':
            case 'video':
            case 'game':
            case 'plan':
                if (urlParams.get('bookId') == dailyFn.bookId) {
                    // console.log(eventBind[dailyFn.name][0], eventBind[dailyFn.name][1])
                    $(eventBind[dailyFn.name][0]).on('click', eventBind[dailyFn.name][1], e => {
                        const storedDate = new Date(dailyFn.time);
                        if (new Date().toISOString().split('T')[0] == storedDate.toISOString().split('T')[0]) {
                            setTimeout(function () {
                                const requestBody = {
                                    MNo: localStorage.getItem('MNo'),
                                    Task: dailyFn.name,
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
                                    })
                                    .catch(e => console.log(e));
                            }, countdown[dailyFn.name]);
                        }
                    });
                }
                break;
        }
    }
});