const loginBtn = document.getElementById("login-button");
const email = document.getElementById("user-email"); 
const emailError = document.getElementById("email-error"); 

loginBtn.addEventListener("click", () => {
    if (!email.value.match(/@sitpune.edu.in$/)) {
        emailError.textContent = "Please enter valid SIT email ID";
        emailError.style.color = "red";
        emailError.style.display = "inline-block";
        emailError.style.marginBottom = "13px";
        event.preventDefault();
    } 
})

fetch('/', { ... })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      // display the error message on the browser
      console.log(data.error);
    } else {
      // do nothing
    }
  });
