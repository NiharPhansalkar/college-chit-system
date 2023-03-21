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
    } else {
        event.preventDefault();
        fetch("/login_page/loginPage.html", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "user-email": email.value,
                "user-password": pswd.value,
            }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    } 
})

