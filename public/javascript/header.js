const imagesPath = "/images/";
const page = document.querySelector("#page-bg-img");
const errorBlock = document.querySelector(".error-block");

let pageBgImgArr = ["building-photo.png", "students-in-front-of-building.jpg", "building-photo-2.png"];
let intervalCounter = 0;

const vanish = (element) => {
    setTimeout(() => {
        element.style.opacity = "0";
    }, 4000);
    setTimeout(() => {
        element.remove();
    }, 5000);
}

if (errorBlock !== null) {
    vanish(errorBlock);
}

const pageBgImgInterval = setInterval(() => {
    page.style.backgroundImage = `url(${imagesPath}${pageBgImgArr[intervalCounter]})`;
    intervalCounter = intervalCounter + 1 == pageBgImgArr.length? 0 : intervalCounter + 1;
}, 4000);