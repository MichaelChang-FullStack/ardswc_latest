document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('MNo')) {
        const urlParams = new URLSearchParams(location.search);

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

        const countdown = {
            'book': 120000,
            'video': 60000,
            'game': 120000,
            'plan': 120000,
        };

        const eventBind = {
            book: ['#resource-img', '.book-container'],
            video: ['#resource-video', 'video'],
            game: ['.game_container', '.game_carousel-cell a'],
            plan: ['.main_container_part4_child3_subchild4', '#download-resource'],
        }

        $(eventBind[achievementName][0]).on('click', eventBind[achievementName][1], e => {
            setTimeout(function () {
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
            }, countdown[achievementName]);
        });
    }
});