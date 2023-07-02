const forgotBtn = document.getElementById("forgot-button");
const email = document.getElementById("user-email"); 
const emailError = document.getElementById("email-error");
const currUrl = window.location.href;
let paramString = currUrl.split("?")[1]; // [1] to access the parameters part

forgotBtn.addEventListener("click", () => {
    if (!email.value.match(/@sitpune.edu.in$/)) {
        emailError.textContent = "Please enter valid SIT email ID";
        emailError.style.color = "red";
        emailError.style.display = "inline-block";
        emailError.style.marginBottom = "26px";
        event.preventDefault();
    } 
    if (paramString && paramString.includes("error=-1")) {
        emailError.textContent = "This email does not exist";
        emailError.style.color = "red";
        emailError.style.display = "inline-block";
        emailError.style.marginBottom = "26px";
        event.preventDefault();
    } 
})
