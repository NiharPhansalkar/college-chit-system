const passwordError = document.getElementById("password-error");
const currUrl = window.location.href;
let paramString = currUrl.split("?")[1];

window.addEventListener("load", () => {
    if (paramString && paramString.includes("error=-1")) {
        passwordError.textContent = "Password and confirm password do not match";
        passwordError.style.color = "red";
        passwordError.style.display = "inline-block";
        passwordError.style.marginBottom = "13px";
    }
})
