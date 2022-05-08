const btnLogin = document.querySelector(".btn-login");
const loginForm = document.querySelector(".login-form");
let loginOpen = false;
const login = document.querySelector(".login");

login.addEventListener("click", async () => {
  const res = await fetch(`${url}/login`, {
    method: "POST",
    body: new FormData(document.getElementById("form-login")),
  });
  const user = await res.json();
  localStorage.setItem("user", user);
});

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
