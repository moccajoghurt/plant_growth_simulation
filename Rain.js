class Raindrop {
  constructor(p) {
    this.p = p;
    this.x = p.random(p.width);
    this.y = p.random(-p.height, 0);
    this.z = p.random(0, 20);
    this.len = p.map(this.z, 0, 20, 10, 20);
    this.yspeed = p.map(this.z, 0, 20, 1, 20);
  }

  fall() {
    this.y += this.yspeed;
    let grav = this.p.map(this.z, 0, 20, 0, 0.2);
    this.yspeed += grav;

    if (this.y > this.p.height) {
      this.y = this.p.random(-200, -100);
      this.yspeed = this.p.map(this.z, 0, 20, 4, 10);
    }
  }

  show() {
    this.p.fill(0, 0, 255); // Blue color
    this.p.strokeWeight(1);
    this.p.stroke(138, 43, 226);
    this.p.line(this.x, this.y, this.x, this.y + this.len);
  }
}

function createRain(raindrops, intensity, p) {
  // Adjust the number of raindrops based on intensity
  let desiredDrops = p.map(intensity, 0, 1, 0.1, 20);

  // Add or remove raindrops to reach the desired count
  while (raindrops.length < desiredDrops) {
    raindrops.push(new Raindrop(p));
  }
  while (raindrops.length > desiredDrops) {
    raindrops.pop();
  }

  // Update and display each raindrop
  for (let drop of raindrops) {
    drop.fall();
    drop.show();
  }
}

export { Raindrop, createRain };
