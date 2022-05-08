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

const handleSelectSeat = (e) => {
  if (e.currentTarget.className.includes("occupied")) return;
  const isSelected = e.currentTarget.className.includes("selected");
  const isSeatVip = e.currentTarget.className.includes("vip");
  const ticketPrice = isSeatVip ? +SeatPrice.VIP : +SeatPrice.NORMAL;

  if (isSelected) {
    submitData.total -= ticketPrice;
    total.innerHTML = +total.textContent - ticketPrice;
  } else {
    submitData.total += ticketPrice;
    total.innerHTML = +total.textContent + ticketPrice;
  }

  if (
    e.currentTarget.classList.contains("seat") &&
    !e.currentTarget.classList.contains("occupied")
  ) {
    e.currentTarget.classList.toggle("selected");
  }

  ticketCount.textContent = seatContainer.querySelectorAll(".selected").length;
};

seats.forEach((element) => {
  element.addEventListener("click", handleSelectSeat);
});
