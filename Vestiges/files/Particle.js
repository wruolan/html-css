class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.lifespan = 255;
  }
  
  run() {
    this.update();
    this.display();
  }

  update() {
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }
  
  isDead() {
    return this.lifespan <= 0;
  }
  
  display() {
    const distanceToCenter = dist(this.position.x, this.position.y, centerX, centerY);
    const size = map(distanceToCenter, 0, 200, 5, 1);
    stroke(255, this.lifespan);
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, size, size);
  }
}
