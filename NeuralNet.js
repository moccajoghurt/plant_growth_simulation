async function visualizeModel(model, p, startX, startY, input, predictions) {
  const layerGap = 80; // Gap between layers
  const neuronGap = 40; // Gap between neurons in the same layer
  let previousLayerNeurons = []; // To store the positions of neurons in the previous layer

  for (let l = 0; l < model.layers.length; l++) {
    const layer = model.layers[l];
    const weights = layer.getWeights()[0]?.arraySync();
    let currentLayerNeurons = []; // To store the positions of neurons in the current layer

    const isLastLayer = l === model.layers.length - 1;
    const isFirstLayer = l === 0;
    const numNeurons =
      isLastLayer && predictions
        ? predictions.length
        : weights
        ? weights[0].length
        : 0;

    const inputLabels = [
      "Sun Intensity",
      "Rain Intesity",
      "Wind Intesity",
      "Soil Quality",
    ];
    const outputLabels = ["Leaf Size", "Leaf Count", "Trunk Thickness"];
    for (let n = 0; n < numNeurons; n++) {
      let x = startX + l * layerGap;
      let y = startY + n * neuronGap;

      p.ellipse(x, y, 10, 10);
      currentLayerNeurons.push({ x, y });

      if (weights) {
        previousLayerNeurons.forEach((prevNeuron, prevIndex) => {
          let weight = weights[prevIndex][n];
          p.strokeWeight(Math.abs(weight) * 5);
          p.stroke(128);
          p.line(prevNeuron.x, prevNeuron.y, x, y);
        });
      }

      p.strokeWeight(1);
      // Display input values next to the neurons in the first layer
      if (isFirstLayer && input) {
        const inputValue = input.arraySync()[0][n]; // Assuming input tensor is 2D
        p.fill(0);
        p.stroke(1);
        p.text(inputValue.toFixed(2), x - 40, y + 4);
        p.noStroke();
        p.text(inputLabels[n], x - 80, y + 18);
      }

      // Display predictions next to the output neurons
      if (isLastLayer && predictions) {
        p.fill(0);
        p.stroke(1);
        p.text(`${predictions[n].toFixed(2)}`, x + 15, y + 4);
        p.noStroke();
        p.text(outputLabels[n], x + 15, y + 18);
      }
    }

    previousLayerNeurons = currentLayerNeurons;
  }
}

function createNeuralNetSketch(model, input, predictions) {
  return (sketch) => {
    sketch.setup = () => {
      sketch.createCanvas(400, 300);
    };

    sketch.draw = () => {
      visualizeModel(model, sketch, 100, 10, input, predictions);
      sketch.noLoop();
    };
  };
}

export { createNeuralNetSketch };
