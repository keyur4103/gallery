// async function getText() {
//   const imgs = ["park", "travel", "sunset", "car", "bike", "cycle", "city"];
//   imgs.forEach(async (img) => {
//     let myObject = await fetch(
//       `https://source.unsplash.com/random/1920x1280/?${img}`
//     );
//     const imaes = document.getElementById("imges");

//     const p = document.createElement("img");
//     p.src = myObject.url;
//     imaes.appendChild(p);
//     console.log(myObject.url);
//   });
// }

// getText();

async function getText() {
  const imgs = ["park", "travel", "sunset", "car", "bike", "cycle", "city"];
  const imaes = document.getElementById("imges");
  const modal = document.getElementById("myModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  const imageUrls = [];

  imgs.forEach(async (img) => {
    try {
      let myObject = await fetch(
        `https://source.unsplash.com/random/1920x1280/?${img}`
      );

      const blob = await myObject.blob(); // Convert the response to a blob
      const imageUrl = URL.createObjectURL(blob); // Get image URL from the blob
      imageUrls.push(imageUrl);

      const p = document.createElement("img");
      p.src = imageUrl;

      const screenHeight = window.innerHeight; // Get the screen height
      const randomHeight =
        Math.floor(Math.random() * (screenHeight - 300)) + 300; // Random height less than screen height

      p.style.height = `${randomHeight}px`;
      const div = document.createElement("div");
      div.id = "grid";
      div.appendChild(p);
      imaes.appendChild(div);
      p.addEventListener("click", () => {
        openModal(imageUrls.indexOf(imageUrl));
      });
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  });

  function openModal(index) {
    modal.style.display = "block";
    modalImg.src = imageUrls[index];

    closeBtn.addEventListener("click", closeModal);
    prevBtn.addEventListener("click", () => navigate(-1));
    nextBtn.addEventListener("click", () => navigate(1));

    function closeModal() {
      modal.style.display = "none";
      closeBtn.removeEventListener("click", closeModal);
      prevBtn.removeEventListener("click", () => navigate(-1));
      nextBtn.removeEventListener("click", () => navigate(1));
    }

    function navigate(direction) {
      index += direction;
      if (index >= imageUrls.length) {
        index = 0; // If at the end, go to the first image
      } else if (index < 0) {
        index = imageUrls.length - 1; // If at the start, go to the last image
      }
      modalImg.src = imageUrls[index];
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        navigate(-1); // Move to the previous image on pressing the left arrow key
      } else if (event.key === "ArrowRight") {
        navigate(1); // Move to the next image on pressing the right arrow key
      }
    });
  }
}

getText();
