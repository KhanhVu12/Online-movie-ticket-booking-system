let foods;
const container = document.querySelector(".container");
const bookingCenter = document.querySelector(".booking-center");
const count = document.querySelector(".counter");
const confirmBtn = document.querySelector(".confirm");
const movieId = localStorage.getItem("movieId");
const user = JSON.parse(localStorage.getItem("user"));
const calenderDate = document.querySelectorAll(".calender-date");
const showTime = document.querySelectorAll(".show-time");
const url = "http://localhost:5000";

let submitData = {
  userId: JSON.parse(localStorage.getItem("user")).userId,
  //   showtimeid: null,
  foods: [
    // {
    //   id: null,
    //   amount: 0,
    // },
  ],
  showTimeId: null,
  seats: [
    // {
    //   id: null,
    //   name: null,
    //   typeId: null,
    //   showtimeid: null,
    // },
  ],
};

calenderDate.forEach((item) => {
  item.addEventListener("click", (e) => {
    calenderDate.forEach((item) => item.classList.remove("active"));
    e.currentTarget.classList.add("active");
  });
});

showTime.forEach((item) => {
  item.addEventListener("click", (e) => {
    showTime.forEach((item) => item.classList.remove("active"));
    e.currentTarget.classList.add("active");
    submitData.showTimeId = e.currentTarget.id;
  });
});

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

const nextToFoodSelect = () => {
  const selectingTickets = document.querySelectorAll(
    ".seat-container .selected"
  );
  const selectingDates = document.querySelectorAll(".calender-date");
  const selectingTimes = document.querySelectorAll(".show-time");

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
  await getBookedSeats();
};

const getBookedSeats = async () => {
  const promise = await fetch(`${url}/ticket/${showTimeId}`);
  const res = await promise.json();
  const resBookedSeats = res.tickets;
  const allSeats = document.querySelectorAll(".seat");
  allSeats.forEach((seat) => {
    if (resBookedSeats.find((ticket) => ticket[1] == seat.id))
      seat.classList.add("occupied");
  });
};

confirmBtn.addEventListener("click", () => {
  nextToFoodSelect();
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
                <div class="price-${food[0]}">${food[3]}</div>
                <div class="food-footer">
                    <span class="minus-btn" onclick="decreaseClick(${food[0]},${food[3]})"><i class="fa-solid fa-minus"></i></span>
                    <span class="counter-label-${food[0]}">0</span>
                    <span class="plus-btn" onclick="incrementClick(${food[0]},${food[3]})"><i class="fa-solid fa-plus"></i></span>
                </div>
            </div>`
     )
     .join("")}
 </div>
 <button class="food-confirm" onclick="renderTicketInfo()"> Xác Nhận </button>
     </div>
 `;
};

const renderTicketInfo = () => {
  bookingCenter.innerHTML = `
  <div class="confirm-screen">
            <h2>Thông tin của vé</h2>
            <div class="confirm-screen-wrapper">
                <div class="user-info">
                    <div class="info">
                        <h3>Tên Người Dùng: </h3>
                        <div>dwfedgrfhtyjjkeryfety</div>
                    </div>
                    <div class="info">
                        <h3>Tên Phim: </h3>
                        <div>dwfedgrfhtyjjkeryfety</div>
                    </div>
                    <div class="info">
                        <h3>Ngày Chiếu: </h3>
                        <div>dwfedgrfhtyjjkeryfety</div>
                    </div>
                    <div class="info">
                        <h3>Title day hehe: </h3>
                        <div>dwfedgrfhtyjjkeryfety</div>
                    </div>
                </div>
                <div class="ticket-info">
                    <div class="item">
                        <h3>heheeheh</h3>
                        <div class="content">hjhjhhgj</div>
                    </div>
                    <div class="item">
                        <h3>heheeheh</h3>
                        <div class="content">fgthyjkl</div>
                    </div>
                    <div class="item">
                        <h3>heheeheh</h3>
                        <div class="content">jbnubuib</div>
                    </div>
                    <div class="item">
                        <h3>heheeheh</h3>
                        <div class="content"></div>
                    </div>
                </div>
            </div>
        </div>
  `;
};

function decreaseClick(id, price) {
  let priceLable = document.querySelector(`.price-${id}`);
  let label = document.querySelector(`.counter-label-${id}`);
  let value = label.textContent;
  if (value == 0) return;
  let total = (+value - 1) * price;
  label.innerHTML = --value;
  priceLable.textContent = value == 1 ? price : total;

  //Pop food from submitData
  const currentFood = submitData.foods.find((food) => food.id == id);
  const filterFoods = submitData.foods.filter((food) => food.id != id);
  if (currentFood) {
    if (currentFood.amount === 1) {
      submitData.foods = filterFoods;
      return;
    }
    filterFoods.push({ id: id, amount: --currentFood.amount });
  }
}

function incrementClick(id, price) {
  let priceLable = document.querySelector(`.price-${id}`);
  let label = document.querySelector(`.counter-label-${id}`);
  let value = label.textContent;
  let total = (+value + 1) * price;
  label.innerHTML = ++value;
  priceLable.textContent = total;

  //Add food to submitData
  const currentFood = submitData.foods.find((food) => food.id == id);
  if (currentFood) {
    submitData.foods
      .filter((food) => food.id != id)
      .push({ id: id, amount: ++currentFood.amount });
  } else submitData.foods.push({ id: id, amount: 1 });
}
