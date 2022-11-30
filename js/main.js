"use strict"

const cards = Array.from(document.querySelectorAll(".card"));

for (let card of cards) {
    card.addEventListener("click", () => {
        console.log(card);
        card.style.transform = "rotateY(180deg)";
        card.addEventListener("transitionend", () => {
            card.children[0].classList.remove("no-rotate-margin")
            card.children[2].classList.remove("text-format-front")
            card.children[0].classList.add("rotated-margin")
            card.children[2].classList.add("text-format-back")
        })
    });
}
