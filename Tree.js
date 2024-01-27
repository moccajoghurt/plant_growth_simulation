function drawBranch(
  p,
  x,
  y,
  branchThickness,
  length,
  angle,
  depth,
  scaleFactor,
  initialCall = true
) {
  if (depth === 0) {
    return;
  }

  // Apply scaleFactor only on the initial call
  if (initialCall) {
    branchThickness *= scaleFactor;
    length *= scaleFactor;
  }

  // Calculate the end point of the branch
  let endX = x + length * p.cos(angle);
  let endY = y + length * p.sin(angle);

  // Draw the branch
  p.strokeWeight(branchThickness);
  p.line(x, y, endX, endY);

  // Reduce branch thickness and length for sub-branches
  let newThickness = branchThickness * 0.6;
  let newLength = length * 0.7;

  // Recursively draw two sub-branches without applying the scaleFactor again
  drawBranch(
    p,
    endX,
    endY,
    newThickness,
    newLength,
    angle - p.PI / 4,
    depth - 1,
    scaleFactor,
    false // Indicate that this is not the initial call
  );
  drawBranch(
    p,
    endX,
    endY,
    newThickness,
    newLength,
    angle + p.PI / 4,
    depth - 1,
    scaleFactor,
    false // Indicate that this is not the initial call
  );
}

function drawTree(
  leafSizeParam,
  leafCountParam,
  trunkThickness,
  p,
  scaleFactor
) {
  let leafSize = p.map(leafSizeParam, 0, 1, 5, 100) * scaleFactor;
  let leafCount = p.map(leafCountParam, 0, 1, 10, 100);
  trunkThickness = trunkThickness * 10 * scaleFactor;
  let treeHeight = p.map(trunkThickness, 0, 10, 1, 200) * scaleFactor;
  let canvasHeight = p.height;
  let yTopOfTrunk = canvasHeight - treeHeight - 20 * scaleFactor;

  // Draw the trunk
  trunkThickness *= 4;
  p.strokeWeight(1);
  p.stroke(50);
  p.fill(101, 67, 33);
  p.rect(p.width / 2, yTopOfTrunk, trunkThickness, treeHeight);

  // Draw branches at the top of the trunk
  p.strokeWeight(5 * scaleFactor);
  p.stroke(101, 67, 33);
  drawBranch(
    p,
    p.width / 2 + trunkThickness / 2,
    yTopOfTrunk,
    trunkThickness * 0.8,
    50 * scaleFactor,
    -p.PI / 2,
    6,
    scaleFactor // Pass scaleFactor to drawBranch
  );

  // Draw leaves
  p.randomSeed(42); // Set the random seed for consistent results
  p.strokeWeight(0);
  for (let i = 0; i < leafCount; i++) {
    // Calculate x within a range around the trunk
    let xRangeMin = p.width / 2 - treeHeight * scaleFactor; // Adjust the range based on the tree height and scale
    let xRangeMax = p.width / 2 + treeHeight * scaleFactor;
    let x = p.random(xRangeMin, xRangeMax);

    // Calculate y within a range above the top of the trunk, where branches are likely to be
    let yRangeMin = yTopOfTrunk - treeHeight * scaleFactor * 1.5; // Adjust upwards for branch area
    let yRangeMax = yTopOfTrunk - treeHeight * scaleFactor * 0.5; // Closer to the top of the trunk
    let y = p.random(yRangeMin, yRangeMax);

    p.fill(34, 139, 34);
    p.ellipse(x, y, leafSize, leafSize / 2);
  }
  p.randomSeed(); // Reset the random seed
}

export { drawBranch, drawTree };
