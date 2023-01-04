const inputElements = document.querySelectorAll(".input-group input");

for (inputs of inputElements) {
    inputs.addEventListener("focus", () => {
        inputs.nextElementSibling.classList.add("translate-label");
    });
    inputs.addEventListener("focusout", () => {
        inputs.nextElementSibling.classList.remove("translate-label");
    })
}
