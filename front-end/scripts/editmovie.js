const movieList = document.querySelectorAll(".container");
const id = document.querySelector(".id")

const url = "http://localhost:5000/movies"+id;
const getMovies = (url) => {
    fetch(url)
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
    movieInfo.innerHTML = "";

    data["movies"].forEach((movie) => {
        const id = movie[0];
        const title = movie[1];
        const genre = movie[2];
        const image = movie[3];
        const length = movie[6]
        const movieInfoItem = document.createElement("div");
        movieInfoItem.classList.add("form-group");
        movieInfoItem.innerHTML = `
                    <label for="img" class="label-title">Hình ảnh</label>
                    <input
                      type="img"
                      id="img"
                      class="form-input"
                      required="required"
                    ></input>
                    <span class="btn"><i class="fa fa-paperclip">Select image</i></span>
                  `;
        movieInfo[0].appendChild(movieInfoItem);
    });
};
