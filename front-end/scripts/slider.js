// const leftArrow = document.querySelectorAll(".left-arrow");
const rightArrow = document.querySelectorAll(".right-arrow");
const movieList = document.querySelectorAll(".movie-list");

// leftArrow.forEach((arrow, i) => {
//     const itemNum = movieList[i].querySelectorAll("img").length;
//     let clickCounter = 7;
//     arrow.addEventListener("click", () => {
//         clickCounter--;
//         if (itemNum - (4 + clickCounter) >= 0) {
//             movieList[i].style.transform = `translateX(${
//               movieList[i].computedStyleMap().get("transform")[0].x.value + 300
//             }px)`;
//         } else {
//             movieList[i].style.transform = "translateX(0px)";
//             clickCounter = 0;
//         }
//     });
// });

rightArrow.forEach((arrow, i) => {
    const itemNum = movieList[i].querySelectorAll("img").length;
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
        clickCounter++;
        if (itemNum - (4 + clickCounter) >= 0) {
            movieList[i].style.transform = `translateX(${
                movieList[i].computedStyleMap().get("transform")[0].x.value - 300
            }px)`;
        } else {
            movieList[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
    });
});
