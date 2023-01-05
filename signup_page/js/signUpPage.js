const signUpBtn = document.getElementById("sign-up");
const email = document.getElementById("user-email");
const pswd = document.getElementById("user-password");
const pswdConfirm = document.getElementById("confirm-user-password");

signUpBtn.addEventListener("click", () => {
    console.log("Hello");
    if (email.value.match(/@sitpune.edu.in$/)) {
        alert("Invalid email! Please try again with an SIT emailID");
        location.reload();
    }
    if (pswd.value !== pswdConfirm.value) {
        alert("Password and confirm password fields do not match");
        location.reload();
    }
});
