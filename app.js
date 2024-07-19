function Arrow(key) {
  let img = document.getElementById("sliderImg");
  let imgPath = img.src.split("/");
  console.log(imgPath);
  let imgName = imgPath[imgPath.length - 1];
  console.log(imgName);
  let imgString = imgName.split(".")[0];
  let imgNum = parseInt(imgString[2], 10);
  console.log(imgNum);
  if (key.id === "right") {
    if (imgNum == 6) {
      imgNum = 1;
    } else {
      imgNum = imgNum + 1;
    }
  } else {
    if (imgNum == 1) {
      imgNum = 6;
    } else {
      imgNum = imgNum - 1;
    }
  }
  let lastPath = `imgs/bg${imgNum}.jpg`;
  img.src = lastPath;
}

function gallery(selectedImg) {
  let mainImg = document.getElementById("mainImg");
  console.log(selectedImg.src);
  mainImg.src = selectedImg.src;
  console.log(mainImg.src);
  let mainImgNum = mainImg.src
    .split("/")
    [mainImg.src.split("/").length - 1].split(".")[1];
  let imgId = `img.${mainImgNum}`;
}

// Integrating with Mongo DB

class ModelsGallery {
  constructor(imgPath, carName, url) {
    this.imgPath = imgPath;
    this.carName = carName;
    this.url = url;
  }
  generateGalleryHTML() {
    let html =
      '<div class="card">' +
      '<div class="img">' +
      "<img src=" +
      this.imgPath +
      ' alt="" />' +
      "</div>" +
      '<div class="info">' +
      '<div class="name">' +
      "<h3>" +
      this.carName +
      "</h3>" +
      "</div>" +
      "<a href=" +
      this.url +
      ">View</a>" +
      "</div>" +
      "</div>";

    return html;
  }
}

let modelsContainer = document.getElementById("modelsContainer");
data = [];

const getAllCars = async () => {
  try {
    const res = await axios
      .get("http://localhost:3000/api/cars")
      .then((res) => (res = res.data));
    for (let i = 0; i < res.length; i++) {
      obj = new ModelsGallery(res[i].imgPath, res[i].carName, res[i].url);
      modelsContainer.insertAdjacentHTML(
        "beforeend",
        obj.generateGalleryHTML()
      );
    }
  } catch (e) {
    console.log("Error message :", e.message);
  }
};
getAllCars();

let aboutVideo = document.getElementById("aboutVideo");
function handleVidoeClick() {
  aboutVideo.muted = !aboutVideo.muted;
}

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Kiểm tra nếu thẻ a đã có lớp highlight
    if (link.classList.contains("highlight")) {
      link.classList.remove("highlight"); // Loại bỏ lớp highlight nếu đã có
    } else {
      link.classList.add("highlight"); // Thêm lớp highlight nếu chưa có
    }
  });
});
