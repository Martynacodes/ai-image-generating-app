// var API_KEY = "your api key";
import { API_KEY } from "./config.js";

const submitBtn = document.querySelector(".submit-button");
const inputBox = document.querySelector("#search-input");
const imagesSection = document.querySelector(".images-section");
const loadingIcon = document.querySelector(".loading-icon");

const showLoadingIcon = () => {
  loadingIcon.style.display = "block";
};

const hideLoadingIcon = () => {
  loadingIcon.style.display = "none";
};

const generateImages = async () => {
  try {
    showLoadingIcon();
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: inputBox.value,
        n: 4,
        size: "1024x1024",
      }),
    };

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();
    console.log(data);
    hideLoadingIcon();
    data?.data.forEach((imageObject) => {
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");

      const image = document.createElement("img");
      image.setAttribute("src", imageObject.url);
      imageContainer.appendChild(image);
      imagesSection.appendChild(imageContainer);
    });
  } catch (error) {
    console.error(error);
  }
};

submitBtn.addEventListener("click", generateImages);
