const newComplaint = document.getElementById("new-complaint");
const addNew = document.querySelector("#addNew");

newComplaint.addEventListener("click", () => {
    addNew.showModal();
});

addNew.addEventListener("click", () => {
    addNew.close();
});