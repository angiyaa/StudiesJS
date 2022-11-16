const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const modeBtn = document.getElementById("mode-btn");
const resetBtn = document.getElementById("reset-btn");
const eraseBtn = document.getElementById("erase-btn");
const inputFile = document.getElementById("file");
const inputTxt = document.getElementById("txt");
const downloadBtn = document.getElementById("download-btn");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// initialize the painting brush
ctx.lineWidth = lineWidth.value;
ctx.color = color.value;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event) {
    if(isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
    const selected = event.target.dataset.color;
    // console.dir(event.target) >> to check all the properties of the target obj
    ctx.strokeStyle = selected;
    ctx.fillStyle =  selected;

    // feedback on user's selection
    color.value = selected;
}

function onModeClick() {
    if(isFilling) {
        isFilling = false;
        modeBtn.innerHTML = "Fill";
    } else {
        isFilling = true;
        modeBtn.innerHTML = "Draw";
    }
}

function onCanvasClick(event) {
    if(isFilling) {
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }        
}

function onResetClick() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraseClick(event) {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerHTML = Fill;
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;

    image.onload = function () {
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        inputFile.value = null;
    }
}

function onDBClick(event) {
    const text = inputTxt.value;
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "60px serif";
    ctx.fillText(text, event.offsetX, event.offsetY);
    // ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();
} 

function onDownloadClick() {
    const url = canvas.toDataURL();
    // currently empty as <a></a>
    const a = document.createElement("a"); 
    // <a href="~~"></a>
    a.href = url;
    a.download = "My Drawing.png";
    a.click();
}

// changes on the canvas
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
canvas.addEventListener("dblclick", onDBClick);

// changes on the brush
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorClick));

// buttons
modeBtn.addEventListener("click", onModeClick);
resetBtn.addEventListener("click", onResetClick);
eraseBtn.addEventListener("click", onEraseClick);
inputFile.addEventListener("change", onFileChange);
downloadBtn.addEventListener("click", onDownloadClick);