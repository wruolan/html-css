let ps;
let centerX;
let centerY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = windowWidth / 2;
  centerY = windowHeight / 2;
  ps = new ParticleSystem(createVector(centerX, centerY));
}

function draw() {
  background(0);
  ps.origin.set(mouseX, mouseY);
  ps.addParticle();
  ps.run();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerX = width / 2;
  centerY = height / 2;
}
