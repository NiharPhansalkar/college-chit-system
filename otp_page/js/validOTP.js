const currUrl = window.location.href;
const otpErr = document.getElementById("otp-error");
let paramString = currUrl.split("?")[1]; // [1] to access the parameters part

window.addEventListener("load", () => {
    if(paramString && paramString.includes("flag=-1")) {
        otpErr.textContent = "Invalid OTP. Please try again.";
        otpErr.style.color = "red";
        otpErr.style.display = "inline-block";
        otpErr.style.marginBottom = "13px";
    }
})
