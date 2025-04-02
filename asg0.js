// DrawTriangle.js (c) 2012 matsuda



function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  }
  // Get input elements
  var xInput1 = document.getElementById('xIn1');
  var yInput1 = document.getElementById('yIn1');
  var xInput2 = document.getElementById('xIn2');
  var yInput2 = document.getElementById('yIn2');
  var drawInput = document.getElementById('draw');

  var selectInput = document.getElementById('select');
  var scalarInput = document.getElementById('scalarIn');
  var draw2Input = document.getElementById('draw2');

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  //black background for canvas
  function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  clearCanvas();

  function drawVector(v, color) {
    ctx.strokeStyle = color
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200+v.elements[0]*20, 200-v.elements[1]*20);
    ctx.stroke();
  }

  function angleBetween(v1, v2) {
    return Math.acos(Vector3.dot(v1, v2) / (v1.magnitude() * v2.magnitude())) * 180 / Math.PI;
  }

  function areaTriangle(v1, v2) {
    return Vector3.cross(v1, v2).magnitude()/2;
  }

  function handleDrawEvent(){
    clearCanvas();
    var v1 = new Vector3([xInput1.value, yInput1.value, 0]);
    drawVector(v1, 'red');
    var v2 = new Vector3([xInput2.value, yInput2.value, 0]);
    drawVector(v2, 'blue');
  }
  drawInput.onclick = handleDrawEvent;

  function handleDrawOperationEvent(){
    clearCanvas();
    var v1 = new Vector3([xInput1.value, yInput1.value, 0]);
    drawVector(v1, 'red');
    var v2 = new Vector3([xInput2.value, yInput2.value, 0]);
    drawVector(v2, 'blue');
    switch (selectInput.value) {
      case 'add':
        drawVector(v1.add(v2), 'green');
        break;
      case 'sub':
        drawVector(v1.sub(v2), 'green');
        break;
      case 'mul':
        drawVector(v1.mul(scalarInput.value), 'green');
        drawVector(v2.mul(scalarInput.value), 'green');
        break;
      case 'div':
        drawVector(v1.div(scalarInput.value), 'green');
        drawVector(v2.div(scalarInput.value), 'green');
        break;
      case 'magnitude':
        console.log("v1 magnitude: " + v1.magnitude());
        console.log("v2 magnitude: " + v2.magnitude());
        break;
      case 'normalize':
        drawVector(v1.normalize(), 'green');
        drawVector(v2.normalize(), 'green');
        break;
      case 'angle':
        console.log("Angle: " + angleBetween(v1, v2) + " degrees");
        break;
      case 'area':
        console.log("Area: " + areaTriangle(v1, v2));
        break;
    }
  }
  draw2Input.onclick = handleDrawOperationEvent;
}
