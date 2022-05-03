const SeatPrice = {
  VIP: 120000,
  NORMAL: 100000,
};
const SeatType = {
  NORMAL: 1,
  VIP: 2,
};

const seatContainer = document.querySelector(".seat-container");
const seats = document.querySelectorAll(
  ".seatname-middle .seat:not(.occupied)"
);
const ticketCount = document.getElementById("count");
const total = document.getElementById("total");

let ticketPrice = 100000;

const handleSelectSeat = (e) => {
  const isSelected = e.target.className.includes("selected");
  const isSeatVip = e.target.className.includes("vip");

  if (isSelected) {
    total.innerHTML =
      +total.textContent -
      (e.target.className.includes("vip") ? +SeatPrice.VIP : +SeatPrice.NORMAL);
  } else {
    total.innerHTML =
      +total.textContent + (isSeatVip ? +SeatPrice.VIP : +SeatPrice.NORMAL);
  }

  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }

  ticketCount.textContent = seatContainer.querySelectorAll(".selected").length;
};

seatContainer.addEventListener("click", (e) => {
  handleSelectSeat(e);
});
