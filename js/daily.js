document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('dailyFn')) {

        console.log(111);
        const urlParams = new URLSearchParams(location.search);

        let dailyFn = JSON.parse(localStorage.getItem('dailyFn'));

        const countdown = {
            'push': 120000,
            'picbook': 120000,
            'video': 60000,
            'game': 120000,
        };

        const eventBind = {
            picbook: ['#resource-img', '.book-container'],
            push: ['#resource-img', '.book-container'],
            video: ['#resource-video', 'video'],
            game: ['.game_container', '.game_carousel-cell a'],
        }

        switch (dailyFn.name) {
            case 'picbook':
            case 'push':
            case 'video':
            case 'game':
                if (urlParams.get('bookId') == dailyFn.bookId) {
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
                                            document.querySelector('.daily').classList.remove('hidden');
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