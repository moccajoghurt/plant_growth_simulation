function drawBar(value, label, color, index, p) {
  let barWidth = 150;
  let barHeight = 10;
  let spacing = 5;
  let rightPadding = 20;
  let topPadding = 20;

  let yPos = topPadding + index * (barHeight + spacing);
  let xPos = p.width - rightPadding - barWidth;

  p.fill(color);
  p.strokeWeight(1);
  p.stroke(0);
  p.rect(xPos, yPos, value * barWidth, barHeight);

  p.fill(0);
  p.noStroke();
  p.textAlign(p.RIGHT, p.TOP);
  p.textSize(12);
  p.text(label, xPos - 5, yPos);
}

function drawScore(score, p) {
  p.fill(0);
  p.strokeWeight(1);
  p.stroke(0);
  p.textAlign(p.LEFT, p.TOP);
  p.textSize(20);
  p.text(`Score: ${score}`, 10, 10);
}

export { drawBar, drawScore };
