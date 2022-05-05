const movieList = document.querySelectorAll(".movie-list");

const url = "http://localhost:5000/movies";
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
    movieList.innerHTML = "";

    data["movies"].forEach((movie) => {
        const id = movie[0];
        const title = movie[1];
        const genre = movie[2];
        const image = movie[3];
        const length = movie[6]
        const movieListItem = document.createElement("tr");
        movieListItem.classList.add("movie-list-item");
        movieListItem.innerHTML = `
        <td class="name">${title}</td>
        <td>${length} phút</td>
        <td>${genre}</td>
        <td><img
            src="${image}" width="60px" height="80px" /></td>
        <td>
            <button class="btn-pencil"><i class="fa fa-pencil"></i></button>
            
            <button class="btn-trash"><i class="fa fa-trash-o"></i></button>
        </td>
        <input hidden class = "id" value=${id}/>
    `;
        movieList[0].appendChild(movieListItem);
    });


    const editContainer = document.querySelectorAll(".movie-list-item")
    for (let i = 0; i < editContainer.length; i++) {
        const editBtn = editContainer[i].querySelector(".btn-pencil")
        const id = editContainer[i].querySelector(".id").value
        editBtn.addEventListener("click", () => {
            const container = document.querySelector(".container");
            const movieContainer = document.querySelector(".signup-contain");
            movieContainer.remove()
            const url = "http://localhost:5000/movies/" + id;
            const getMovies = (url) => {
                fetch(url)
                    .then((result) => result.json())
                    .then((data) => {
                        showMovies(data);
                    });
            };
            getMovies(url);

            // const handleChooseTicket = (id) => {
            //     console.log("Ran Over");
            //     localStorage.setItem("movieId", id);
            //     location.href = "buy-ticket.html";
            // };

            const showMovies = (data) => {
                movieContainer.innerHTML = "";

                data["movies"].forEach((movie) => {
                    const title = movie[1];
                    const genre = movie[2];
                    const image = movie[3];
                    const trailer = movie[4];
                    const length = movie[6]
                    const movieInfoItem = document.createElement("div");
                    movieInfoItem.classList.add("signup-contain");
                    movieInfoItem.innerHTML = `
        <form class="signup-form" action="/movies/add" method="post">
        <!-- form header -->
        <div class="form-header">
        <h1>Chỉnh sửa thông tin phim</h1>
        </div>
    
        <!-- form body -->
        <div class="form-body">
        <div class="form-group>
        <label for="name" class="label-title">Tên phim</label>
        <input
          type="name"
          id="name"
          value="${title}"
          class="form-input"
          placeholder="Nhập tên phim"
          required="required"
        />
      </div>

      <div class="form-group">
          <label for="img" class="label-title">Hình ảnh</label>
          <input
            type="img"
            id="img"
            value="${image}"
            class="form-input"
            required="required"
          ></input>
        </div>

      <div class="form-group">
          <label for="showtime" class="label-title">Thời Lượng Phim</label>
          <input
            type="showtime"
            id="showtime"
            value="${length}"
            class="form-input"
            placeholder="Nhập thời lượng"
            required="required"
          />
        </div>

        <div class="form-group">
          <label for="category" class="label-title">Thể Loại</label>
          <input
            type="category"
            id="category"
            value="${genre}"
            class="form-input"
            placeholder="Nhập thể loại"
            required="required"
          />
        </div>

        <div class="form-group">
          <label for="trailer" class="label-title">Trailer</label>
          <input
            type="trailer"
            id="trailer"
            value="${trailer}"
            class="form-input"
            placeholder="http://..."
            required="required"
          />
          </div>
          </div>
            <div class="form-footer">
                <span>* required</span>
                <button type="submit" class="btn"><a href="movielist" style="text-decoration: none;">Lưu</button>
                </div>
    
            </form>

                  `;
                    container.appendChild(movieInfoItem);
                });
            };

        })
    }

};
