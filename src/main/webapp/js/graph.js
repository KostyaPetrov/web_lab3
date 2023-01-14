const canvas = document.getElementById('graph'),
    ctx = canvas.getContext('2d');
canvas.height = canvas.width;

let w = canvas.width, h = canvas.height;
const hatchWidth = 5, baseHatchGap = 30;

let hatchGap = 40;


let defoltRadius = 1;
// print graph
function drawGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
// draw x axis
    ctx.beginPath();
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 - 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 + 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();


//draw print y axis

    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 + 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();


//draw single segments

    ctx.beginPath();

    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap);
    // window.alert("message");
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap);
    // ctx.lineTo(w / 2 , h / 2 );
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap * 2);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap * 2);
    ctx.moveTo(w / 2 - hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 - hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap * 2, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap * 2, h / 2 + hatchWidth);
    ctx.stroke();
    ctx.closePath();

//draw shaded area


    ctx.fillStyle = 'rgba(80,92,236,0.33)';
    ctx.beginPath();
    // draw a triangle in the first quarter
    ctx.moveTo(w / 2 + hatchGap, h / 2);
    ctx.lineTo(w / 2, h / 2 - hatchGap);

    //draw a circle in the second quarter
    //(центр окружности два параметра, радиус(1 деление), начало окружности, конец, в данном случае рисовка по часовой стрелке)
    ctx.arc(w / 2, h / 2, hatchGap, 3 / 2 * Math.PI, Math.PI, true);

    // draw a rectangle in the third quarter
    ctx.lineTo(w / 2 - 2 * hatchGap, h / 2);
    ctx.lineTo(w / 2 - 2 * hatchGap, h / 2 + 2 * hatchGap);
    ctx.lineTo(w / 2, h / 2 + 2 * hatchGap);
    ctx.lineTo(w / 2, h / 2);


    ctx.fill();
    ctx.strokeStyle = 'blue';
    ctx.stroke();
    ctx.closePath();

    const axisFontSize = baseHatchGap / 2;
    let letterFontSize = hatchGap / 3;

    ctx.fillStyle = 'black';

    ctx.font = `500 ${axisFontSize * 1.4}px Roboto`;
    ctx.fillText('y', w / 2 - hatchWidth * 4.3, 15)
    ctx.fillText('x', w - 20, h / 2 - hatchWidth * 2.8)


    ctx.font = `800 ${letterFontSize}px Roboto`;
    ctx.fillText('R/2', w / 2 + hatchGap - 8, h / 2 + hatchWidth * 3.2);
    ctx.fillText('R', w / 2 + hatchGap * 2 - 3, h / 2 + hatchWidth * 3.2);
    ctx.fillText('-R/2', w / 2 - hatchGap - 12, h / 2 + hatchWidth * 3.2);
    ctx.fillText('-R', w / 2 - hatchGap * 2 - 8, h / 2 + hatchWidth * 3.2);

    ctx.fillText('R/2', w / 2 + hatchWidth * 2, h / 2 - hatchGap + 3);
    ctx.fillText('R', w / 2 + hatchWidth * 2, h / 2 - hatchGap * 2 + 3);
    ctx.fillText('-R/2', w / 2 + hatchWidth * 2, h / 2 + hatchGap + 3);
    ctx.fillText('-R', w / 2 + hatchWidth * 2, h / 2 + hatchGap * 2 + 3);


}

function drawPointOnGraph(xCenter, yCenter, rValue, isHit) {

    ctx.fillStyle = isHit ? 'ForestGreen' : 'red'

    let x = w / 2 + xCenter * hatchGap * (2 / rValue) - 3;
    let y = h / 2 - yCenter * hatchGap * (2 / rValue) - 3;
    ctx.fillRect(x, y, hatchGap / 10, hatchGap / 10);
}


function getMousePosition(e) {
    let rect = canvas.getBoundingClientRect();

    let mouseX = e.offsetX * canvas.width / canvas.clientWidth | 0;
    let mouseY = e.offsetY * canvas.height / canvas.clientHeight | 0;
    return {x: mouseX, y: mouseY};
}

function checkHit(x, y, r){
    return (x >= 0 && y >= 0 && y<=-x+0.5) || (x<=0 && y>=0 && (x*x)+(y*y)<=(r/2)*(r/2)) || (x<=0 && y<=0 && x<=r && y<=r);
}

function sendDataCanvas(x, y){

    $('#input_form\\:x_button_hidden').val(x);
    $('#input_form\\:y_text').val(y);
    $('#input_form\\:r_select').val(defoltRadius);

    let button = document.getElementById('input_form:sendButton');
    button.click();
}

canvas.addEventListener('click', (event) => {

    const x = getMousePosition(event).x;
    const y = getMousePosition(event).y;
    const xCenter = Math.round((x - w / 2) / (hatchGap * (2 / defoltRadius)) * 1000) / 1000,
        yCenter = Math.round((h / 2 - y) / (hatchGap * (2 / defoltRadius)) * 1000) / 1000;
    console.log(xCenter, yCenter);


    drawPointOnGraph(xCenter, yCenter, defoltRadius, checkHit(xCenter, yCenter, defoltRadius));
    sendDataCanvas(xCenter, yCenter);

});

