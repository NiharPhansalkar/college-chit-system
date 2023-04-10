const loginBtn = document.getElementById("login-button");
const email = document.getElementById("user-email"); 
const pswd = document.getElementById("user-password"); 
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
    if(paramString.includes("error=-1")) {
        generalError.textContent = "Password cannot be empty";
        generalError.style.color = "red";
        generalError.style.display = "inline-block";
        generalError.style.marginTop = "13px";
    } else if (paramString.includes("error=-2")) {
        generalError.textContent = "Incorrect password";
        generalError.style.color = "red";
        generalError.style.display = "inline-block";
        generalError.style.marginTop = "13px";
    } else if (paramString.includes("error=-3")) {
        generalError.textContent = "Please sign up";
        generalError.style.color = "red";
        generalError.style.display = "inline-block";
        generalError.style.marginTop = "13px";
    }
});
