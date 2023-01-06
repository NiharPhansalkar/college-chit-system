const signUpBtn = document.getElementById("sign-up");
const email = document.getElementById("user-email");
const pswd = document.getElementById("user-password");
const pswdConfirm = document.getElementById("confirm-user-password");
const emailError = document.getElementById("email-error");
const pswdError = document.getElementById("password-error");

signUpBtn.addEventListener("click", () => {
    if (!email.value.match(/@sitpune.edu.in$/)) {
        emailError.textContent = "Please enter valid SIT email ID";
        emailError.style.color = "red";
        emailError.style.display = "inline-block";
        emailError.style.marginBottom = "26px";
        event.preventDefault(); // Prevents the from being submitted

        // You need to set timeout so browser can properly finish all html work (such as submitting the form)
        // Below is just for info, not implemented in the end

        /*setTimeout(() => {
            location.reload();
        }, 10)*/

    }
    if (pswd.value !== pswdConfirm.value) {
        pswdError.textContent = "Entered password does not match";
        pswdError.style.color = "red";
        pswdError.style.display = "inline-block";
        pswdError.style.marginBottom = "26px";
        event.preventDefault();
        
        /*setTimeout(() => {
            location.reload();
        }, 10)*/
    }
});
