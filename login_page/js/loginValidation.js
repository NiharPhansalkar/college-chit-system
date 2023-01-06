const loginBtn = document.getElementById("login-button");
const email = document.getElementById("user-email"); 
const pswd = document.getElementById("user-password"); 

loginBtn.addEventListener("click", () => {
    if (!email.value.match(/@sitpune.edu.in$/)) {
        alert("Incorrect email address. Please login using an SIT email ID");
        event.preventDefault();
    } 
})
