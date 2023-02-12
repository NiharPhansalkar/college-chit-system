const loginBtn = document.getElementById("login-button");
const email = document.getElementById("user-email"); 
const emailError = document.getElementById("email-error"); 
const generalError = document.getElementById("general-error");
const currUrl = window.location.href;
let paramString = currUrl.split("?")[1];

loginBtn.addEventListener("click", () => {
    if (!email.value.match(/@sitpune.edu.in$/)) {
        emailError.textContent = "Please enter valid SIT email ID";
        emailError.style.color = "red";
        emailError.style.display = "inline-block";
        emailError.style.marginBottom = "13px";
        event.preventDefault();
    } 
})

window.addEventListener("load", () => {
    if(paramString !== undefined) {
        if (paramString.includes("error")){
            generalError.textContent = paramString.get("error");
            generalError.style.color = "red";
            generalError.style.display = "inline-block";
            generalError.style.marginBottom = "13px";
        }
    }
})
