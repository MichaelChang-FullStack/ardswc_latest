function toTopSearch(data) {
    const {DM_NAME} = data;
    return {
        name: DM_NAME
    }
}

async function getTopSearch() {
    var apiUrl = '/server/hotKeyword.php';
    try {
        var response = await fetch(apiUrl)
        if (!response.ok) {
            throw new Error('網路請求失敗: ' + response.status);
        }
        const data = await response.json();
        return data.map((d) => toTopSearch(d));
    } catch (error) {
        console.error(error)
    }
}
$(document).ready(async function () {
    const topSearchList = await getTopSearch();
    topSearchList.forEach(topSearch => {
        const {name} = topSearch;
        $('#top_search').append(
            `
            <a href='/pages/Search_Result.html?searchText=${name}'>
                <div class="frequest_search1">
                    <span>${name}</span>
                </div>
            </a>
                
            `
        )
    });
})