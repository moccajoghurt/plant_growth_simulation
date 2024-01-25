function drawBranch(p, x, y, branchThickness, length, angle, depth) {
  if (depth === 0) {
    return;
  }

  // Calculate the end point of the branch
  let endX = x + length * p.cos(angle);
  let endY = y + length * p.sin(angle);

  // Draw the branch
  p.strokeWeight(branchThickness);
  p.line(x, y, endX, endY);

  // Reduce branch thickness and length for sub-branches
  let newThickness = branchThickness * 0.7;
  let newLength = length * 0.7;

  // Recursively draw two sub-branches
  drawBranch(
    p,
    endX,
    endY,
    newThickness,
    newLength,
    angle - p.PI / 4,
    depth - 1
  );
  drawBranch(
    p,
    endX,
    endY,
    newThickness,
    newLength,
    angle + p.PI / 4,
    depth - 1
  );
}

function drawTree(
  leafType,
  leafSize,
  leafCount,
  trunkThickness,
  rootType,
  scaleFactor,
  p
) {
  p.push();
  p.translate(p.width / 2, p.height);
  p.scale(scaleFactor);

  let treeHeight = p.map(trunkThickness, 10, 50, 100, 300) / 2;

  // Draw the trunk
  p.strokeWeight(0);
  p.fill(101, 67, 33);
  p.rect(-trunkThickness / 2, -treeHeight, trunkThickness, treeHeight);

  // Draw branches at the top of the trunk
  p.stroke(101, 67, 33);
  drawBranch(p, 0, -treeHeight, trunkThickness * 0.5, 50, -p.PI / 2, 6);

  // Draw the roots based on rootType
  if (rootType === "outwards") {
    p.line(0, 0, -trunkThickness, 50);
    p.line(0, 0, trunkThickness, 50);
  } else {
    p.line(0, 0, 0, 50);
  }

  // Draw leaves
  p.randomSeed(42); // Set the random seed for consistent results
  p.strokeWeight(0);
  for (let i = 0; i < leafCount; i++) {
    let x = p.random(-100, 100);
    let y = p.random(-treeHeight - 150, -treeHeight);

    if (leafType === "pointed") {
      p.fill(55, 126, 71);
      p.triangle(
        x,
        y,
        x - leafSize / 10,
        y + leafSize,
        x + leafSize / 10,
        y + leafSize
      );
    } else {
      p.fill(34, 139, 34);
      p.ellipse(x, y, leafSize, leafSize / 2);
    }
  }
  p.randomSeed(); // Reset the random seed

  p.pop();
}

export { drawBranch, drawTree };
