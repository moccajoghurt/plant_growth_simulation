function drawSun(intensity, p) {
  // Map the intensity to background color and sun opacity
  let bgColor = p.lerpColor(
    p.color(200, 200, 200),
    p.color(135, 206, 250),
    intensity
  );
  let sunOpacity = intensity * 255;

  // Set the background
  p.background(bgColor);

  // Draw the sun with varying opacity
  p.noStroke();
  p.fill(255, 255, 0, sunOpacity);
  p.ellipse(50, 50, 100, 100); // Position and size of the sun
}

export { drawSun };
