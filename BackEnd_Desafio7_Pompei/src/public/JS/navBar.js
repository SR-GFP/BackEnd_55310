const btnLogin = document.getElementById("btn-login");
const btnLogout = document.getElementById("btn-logout")

document.addEventListener("userLogged", () => {  
    btnLogin.style.display="none"
    btnLogout.style.display="block"
  
});

btnLogin.addEventListener("click", () => {
  window.location.href=("/auth")
  console.log("CLick")
});

btnLogout.addEventListener("click", () => {
  window.location.href=("/auth/logout")
});