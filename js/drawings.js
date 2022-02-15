'use strict'

function drawLine(pos) {
    gCtx.lineWidth = 5;
    gCtx.lineCap = 'round';
    gCtx.lineTo(pos.x, pos.y)
    gCtx.strokeStyle = gBrushColor;
    gCtx.stroke();

    gCtx.beginPath();
    gCtx.moveTo(pos.x, pos.y);
}

function drawSquares(pos) {
    gCtx.beginPath();
    gCtx.lineWidth = 0.5;
    gCtx.rect(pos.x - 50, pos.y - 50, pos.x / 5, pos.y / 5);
    gCtx.strokeStyle = gBrushColor;
    gCtx.stroke();
}

function drawTriangles(pos) {
    gCtx.beginPath();
    gCtx.lineWidth = 0.5;
    gCtx.moveTo(pos.x - 100, pos.y - 100);
    gCtx.lineTo(pos.x * 0.99, pos.y * 0.99);
    gCtx.lineTo(pos.x * 0.95, pos.y * 0.7);
    gCtx.closePath();
    gCtx.strokeStyle = gBrushColor;
    gCtx.stroke();
}

function drawCircle(pos) {
    gCtx.beginPath();
    gCtx.lineWidth = 0.5;
    gCtx.arc(pos.x, pos.y, 100, 0, 2 * Math.PI);
    gCtx.strokeStyle = gBrushColor;
    gCtx.stroke();
}