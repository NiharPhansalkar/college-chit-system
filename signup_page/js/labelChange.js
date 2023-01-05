const inputElements = Array.from(document.querySelectorAll(".input-group input"));

console.log(inputElements.length);

for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener("focus", () => {
        inputElements[i].labels[0].classList.add("translate-label");
    })
    inputElements[i].addEventListener("focusout", () => {
        if (inputElements[i].value.length === 0) {
            inputElements[i].labels[0].classList.remove("translate-label");
        }
    })
}
