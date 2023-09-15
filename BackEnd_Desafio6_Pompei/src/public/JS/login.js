//Bottones y Tabs
const loginTab = document.getElementById("login-tab")
const registerTab = document.getElementById("register-tab")
const btnUserLogged = document.getElementById("btn-user-logged")

//Containers
const loginContainerForm = document.getElementById("login-container-form")
const registerContainerForm = document.getElementById("register-container-form")
const responseContainer = document.getElementById("response-container")
const profileContainerHome = document.getElementById ("profile-container-home")
//Formularios
const loginForm = document.getElementById("login-form")
const registerForm = document.getElementById("register-form")
//Mensaje
const responseMensaje = document.getElementById("response-mensaje")

loginTab.addEventListener("click", ()=>{
loginContainerForm.style.display = "block",
registerContainerForm.style.display = "none"
responseContainer.style.display="none"
loginTab.className=" nav-link active"
registerTab.className="nav-link"
})

registerTab.addEventListener("click", ()=>{
  registerContainerForm.style.display = "block",
  loginContainerForm.style.display = "none",
  responseContainer.style.display="none"
  loginTab.className=" nav-link ",
  registerTab.className="nav-link active"
  })



  registerForm.addEventListener("submit", async event =>{
    event.preventDefault()
    const registerData = new FormData(registerForm);    
    const obj = {};
    registerData.forEach((value, key) => obj[key] = value );
    
    try {
      const response = await fetch ("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
      const newUser =  await response.json()
      registerForm.reset();
      registerContainerForm.style.display ="none";
      responseContainer.style.display = "block";
      if(response.ok){
        responseMensaje.textContent = newUser.payload;
      }else
      responseMensaje.textContent = newUser.error;
    } catch (error) {
      console.log(error);
    }  
    });

loginForm.addEventListener("submit", async event =>{
  event.preventDefault()
  const loginData = new FormData(loginForm);
  const obj = {};
  loginData.forEach((value, key) => obj[key] = value );
  try {
    const response = await fetch ("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
    const user =  await response.json()
      loginForm.reset();
      loginContainerForm.style.display ="none";
      responseContainer.style.display = "block";
      if(response.ok){
        responseMensaje.textContent = user.payload;
      }else
      responseMensaje.textContent = user.error;
  } catch (error) {
    console.log(error);
  }  
  });

  // btnUserLogged.addEventListener("click", async ()=>{    
  //   const response = await fetch("/", {
  //     method: "GET"
  //   })
  // })