let favoritesList = [...accessCookie("favorites").split(",")];

function createCookie(cookieName, cookieValue) {
    document.cookie = cookieName + '=' + cookieValue + "; expires=Tue, 10 Jan 2100 03:14:07 GMT";
}

function accessCookie(cookieName) {
    const name = cookieName + "=";
    const allCookieArray = document.cookie.split(';');
    for (let i = 0; i < allCookieArray.length; i++) {
        let temp = allCookieArray[i].trim();
        if (temp.indexOf(name) === 0)
            return temp.substring(name.length, temp.length);
    }
    return '';
}

function hasFavoriteInList(filmId) {
    return favoritesList.indexOf(filmId.toString()) !== -1;
}

function addFavorites(filmId) {
    if (favoritesList.indexOf(filmId.toString()) !== -1) return;
    favoritesList.push(filmId.toString())
    createCookie("favorites", favoritesList)
}

function deleteFavoriteFilm(filmId) {
    let indexOfDeleteId = favoritesList.indexOf(filmId.toString());
    if (indexOfDeleteId === -1) return;

    delete favoritesList[indexOfDeleteId];
    createCookie("favorites", favoritesList)
}