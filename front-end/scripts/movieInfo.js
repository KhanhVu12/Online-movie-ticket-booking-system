let foods;
const container = document.querySelector(".container");
const bookingCenter = document.querySelector(".booking-center");
const count = document.querySelector(".counter");
const confirmBtn = document.querySelector(".confirm");
const movieId = localStorage.getItem("movieId");
const user = JSON.parse(localStorage.getItem("user"));
const url = "http://localhost:5000";
let submitData = {
  //   userid: user.id,
  //   showtimeid: null,
  foods: [
    // {
    //   id: null,
    //   amount: 0,
    // },
  ],
  seats: [
    // {
    //   id: null,
    //   name: null,
    //   typeId: null,
    //   showtimeid: null,
    // },
  ],
};

const getFoods = () => {
  fetch(`${url}/food`)
    .then((data) => data.json())
    .then((data) => (foods = data.foods));
};

const showMovies = (data) => {
  const movie = data.movies[0];
  const title = movie[1];
  const genre = movie[2];
  const image = movie[3];
  const trailer = movie[4].substring(32);
  const desc = movie[5];
  const length = movie[6];
  const origin = movie[7];
  const releasedDate = movie[8];
  const director = movie[9];
  const actors = movie[10];

  const movieInfo = document.createElement("div");
  movieInfo.classList.add("movie-info-container");
  movieInfo.style.cssText = ` background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #151515), url("${image}"); background-size: cover; background-repeat: no-repeat`;
  movieInfo.innerHTML = `
            <div class="movie-info">
                <div class="movie-info-img">
                    <img src="${image}" alt="${title}">
                </div>
                <div class="movie-info-content">
                    <h3 class="movie-info-title">${title}</h3>
                    <div class="movie-info-desc">${desc}</div>
                    <div class="movie-info-detail">

                            <strong>Đạo Diễn:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong>  <p>${director}</p> 
                            <strong>Diễn Viên:&nbsp;&nbsp;&nbsp;&nbsp;</strong> <p>${actors}</p> 
                            <strong>Thể Loại:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> <p>${genre}</p>
                            <strong>Khởi Chiếu:&nbsp;</strong> <p>${releasedDate}</p>
                            <strong>Thời Lượng:</strong> <p>${length} phút</p>
                            <strong>Ngôn Ngữ:&nbsp;&nbsp;&nbsp;</strong> <p>Phụ Đề Tiếng Việt</p>
                        
                    </div>
            
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    
                </div>
            </div>`;
  container.prepend(movieInfo);
};

const getMovies = (url) => {
  fetch(`${url}/movies/${movieId}`)
    .then((result) => result.json())
    .then((data) => {
      showMovies(data);
    });
};

const handleSubmit = () => {
  const selectingTickets = document.querySelectorAll(
    ".seat-container .selected"
  );
  selectingTickets.forEach((item) => {
    submitData.seats.push({
      name: item.id,
      typeId: item.className.includes("vip") ? SeatType.VIP : SeatType.NORMAL,
    });
  });
};

window.onload = async () => {
  await getMovies(url);
  await getFoods();
};

confirmBtn.addEventListener("click", () => {
  handleSubmit();
  renderFoodList();
  window.scrollTo(0, 1050);
});

const renderFoodList = () => {
  bookingCenter.innerHTML = `
  <div class="food-order">
 <h3>Chọn Đồ Ăn</h3>
 <div class="food-grid">
   ${foods
     .map(
       (food) =>
         `<div class="card">
                <div class="food-img">
                    <img src=${food[2]} alt="">
                </div>
                <div class="food-category">${food[1]}</div>
                <div class="price">${food[3]}</div>
                <div class="food-footer">
                    <span class="minus-btn" onclick="decreaseClick(${food[0]})"><i class="fa-solid fa-minus"></i></span>
                    <span class="counter-label-${food[0]}">0</span>
                    <span class="plus-btn" onclick="incrementClick(${food[0]})"><i class="fa-solid fa-plus"></i></span>
                </div>
            </div>`
     )
     .join("")}
 </div>
 <button class="confirm"> Xác Nhận </button>
     </div>
 `;
};

function decreaseClick(id) {
  const label = document.querySelector(`.counter-label-${id}`);
  let value = label.textContent;
  if (value == 0) return;
  label.innerHTML = --value;
}

function incrementClick(id) {
  const label = document.querySelector(`.counter-label-${id}`);
  label.innerHTML = ++label.textContent;
}
