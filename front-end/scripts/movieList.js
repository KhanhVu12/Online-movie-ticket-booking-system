const movieList = document.querySelectorAll(".movie-list");

const url = "http://127.0.0.1:5000/movies";
const getMovies = (url) => {
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      showMovies(data);
    });
};
getMovies(url);

const showMovies = (data) => {
  movieList.innerHTML = "";

  data.forEach((movie) => {
    const { title, image, desc } = movie;
    const movieListItem = document.createElement("div");
    movieListItem.classList.add("movie-list-item");
    movieListItem.innerHTML = `
    <img
      src="${image}"
      alt="${title}"
      class="movie-image"
    />
    <span class="movie-title">${title}</span>
    <p class="movie-desc">
      ${desc}
    </p>
    <button
      class="movie-btn buy-ticket-btn"
      onclick="location.href='buy-ticket.html'"
      type="button"
    >
      Mua Vé
    </button>
    `
    movieList[0].appendChild(movieListItem)
  });
};
