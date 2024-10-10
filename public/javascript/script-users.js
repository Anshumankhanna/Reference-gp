const newComplaint = document.getElementById("new-complaint");
const addNew = document.querySelector(".add-new");

newComplaint.addEventListener("click", () => {
    const addNewStyle = addNew.style;
    
    addNewStyle.zIndex = "1";
    addNewStyle.scale = "1";
});