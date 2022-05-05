const btnLogin = document.querySelector(".btn-login");
const loginForm = document.querySelector(".login-form");
let loginOpen = false;
const login = document.querySelector(".login");

login.addEventListener("click", () => {
  fetch(`${url}/login`, {
    method: "POST",
    mode: "no-cors",
    body: new FormData(
      document.getElementById("form-login")
    ),
  });
  console.log("asdmasdm");
})

btnLogin.addEventListener("click", () => {
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
