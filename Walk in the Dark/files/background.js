let colors = [];
let flowField;
let cols, rows;
let resolution = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);
  noStroke();
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  flowField = new Array(cols * rows);
  
  generateRandomMoreSaturatedPastelColors();
  noiseDetail(10, 0.65);
}

function draw() {
  background(100, 10);
  
  let noiseStrength = 0.02;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let angle = noise(i * noiseStrength, j * noiseStrength, frameCount * 0.005) * TWO_PI;
      let x = i * resolution;
      let y = j * resolution;
      
      let lerpAmount = map(y, 0, height, 0, 1);
      let color1 = colors[0];
      let color2 = colors[1];
      let lerpedColor = lerpColor(color1, color2, lerpAmount);
      
      let smoothLerp = lerpColor(lerpedColor, colors[2], 0.1);
      
      fill(smoothLerp.levels[0], smoothLerp.levels[1], smoothLerp.levels[2], 150);
      push();
      translate(x, y);
      rotate(angle);
      rect(0, 0, resolution, resolution);
      pop();
    }
  }
}

function generateRandomMoreSaturatedPastelColors() {
  colors = [];
  for (let i = 0; i < 3; i++) {
    let r = random(50, 200);
    let g = random(50, 200);
    let b = random(50, 200);
    colors.push(color(r, g, b));
  }
}
