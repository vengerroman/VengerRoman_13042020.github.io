const openElements = document.querySelectorAll("[data-open]");
const closeElements = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (let elem of openElements) {
    elem.addEventListener("click", function () {
        document.getElementById("movieModal").classList.add(isVisible);
    });
}
for (let elem of closeElements) {
    elem.addEventListener("click", function () {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
}

document.addEventListener("click", e => {
    if (e.target === document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
});

document.addEventListener("keyup", e => {
    if (e.key === "Escape" && document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible").classList.remove(isVisible);
    }
});

onMovieModalOpen = (id) => {
    filmModalRender(id);
    document.getElementById("movieModal").classList.add(isVisible);
}

filmModalRender = (id) => {
    const movie = state.data[--id];
    modalContainer.innerHTML =
        `<div class="galleryListItem" style="flex-direction: column; height: 100%; padding-top: 10px">
            <div style="display: flex">
                <div>                        
                    <img class="filmCover" src=${movie.img} alt=${movie.name} style="width: 150px">
                </div>
                <div class="filmListContainer" >
                  <p class="filmTitle">${movie.name}, ${movie.year}</p>
                  <p> ${movie.description}</p>
                </div>
            </div>
            <div>
                <div style="display: flex">
                    <img onclick="onBookmarkClick(${movie.id}, true)" width="40px" 
                    src=${hasFavoriteInList(movie.id) ? "./img/star_filed.svg" : "./img/star_grey.svg"}>
                    <p class="movieYear">${movie.year}</p>
                </div>
                <div style="display: flex">
                    <div style="width: 300px">
                        <div class="modalGenre">${movie.genres.map((genre) => {
            return `<p class="genresItem">${genre}</p>`
        }).join('')}</div>
                    </div>
                    <div>
                        <p>Director: ${movie.director}</p>
                        <p>Starring: ${movie.starring.join(", ")}</p>
                    </div>
                </div>
            </div>    
        </div>`
}

