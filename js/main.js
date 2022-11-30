const cardContent = Array.from(document.querySelectorAll(".card-content"));

cardContent.forEach((individualCard) => {
    individualCard.addEventListener("click", () => {
        individualCard.classList.toggle("is-flipped");
    })
})
