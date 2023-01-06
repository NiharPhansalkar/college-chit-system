const signUpBtn = document.getElementById("sign-up");
const email = document.getElementById("user-email");
const pswd = document.getElementById("user-password");
const pswdConfirm = document.getElementById("confirm-user-password");

signUpBtn.addEventListener("click", () => {
    if (!email.value.match(/@sitpune.edu.in$/)) {
        alert("Invalid email! Please try again with an SIT emailID");
        event.preventDefault(); // Prevents the from being submitted

        // You need to set timeout so browser can properly finish all html work (such as submitting the form)
        // Below is just for info, not implemented in the end

        /*setTimeout(() => {
            location.reload();
        }, 10)*/

    }else if (pswd.value !== pswdConfirm.value) {
        alert("Password and confirm password fields do not match");
        event.preventDefault();
        
        /*setTimeout(() => {
            location.reload();
        }, 10)*/
    }
});
