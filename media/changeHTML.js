window.addEventListener("message", (event) => {
  const message = event.data;
  if (message.command === "evolveAile") {
    const aileElement = document.querySelector(".aile");
    if (aileElement) {
      aileElement.style.backgroundImage = `url(${message.imageUri})`;
      console.log("Aile evolved : ", message.imageUri);
    }
  }
});
