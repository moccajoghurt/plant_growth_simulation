function drawSoil(quality, p) {
  // Define the base color for poor and good soil
  let poorSoilColor = p.color(101, 67, 33); // Dark Brown
  let goodSoilColor = p.color(139, 69, 19); // Richer Brown

  // Interpolate between the two colors based on quality
  let soilColor = p.lerpColor(poorSoilColor, goodSoilColor, quality);

  // Draw the soil
  p.fill(soilColor);
  p.noStroke();
  p.rect(0, p.height / 1.5, p.width, p.height / 2);

  // Add texture or elements based on quality
  p.randomSeed(42);
  drawRocks(quality, p);
  drawVegetation(quality, p);
  p.randomSeed();
}

function drawRocks(quality, p) {
  // Determine the number of rocks based on soil quality
  // Lower quality (closer to 0) means more rocks, and higher quality (closer to 1) means fewer rocks
  let rockCount = p.map(quality, 0, 1, 20, 2); // Inverse relationship between quality and rock count

  for (let i = 0; i < rockCount; i++) {
    let rockX = p.random(0, p.width); // Random X position
    let rockY = p.random(p.height / 1.5, p.height); // Random Y position in the lower half of the canvas
    let rockSize = p.random(10, 40); // Random size of the rock

    // Set a grayish color for the rocks
    p.fill(100, 100, 100);
    p.noStroke();

    // Draw an ellipse for the rock
    p.ellipse(rockX, rockY, rockSize, rockSize * 0.6); // Rocks are slightly flattened ellipses
  }
}

function drawVegetation(quality, p) {
  // Determine the amount of vegetation based on soil quality
  // Higher quality means more vegetation
  let vegetationCount = p.map(quality, 0, 1, 0, 50);

  for (let i = 0; i < vegetationCount; i++) {
    let plantX = p.random(0, p.width); // Random X position
    let plantY = p.random(p.height / 1.5, p.height); // Random Y position in the lower half of the canvas
    let plantHeight = p.random(10, 40); // Random height of the plant

    // Set a green color for the plants
    p.fill(34, 139, 34);
    p.noStroke();

    // Draw a simple plant (ellipse or line)
    // You can add more complexity here if you want
    p.ellipse(plantX, plantY, 5, plantHeight); // Simple plant representation
  }
}

export { drawSoil };
