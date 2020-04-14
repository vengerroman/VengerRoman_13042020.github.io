let favoritesList = JSON.parse(localStorage.getItem('favorites')) || [];

function hasFavoriteInList(filmId) {
    return favoritesList.indexOf(filmId.toString()) !== -1;
}

function addFavorites(filmId) {
    if (favoritesList.indexOf(filmId.toString()) !== -1) return;
    favoritesList.push(filmId.toString())
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
}

function deleteFavoriteFilm(filmId) {
    let indexOfDeleteId = favoritesList.indexOf(filmId.toString());
    if (indexOfDeleteId === -1) return;

    delete favoritesList[indexOfDeleteId];
    localStorage.setItem('favorites', JSON.stringify(favoritesList));
}
