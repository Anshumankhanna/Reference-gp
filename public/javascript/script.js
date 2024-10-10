const select = document.querySelector("select");

select.addEventListener("click", () => {
    if (select.selectedIndex > 0) {
        select.style.color = "#000";
    }
});