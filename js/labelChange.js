const inputElements = Array.from(document.querySelectorAll(".input-group input"));

for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].value !== "") {
        inputElements[i].labels[0].classList.add("translate-label");
    }else {
        inputElements[i].labels[0].classList.remove("translate-label");
    }
    inputElements[i].addEventListener("focus", () => {
        inputElements[i].labels[0].classList.add("translate-label");
    })
    inputElements[i].addEventListener("focusout", () => {
        inputElements[i].labels[0].classList.remove("translate-label");
    })
}
