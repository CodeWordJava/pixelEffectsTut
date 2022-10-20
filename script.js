const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// must match css props to get correct scaling
canvas.width = 800;
canvas.height = 450;

const image1 = new Image();
//if we get an error we can base64 the image and use that b64 sting instead of url
image1.src = "land.jpg";

image1.addEventListener('load', function () {
  ctx.drawImage(image1, 0, 0, canvas.width,canvas.height); //you can scale image by passing canvas.width/a num or canvas.height/num into the arguments on this line
  // to find pixel colours
  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  console.log(scannedImage);
  const scannedData = scannedImage.data;
  for (let i = 0; i < scannedData.length; i += 4) {
    //to greyscale
    const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];
    const averageColourValue = total / 3;
    scannedData[i] = averageColourValue;
    scannedData[i + 1] = averageColourValue ;
    scannedData[i + 2] = averageColourValue ;
  }
  scannedImage.data = scannedData;
  ctx.putImageData(scannedImage, 0, 0);
});
