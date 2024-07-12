function Arrow(key) {
  let img = document.getElementById("sliderImg");
  let imgPath = img.src.split("/");
  let imgName = imgPath[imgPath.length - 1];
  let imgString = imgName.split(".")[0];
  let imgNum = parseInt(imgString, 10);
  if (key.id === "right") {
    if (imgNum == 4) {
      imgNum = 1;
    } else {
      imgNum = imgNum + 1;
    }
  } else {
    if (imgNum == 1) {
      imgNum = 4;
    } else {
      imgNum = imgNum - 1;
    }
  }
  let lastPath = `imgs/${imgNum}.jpg`;
  img.src = lastPath;
  console.log(lastPath);
}

function gallery(selectedImg) {
  let mainImg = document.getElementById("mainImg");
  mainImg.src = selectedImg.src;
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
