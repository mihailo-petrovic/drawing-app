// ----- VARIABLES -----
const canvas = document.getElementById("innerContainer");
const widthSelect = document.getElementById("widthSelect");
const colorSelect = document.getElementById("colorSelect");
const clearAllBtn = document.getElementById("clearAllBtn");
const saveImageBtn = document.getElementById("saveImageBtn");

var ctx = canvas.getContext("2d");
ctx.canvas.width = canvas.clientWidth;
ctx.canvas.height = canvas.clientHeight;

var pos = { x: 0, y: 0 };
var flag = false;

var lineObj = {
  width: 1,
  color: "#000",
};

// ----- LISTENERS -----
window.onload = () => {
  lineObj.width = widthSelect.value;
  ctx.fillStyle = '#fff'
};

canvas.addEventListener("touchstart", setPosition);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", removeFlag);
canvas.addEventListener("touchcancel", removeFlag);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", setPosition);
canvas.addEventListener("mouseleave", removeFlag);
canvas.addEventListener("mouseup", removeFlag);

widthSelect.addEventListener("change", (e) => {
  lineObj.width = e.target.value;
});
colorSelect.addEventListener("change", (e) => {
  lineObj.color = e.target.value;
});

saveImageBtn.addEventListener("click", saveImage);
clearAllBtn.addEventListener("click", clearAll);

// ----- FUNCTIONS -----
function setPosition(e) {
  e.preventDefault();
  flag = true;
  if (e.clientX) {
    pos.x = e.clientX;
    pos.y = e.clientY;
  } else if (e.touches) {
    pos.x = e.touches[0].clientX;
    pos.y = e.touches[0].clientY;
  }
  return;
}

function draw(e) {
  if (flag == false) return;

  ctx.beginPath();

  ctx.lineCap = "round";
  ctx.lineWidth = lineObj.width;
  ctx.strokeStyle = lineObj.color;

  ctx.moveTo(pos.x, pos.y);
  setPosition(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function removeFlag() {
  flag = false;
}

function saveImage() {
  let c = window.confirm("Save image as 'myImage.png'?");
  if (c) {
    var link = document.createElement("a");
    link.download = "myImage.png";
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
    return;
  }
}

function clearAll() {
  let c = window.confirm("Are you sure?");
  if (c) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
}
