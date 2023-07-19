async function getSearchResource (queryObj) {
    var apiUrl = '/swcb-new/server/search_resource.php'
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(queryObj)
        })
        if (response.ok) {
            const data = await response.json();
            console.log('origin', data);
            const formatBooks = data.map(book => {
                const {Title, ShortDescrip, BookID, BC_Name, TC_Name, FC_Name} = book;
                const type = BC_Name ?? TC_Name ?? FC_Name
                return {
                    title: Title,
                    description: ShortDescrip,
                    image: '../../swcb_110/Files/cover/'+ BookID + '.jpg',
                    type
                }
            })
            return formatBooks;
        } 
    } catch (error) {
        throw new Error('網路請求失敗: ' + error);
    }
}

$(function () {
    (async function () {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        
        // 遍历所有参数
        const queryObj = {};
        urlParams.forEach((value, key) => {
          queryObj[key] = value
        });
        document.getElementById("search-text").innerText = queryObj.searchText
        document.getElementById("search-result-input").value = queryObj.searchText
        const startTime = performance.now();
        const searchResult = await getSearchResource(queryObj);
        const endTime = performance.now();
        const durationInSeconds = (endTime - startTime) / 1000;
        document.getElementById("search-time").innerText = durationInSeconds.toFixed(2)
        document.getElementById("search-result-number").innerText = searchResult.length
        console.log(searchResult)
        searchResult.forEach(result => {
            const {image, title, description, type} = result
            $("#search-content").append(
                `
                <div class="search-card">
                    <div class="card-image">
                        <img src="${image}" onError="this.onerror=null; this.src='../asset/images/search-result-default-img.png';">
                        <span class="card-image-tag">${type}</span>
                    </div>
                    <div class="card-content"> 
                        <h4>${title}</h4>
                        <div id="card-topic-tag">
                            <span>環境教育-氣候變遷</span>
                        </div>
                        <div id="card-age-range-tag">
                            <span>國小高年級，國中</span>
                        </div>

                        <p>簡介: ${description}</p>
                    </div>
                </div>
                `
            )
        });
    })();
});