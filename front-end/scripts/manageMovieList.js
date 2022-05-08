function showMovies() {
  const url = "http://localhost:5000/movies";
  const getMovies = (url) => {
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        showMovies(data);
      });
  };
  getMovies(url);

  const showMovies = (data) => {
    document.querySelector(".movie-list").innerHTML = "";

    data["movies"].forEach((movie) => {
      const id = movie[0];
      const title = movie[1];
      const genre = movie[2];
      const image = movie[3];
      const trailer = movie[4].substring(32);
      const desc = movie[5];
      const length = movie[6]
      const origin = movie[7];
      const releasedDate = movie[8];
      const director = movie[9];
      const actors = movie[10];
      const movieListItem = document.createElement("tr");
      movieListItem.classList.add("movie-list-item");
      movieListItem.innerHTML = `
        <td class="name">${title}</td>
        <td>${length} phút</td>
        <td>${genre}</td>
        <td>${director}</td>
        <td>${actors}</td>
        <td><img
            src="${image}" width="60px" height="80px" /></td>
        <td>
        <iframe width="160" height="90" src="https://www.youtube.com/embed/${trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </td>
            <td>
            <button class="btn-pencil"><i class="fa fa-pencil"></i></button>
            
            <button class="btn-trash"><i class="fa fa-trash-o"></i></button>
        </td>
        <input hidden class = "id" value=${id}/>
    `;
      document.querySelector(".movie-list").appendChild(movieListItem);
    });

    const editContainer = document.querySelectorAll(".movie-list-item")
    for (let i = 0; i < editContainer.length; i++) {
      const editBtn = editContainer[i].querySelector(".btn-pencil")
      const id = editContainer[i].querySelector(".id").value;
      editBtn.addEventListener("click", () => {
        const container = document.querySelector(".container");
        const movieContainer = document.querySelector(".signup-contain");
        movieContainer.classList.toggle("hidden")
        const url = "http://localhost:5000/movies/" + id.substring(0, id.length - 1);
        const getMovies = (url) => {
          fetch(url)
            .then((result) => result.json())
            .then((data) => {
              showMovies(data);
            });
        };
        getMovies(url);

        const showMovies = (data) => {
          movieContainer.innerHTML = "";

          data["movies"].forEach((movie) => {
            const id = movie[0];
            const title = movie[1];
            const genre = movie[2];
            const image = movie[3];
            const trailer = movie[4];
            const desc = movie[5];
            const length = movie[6]
            const origin = movie[7];
            const releasedDate = new Date(movie[8]).toISOString().substring(0,10);
            const director = movie[9];
            const actors = movie[10];
            const movieInfoItem = document.createElement("div");
            movieInfoItem.classList.add("signup-contain");
            movieInfoItem.innerHTML = `
        <form class="signup-form">
        <!-- form header -->
        <div class="form-header">
        <h1>Chỉnh sửa thông tin phim</h1>
        </div>
        <input hidden type="text"
        id="id" name="id"
        value="${id}"
        />

        <!-- form body -->
        <div class="form-body">
        <div class="form-group>
        <label for="name" class="label-title">Tên phim</label>
        <input
          type="text"
          id="title"
          name="title"
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
            id="image"
            name="image"
            value="${image}"
            class="form-input"
            required="required"
          ></input>
        </div>

      <div class="form-group">
          <label for="length" class="label-title">Thời Lượng Phim</label>
          <input
            type="number"
            id="length"
            name="length"
            value="${length}"
            class="form-input"
            placeholder="Nhập thời lượng"
            required="required"
          />
        </div>

        <div class="form-group">
          <label for="category" class="label-title">Thể Loại</label>
          <input
            type="text"
            name="genre"
            id="genre"
            value="${genre}"
            class="form-input"
            placeholder="Nhập thể loại"
            required="required"
          />
        </div>

        <div class="form-group">
          <label for="description" class="label-title">Mô tả phim</label>
          <input
            type="text"
            id="desc"
            name="desc"
            value="${desc}"
            class="form-input"
            placeholder="Nhập mô tả"
            required="required"
          />
        </div>

        <div class="form-group">
          <label for="director" class="label-title">Đạo diễn</label>
          <input
            type="text"
            id="director"
            name="director"
            value="${director}"
            class="form-input"
            placeholder="Nhập tên đạo diễn"
            required="required"
          />
        </div>

        <div class="form-group">
        <label for="actors" class="label-title">Diễn viên</label>
        <input
          type="text"
          id="actors"
          name="actors"
          value="${actors}"
          class="form-input"
          placeholder="Nhập tên diễn viên"
          required="required"
        />
      </div>

      <div class="form-group">
        <label for="origin" class="label-title">Diễn viên</label>
        <input
          type="text"
          id="origin"
          name="origin"
          value="${origin}"
          class="form-input"
          placeholder="Nhập xuất xứ phim"
          required="required"
        />
      </div>

        <div class="form-group">
          <label for="trailer" class="label-title">Trailer</label>
          <input
            type="text"
            id="trailer"
            name="trailer"
            value="${trailer}"
            class="form-input"
            placeholder="http://..."
            required="required"
          />
          </div>

          <div class="form-group">
          <label for="releasedDate" class="label-title">Released Date</label>
          <input
            type="date"
            id="releasedDate"
            name="releasedDate"
            value="${releasedDate}"
            class="form-input"
            placeholder="http://..."
            required="required"
          />
          </div>

          </div>
            <div class="form-footer">
                <span>* required</span>
                <button type="button" class="btn" onclick="editMovieInfo()" style="text-decoration: none;">Lưu</button>
                </div>
            </form>
                  `;
            container.appendChild(movieInfoItem);
          })
        }
      })
    }
  }
}
const editMovieInfo = () => {
  const id = document.querySelector("#id").value;
  const title = document.querySelector("#title").value;
  const genre = document.querySelector("#genre").value;
  const image = document.querySelector("#image").value;
  const trailer = document.querySelector("#trailer").value;
  const desc = document.querySelector("#desc").value;
  const length = document.querySelector("#length").value;
  const origin = document.querySelector("#origin").value;
  const releasedDate = document.querySelector("#releasedDate").value;
  const director = document.querySelector("#director").value;
  const actors = document.querySelector("#actors").value;
  const movie = {
    'movieId': id,
    'title': title,
    'genre': genre,
    'image': image,
    'trailerLink': trailer,
    'description': desc,
    'length': length,
    'origin': origin,
    'releasedDate': releasedDate,
    'director': director,
    'actors': actors
  }
  fetch('http://127.0.0.1:5500/movies/edit', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(movie)
  })
    .then(response => response.json())
    .then(data => console.log(data))
  const movieInfoItem = document.querySelectorAll("tr");
  for (const movieItem of movieInfoItem) {
    movieItem.classList.toggle("hidden")
  }
  document.querySelector(".signup-contain").classList.toggle(".signup-contain")
  showMovies()
}
showMovies()
// document.querySelector(".btn").addEventListener("click", editMovieInfo)
//         });
//       };

//     })
//   }

// };


