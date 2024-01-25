class WindParticle {
  constructor(p) {
    this.p = p;
    this.x = p.random(-50, p.width); // Start off-screen for a natural entry
    this.y = p.random(p.height);
    // this.size = p.random(2, 5);
    this.size = 2;
    this.speed = p.random(1, 5);
  }

  move() {
    this.x += this.speed;
    if (this.x > this.p.width) {
      // Reset particle when it goes off-screen
      this.x = this.p.random(-50, 0);
      this.y = this.p.random(this.p.height);
      this.speed = this.p.random(1, 5); // Speed can change each time
    }
  }

  show() {
    this.p.noStroke();
    this.p.fill(255); // White particles, change as needed
    this.p.ellipse(this.x, this.y, this.size, this.size);
  }
}

function drawWind(windParticles, intensity, p) {
  // Adjust the number of particles based on intensity
  let desiredParticles = intensity * 100; // Example scaling

  // Add or remove particles to reach the desired count
  while (windParticles.length < desiredParticles) {
    windParticles.push(new WindParticle(p));
  }
  while (windParticles.length > desiredParticles) {
    windParticles.pop();
  }

  // Update and display each particle
  for (let particle of windParticles) {
    particle.move();
    particle.show();
  }
}

export { WindParticle, drawWind };
