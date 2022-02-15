'use strict'

var gElCanvas;
var gCtx;
var gPaint = false;
var gShape;
var gBrushColor;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.getElementById('my-canvas');
    gCtx = gElCanvas.getContext('2d');

    gShape = 'line';

    resizeCanvas();
    addListeners();
}

function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function (event) {
        console.log('onload');
        var img = new Image()
        // Render on canvas
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    console.log('after');
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function onDown(ev) {
    gPaint = true;
    draw(ev)
}

function onUp() {
    console.log('onUp()');
    gCtx.beginPath();
    gPaint = false;
}

function draw(ev) {
    if (!gPaint) return;
    const pos = getEvPos(ev);
    // console.log(gShape)

    if (gShape === 'square') {
        drawSquares(pos);
        return
    }
    else if (gShape === 'triangle') {
        drawTriangles(pos);
        return
    }
    else if (gShape === 'circle') {
        drawCircle(pos);
        return
    }
    else if (gShape === 'line') {
        drawLine(pos);
        return
    }
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', draw)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', draw)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onSetBgColor(backgroundColor) {
    gCtx.fillStyle = backgroundColor;
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetColor(color) {
    gBrushColor = color;
}

function onSelectShape(shape) {
    gShape = shape;
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 40;
    gElCanvas.height = elContainer.offsetHeight - 300;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}