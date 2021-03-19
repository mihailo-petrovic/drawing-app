// ----- VARIABLES -----
let canvas = document.getElementById("innerContainer");
const cursorSelect = document.getElementById("cursorSelect");
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
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  drawListeners();
};

cursorSelect.addEventListener("change", () => {
  removeListeners();
  switch (cursorSelect.value) {
    case "draw":
      drawListeners();
      break;
    case "line":
      lineListeners();
      break;
    case "rect":
      rectListeners();
      break;
    case "circ":
      circListeners();
      break;
  }
});
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
    pos.x = e.changedTouches[0].clientX;
    pos.y = e.changedTouches[0].clientY;
  }
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

function drawLine(e) {
  if (flag == false) return;

  let oldX = pos.x;
  let oldY = pos.y;
  setPosition(e);

  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.lineWidth = lineObj.width;
  ctx.strokeStyle = lineObj.color;
  ctx.moveTo(oldX, oldY);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
}

function drawRect(e) {
  if (flag == false) return;

  let oldX = pos.x;
  let oldY = pos.y;
  setPosition(e);
  let width = pos.x - oldX;
  let height = pos.y - oldY;

  ctx.beginPath();
  ctx.lineWidth = lineObj.width;
  ctx.strokeStyle = lineObj.color;
  ctx.rect(oldX, oldY, width, height);
  ctx.stroke();
}

function drawCirc(e) {
  if (flag == false) return;

  let oldX = pos.x;
  let oldY = pos.y;
  setPosition(e);
  let w = Math.abs(oldX - pos.x);
  let h = Math.abs(oldY - pos.y);
  let radius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));

  ctx.beginPath();
  ctx.lineWidth = lineObj.width;
  ctx.strokeStyle = lineObj.color;
  ctx.arc(oldX, oldY, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function removeFlag() {
  flag = false;
}

function removeListeners() {
  canvas.removeEventListener("touchstart", setPosition);
  canvas.removeEventListener("touchmove", draw);
  canvas.removeEventListener("touchend", removeFlag);
  canvas.removeEventListener("touchcancel", removeFlag);
  canvas.removeEventListener("mousemove", draw);
  canvas.removeEventListener("mousedown", setPosition);
  canvas.removeEventListener("mouseleave", removeFlag);
  canvas.removeEventListener("mouseup", removeFlag);
  canvas.removeEventListener("touchend", drawLine);
  canvas.removeEventListener("mouseup", drawLine);
  canvas.removeEventListener("touchend", drawRect);
  canvas.removeEventListener("mouseup", drawRect);
  canvas.removeEventListener("touchend", drawCirc);
  canvas.removeEventListener("mouseup", drawCirc);
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

function drawListeners() {
  canvas.addEventListener("touchstart", setPosition);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", removeFlag);
  canvas.addEventListener("touchcancel", removeFlag);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mousedown", setPosition);
  canvas.addEventListener("mouseleave", removeFlag);
  canvas.addEventListener("mouseup", removeFlag);
}
function lineListeners() {
  canvas.addEventListener("touchstart", setPosition);
  canvas.addEventListener("touchend", drawLine);
  canvas.addEventListener("touchcancel", removeFlag);
  canvas.addEventListener("mousedown", setPosition);
  canvas.addEventListener("mouseleave", removeFlag);
  canvas.addEventListener("mouseup", drawLine);
}
function rectListeners() {
  canvas.addEventListener("touchstart", setPosition);
  canvas.addEventListener("touchend", drawRect);
  canvas.addEventListener("touchcancel", removeFlag);
  canvas.addEventListener("mousedown", setPosition);
  canvas.addEventListener("mouseleave", removeFlag);
  canvas.addEventListener("mouseup", drawRect);
}
function circListeners() {
  canvas.addEventListener("touchstart", setPosition);
  canvas.addEventListener("touchend", drawCirc);
  canvas.addEventListener("touchcancel", removeFlag);
  canvas.addEventListener("mousedown", setPosition);
  canvas.addEventListener("mouseleave", removeFlag);
  canvas.addEventListener("mouseup", drawCirc);
}
