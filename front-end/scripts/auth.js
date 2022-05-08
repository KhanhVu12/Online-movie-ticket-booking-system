const btnLogin = document.querySelector(".btn-login");
const loginForm = document.querySelector(".login-form");
let loginOpen = false;
const login = document.querySelector(".login");
const error = document.querySelector(".error");

const toggleLoginForm = () => {
  if (!loginOpen) {
    btnLogin.classList.add("open");
    loginForm.classList.add("open");
    loginOpen = true;
  } else {
    btnLogin.classList.remove("open");
    loginForm.classList.remove("open");
    loginOpen = false;
  }
};

const handleLogin = async () => {
  const res = await fetch(`${url}/login`, {
    method: "POST",
    body: new FormData(document.getElementById("form-login")),
  });
  const user = await res.json();
  localStorage.setItem("user", JSON.stringify(user));

  if (user && user.userId) {
    toggleLoginForm();
    btnLogin.innerText = `Đăng Xuất`;
    btnLogin.removeEventListener("click", toggleLoginForm);
    btnLogin.addEventListener("click", handleLogout);
    if (user.role === "admin") window.location.href = "/indexAdmin.html";
  } else {
    error.innerText = user.message.toUpperCase();
  }
};

const handleLogout = () => {
  localStorage.removeItem("user");
  if (/indexAdmin/.test(window.location.href)) {
    window.location.href = "/index.html";
  } else location.reload();
};

const persistLogin = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (
    (!user || user.role != "admin") &&
    /indexAdmin/.test(window.location.href)
  )
    handleLogout();
  if (!user || !user.userId) return;

  btnLogin.innerText = `Đăng Xuất`;
  btnLogin.removeEventListener("click", toggleLoginForm);
  btnLogin.addEventListener("click", handleLogout);
};

login && login.addEventListener("click", handleLogin);

btnLogin && btnLogin.addEventListener("click", toggleLoginForm);

persistLogin();
