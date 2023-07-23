function getQueryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryObj = {};
    urlParams.forEach((value, key) => {
        queryObj[key] = value
    });
    return queryObj;
}