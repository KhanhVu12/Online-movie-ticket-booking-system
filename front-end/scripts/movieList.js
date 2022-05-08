const movieList = document.querySelectorAll(".movie-list");

const url = "http://localhost:5000/";
const getMovies = (url) => {
  fetch(`${url}/movies`)
    .then((result) => result.json())
    .then((data) => {
      showMovies(data);
    });
};
getMovies(url);

const handleChooseTicket = (id) => {
  console.log("Ran Over");
  localStorage.setItem("movieId", id);
  location.href = "buy-ticket.html";
};

const showMovies = (data) => {
  movieList.innerHTML = "";

  data["movies"].forEach((movie) => {
    const id = movie[0];
    const title = movie[1];
    const image = movie[3];
    const desc = movie[5];
    const movieListItem = document.createElement("div");
    movieListItem.classList.add("movie-list-item");
    movieListItem.innerHTML = `
    <form action="/movies" method = "post">
    <img
      src="${image}"
      alt="${title}"
      class="movie-image"
    />
    <input hidden name="movieId" value = "${id}"/>
    <span class="movie-title">${title}</span>
    <p class="movie-desc">
      ${desc}
    </p>
    <button
      class="movie-btn buy-ticket-btn"
      onclick="handleChooseTicket('${id}')"
      type="button"
    >
      Mua Vé
    </button>
    </form>
    `;
    movieList[0].appendChild(movieListItem);
  });
};
