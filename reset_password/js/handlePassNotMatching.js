const passwordError = document.getElementById("password-error");
const userPass = document.getElementById("user-password");
const userConfirmPass = document.getElementById("user-confirm-password");
const forgotBtn = document.getElementById("forgot-button");

forgotBtn.addEventListener("click", () => {
    if (userPass !== userConfirmPass) {
        passwordError.textContent = "Password and confirm password do not match";
        passwordError.style.color = "red";
        passwordError.style.display = "inline-block";
        passwordError.style.marginBottom = "13px";
        event.preventDefault();
    }
});
