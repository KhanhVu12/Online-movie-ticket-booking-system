const btnLogin = document.querySelector(".btn-login");
const loginForm = document.querySelector(".login-form");
let loginOpen = false;

btnLogin.addEventListener("click", () => {
    console.log("clicked");
  if (!loginOpen) {
    btnLogin.classList.add("open");
    loginForm.classList.add("open");
    loginOpen = true;
  } else {
    btnLogin.classList.remove("open");
    loginForm.classList.remove("open");
    loginOpen = false;
  }
});
