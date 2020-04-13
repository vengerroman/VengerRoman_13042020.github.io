let state = {
    fetchResult: null,
    data: null,
    grid: [],
    list: [],
    favoritesList: [],
    viewType: 'grid',
    filter: "all"
};

function include(url) {
    let script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

include("js/cookies.js");
include("js/modal.js");

const galleryElement = document.getElementById("galleryItems");
const favoriteElement = document.getElementById("favoriteItems");
const modalContainer = document.getElementById("modalContainer");
const listBttn = document.getElementById("listIcon");
const gridBttn = document.getElementById("gridIcon");

listBttn.addEventListener('click', () => {
    state.viewType = "list";
    listRender();
    galleryElement.innerHTML = state.list;
});

gridBttn.addEventListener('click', () => {
    state.viewType = "grid";
    gridRender();
    galleryElement.innerHTML = state.grid;
})


onBookmarkClick = (id, modalRender) => {
    hasFavoriteInList(id) ? deleteFavoriteFilm(id) : addFavorites(id);
    favoritesListRender();
    if (modalRender)
        filmModalRender(id);
    state.viewType === "grid" ? gridRender() : listRender();
}

onFilterChange = (filter) => {
    filter = filter.value;
    state.data = state.fetchResult
    if (filter !== "All") {
        state.data = state.fetchResult.filter((item) => {
            return item.genres.includes(filter)
        });
    }
    state.viewType === "grid" ? gridRender() : listRender();
}

(async function getData() {
    await fetch('http://my-json-server.typicode.com/moviedb-tech/movies/list')
        .then(response => response.json())
        .then(data => {
            state.data = state.fetchResult = [...data];
            listRender();
            gridRender();
            favoritesListRender();
        })
        .catch(err => console.error(err));
})();

listRender = () => {
    state.list = state.data.map((movie) => {
        return `<div class="galleryListItem" data-open = "true">
                    <div>                        
                        <img class="favoriteBttn" onclick="onBookmarkClick(${movie.id})" src=${hasFavoriteInList(movie.id) ? "./img/star_filed.svg" : "./img/star_grey.svg"}>
                        <img class="filmCover" src=${movie.img} alt=${movie.name} style="width: 150px">
                    </div>
                    <div class="filmListContainer" >
                      <p class="filmTitle" onclick="onMovieModalOpen(${movie.id})">${movie.name}, ${movie.year}</p>
                      <p> ${movie.description}</p>
                      <div style="display: flex; flex-wrap: wrap">${movie.genres.map((genre) => {
            return `<p class="genresItem">${genre}</p>`
        }).join('')}</div>
                    </div>
               </div>`
    }).join('');
    galleryElement.innerHTML = state.list;
}

gridRender = () => {
    state.grid = state.data.map((movie) => {
        return `<div class="galleryGridItem" data-open = "true">
                    <div>
                        <img class="favoriteBttn" onclick="onBookmarkClick(${movie.id})" src=${hasFavoriteInList(movie.id) === true ? "./img/star_filed.svg" : "./img/star_grey.svg"}>
                        <img class="filmCover" src=${movie.img} alt=${movie.name}>
                    </div>
                    <p class="filmName gridTitle" onclick="onMovieModalOpen(${movie.id})">${movie.name}</p>
                    <p>${movie.year}</p>
                </div>`
    }).join('');
    galleryElement.innerHTML = state.grid;
}

favoritesListRender = () => {
    state.favoritesList = favoritesList.map((item) => {
        if (item<=0) return;
        item = state.data[item-1];
        return `<div class="favoritesListItem">
                    <div>
                        <img class="favoriteCover" src=${item.img} alt=${item.name}>
                    </div>
                    <div class="filmName" onclick="">${item.name}</div>
                    <div class="delBttn" onclick="onBookmarkClick(${item.id})"></div>
                </div>`
    }).join('');
    favoriteElement.innerHTML = state.favoritesList;
}
