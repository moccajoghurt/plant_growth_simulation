function displayInformation(p, currentGeneration, scores, bestScore) {
  // Clear previous drawings
  p.clear();
  p.stroke(0);
  p.strokeWeight(1);
  // Display the information
  let textY = 20; // Starting Y position for text
  let lineHeight = 20; // Line height for each text row
  let columnWidth = 50;

  // Displaying each variable with its meaning
  p.text(`Current Generation: ${currentGeneration}`, 10, textY);
  textY += lineHeight;

  p.text(`Best score: ${bestScore}`, 10, textY);
  textY += lineHeight;

  // Display scores
  p.text(`Scores:`, 10, textY);
  textY += lineHeight;

  // Display each score in columns
  scores.forEach((score, index) => {
    let column = index % 4; // Column number (0, 1, 2, or 3)
    let row = Math.floor(index / 4); // Row number

    let x = 10 + column * columnWidth;
    let y = textY + row * lineHeight;

    p.text(score, x, y);
  });
}

function createStatisticsSketch(currentGeneration, scores, bestScore) {
  return (sketch) => {
    sketch.setup = () => {
      sketch.createCanvas(400, 400);
    };

    sketch.draw = () => {
      displayInformation(sketch, currentGeneration, scores, bestScore);
      sketch.noLoop();
    };
  };
}

export { createStatisticsSketch };
