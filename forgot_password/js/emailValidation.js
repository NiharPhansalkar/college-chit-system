const forgotBtn = document.getElementById("forgot-button");
const email = document.getElementById("user-email"); 
const emailError = document.getElementById("email-error");
const currUrl = window.location.href;
let paramString = currUrl.split("?")[1]; // [1] to access the parameters part

window.addEventListener("load", () => {
    if (paramString && paramString.includes("error=-1")) {
        emailError.textContent = "Email is incorrect or does not exist.";
        emailError.style.color = "red";
        emailError.style.display = "inline-block";
        emailError.style.marginBottom = "26px";
    } else if (paramString && paramString.includes("timeout")) {
        emailError.textContent = "Reset password timeout. Please try again";
        emailError.style.color = "red";
        emailError.style.display = "inline-block";
        emailError.style.marginBottom = "26px";
    }
})

forgotBtn.addEventListener("click", () => {
    if (!email.value.match(/@sitpune.edu.in$/)) {
        emailError.textContent = "Please enter valid SIT email ID";
        emailError.style.color = "red";
        emailError.style.display = "inline-block";
        emailError.style.marginBottom = "26px";
        event.preventDefault();
    } 
})
