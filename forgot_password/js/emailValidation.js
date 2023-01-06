const loginBtn = document.getElementById("forgot-button");
const email = document.getElementById("user-email"); 

loginBtn.addEventListener("click", () => {
    if (!email.value.match(/@sitpune.edu.in$/)) {
        alert("Incorrect email address. Please login using an SIT email ID");
        event.preventDefault();
    } 
})
