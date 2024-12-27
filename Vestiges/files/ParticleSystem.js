class ParticleSystem {
  constructor(origin) {
    this.origin = origin;
    this.particles = [];
  }
  
  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
  }
  
  run() {
    for (let particle of this.particles) {
      particle.run();
    }
    this.particles = this.particles.filter(particle => !particle.isDead());
  }
}
