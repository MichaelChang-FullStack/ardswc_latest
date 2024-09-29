document.addEventListener("DOMContentLoaded", () => {
    $(".rating").rating({
        step: 0.5,
        showCaption: false,
        showClear: false,
        hoverChangeCaption: false,
        emptyStar: `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.51332 18.8039C4.03082 19.0514 3.48332 18.6176 3.58082 18.0639L4.61832 12.1514L0.214567 7.95639C-0.196683 7.56389 0.0170668 6.84639 0.568317 6.76889L6.69082 5.89889L9.42082 0.490137C9.66707 0.00263672 10.3333 0.00263672 10.5796 0.490137L13.3096 5.89889L19.4321 6.76889C19.9833 6.84639 20.1971 7.56389 19.7846 7.95639L15.3821 12.1514L16.4196 18.0639C16.5171 18.6176 15.9696 19.0514 15.4871 18.8039L9.99832 15.9839L4.51207 18.8039H4.51332Z" fill="#E9ECEF"/>
      </svg>
      `,
        filledStar: `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.51332 18.8039C4.03082 19.0514 3.48332 18.6176 3.58082 18.0639L4.61832 12.1514L0.214567 7.95639C-0.196683 7.56389 0.0170668 6.84639 0.568317 6.76889L6.69082 5.89889L9.42082 0.490137C9.66707 0.00263672 10.3333 0.00263672 10.5796 0.490137L13.3096 5.89889L19.4321 6.76889C19.9833 6.84639 20.1971 7.56389 19.7846 7.95639L15.3821 12.1514L16.4196 18.0639C16.5171 18.6176 15.9696 19.0514 15.4871 18.8039L9.99832 15.9839L4.51207 18.8039H4.51332Z" fill="#FFDA6A"/>
      </svg>
      `,
    });

    $('.rating-readonly').rating({
        step: 0.5,
        // showCaption: false,
        showClear: false,
        hoverChangeCaption: false,
        emptyStar: `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.51332 18.8039C4.03082 19.0514 3.48332 18.6176 3.58082 18.0639L4.61832 12.1514L0.214567 7.95639C-0.196683 7.56389 0.0170668 6.84639 0.568317 6.76889L6.69082 5.89889L9.42082 0.490137C9.66707 0.00263672 10.3333 0.00263672 10.5796 0.490137L13.3096 5.89889L19.4321 6.76889C19.9833 6.84639 20.1971 7.56389 19.7846 7.95639L15.3821 12.1514L16.4196 18.0639C16.5171 18.6176 15.9696 19.0514 15.4871 18.8039L9.99832 15.9839L4.51207 18.8039H4.51332Z" fill="#E9ECEF"/>
      </svg>
      `,
        filledStar: `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.51332 18.8039C4.03082 19.0514 3.48332 18.6176 3.58082 18.0639L4.61832 12.1514L0.214567 7.95639C-0.196683 7.56389 0.0170668 6.84639 0.568317 6.76889L6.69082 5.89889L9.42082 0.490137C9.66707 0.00263672 10.3333 0.00263672 10.5796 0.490137L13.3096 5.89889L19.4321 6.76889C19.9833 6.84639 20.1971 7.56389 19.7846 7.95639L15.3821 12.1514L16.4196 18.0639C16.5171 18.6176 15.9696 19.0514 15.4871 18.8039L9.99832 15.9839L4.51207 18.8039H4.51332Z" fill="#FFDA6A"/>
      </svg>
      `,
        readonly: true,
        starCaptions: val => val,
        showCaptionAsTitle: true,
        clearCaption: '0',
    });

    const apiUrl = '/server/routes.php?action=feedback&bookId=' + (new URLSearchParams(window.location.search).get('bookId'));

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => {
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.log('非 JSON 格式資料');
            res = res.text();
        } else {
            res = res.json();
        }
        return res;
    })
        .then(data => {
            let PracticalLevel = PushLevel = 0;
            if (data.length > 0) {
                for (score of data) {
                    PracticalLevel += Number(score.PracticalLevel);
                    PushLevel += Number(score.PushLevel);
                }
                PracticalLevel /= data.length;
                PushLevel /= data.length;
            }
            $('.practical input').rating('update', PracticalLevel.toFixed(1));
            $('.push input').rating('update', PushLevel.toFixed(1));

            $('.feedback-scores .rating-container').append(`<span class="count">(${data.length})</span>`);
        })
        .catch(e => console.log(e));
});