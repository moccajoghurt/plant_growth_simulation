function createModel() {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ inputShape: [4], units: 4, activation: "sigmoid" })
  ); // Assuming 4 environmental inputs
  model.add(
    tf.layers.dense({ inputShape: [4], units: 3, activation: "sigmoid" })
  );
  model.add(tf.layers.dense({ units: 3, activation: "sigmoid" })); // 3 outputs: leaf size, leaf amount, trunk thickness, constrained between 0 and 1
  return model;
}

function initializePopulation(populationSize) {
  let population = [];
  for (let i = 0; i < populationSize; i++) {
    population.push(createModel());
  }
  return population;
}

function selectBestModels(population, scores, numBest) {
  // Create an array of indices from 0 to population.length - 1
  let indices = Array.from({ length: population.length }, (_, i) => i);
  indices.sort((a, b) => scores[b] - scores[a]);
  let bestIndices = indices.slice(0, numBest);
  // Return the models corresponding to the best indices
  return bestIndices.map((index) => population[index]);
}

function crossoverByAverage(parentA, parentB) {
  // Perform crossover between two models by averaging their weights
  let offspring = createModel();
  let weightsA = parentA.getWeights();
  let weightsB = parentB.getWeights();
  let newWeights = weightsA.map((weightA, index) => {
    let weightB = weightsB[index];
    return weightA.mul(0.5).add(weightB.mul(0.5));
  });

  offspring.setWeights(newWeights);
  return offspring;
}

function crossoverByRandomWeightSelection(parentA, parentB) {
  let offspring = createModel();
  let weightsA = parentA.getWeights();
  let weightsB = parentB.getWeights();
  let newWeights = weightsA.map((weightA, index) => {
    if (Math.random() > 0.5) {
      return weightA;
    } else {
      return weightsB[index];
    }
  });

  offspring.setWeights(newWeights);
  return offspring;
}

function crossoverByLayers(parentA, parentB) {
  let offspring = createModel();
  let weightsA = parentA.getWeights();
  let weightsB = parentB.getWeights();
  let newWeights = [];

  for (let i = 0; i < weightsA.length; i++) {
    if (i % 2 === 0) {
      // For example, choose even layers from parentA and odd layers from parentB
      newWeights.push(weightsA[i]);
    } else {
      newWeights.push(weightsB[i]);
    }
  }

  offspring.setWeights(newWeights);
  return offspring;
}

function mutate(model, mutationRate) {
  const mutatedWeights = model.getWeights().map((weight) => {
    const shape = weight.shape;
    const values = weight.dataSync().slice();

    for (let i = 0; i < values.length; i++) {
      if (Math.random() < mutationRate) {
        const mutation = Math.random() * 0.1 - 0.05;
        values[i] += mutation;
      }
    }
    return tf.tensor(values, shape); // Create a new tensor with the mutated values
  });

  model.setWeights(mutatedWeights); // Update the model with the mutated weights
}

function selectTwoParents(models) {
  const parentAIndex = Math.floor(Math.random() * models.length);
  const parentA = models[parentAIndex];

  let parentBIndex = Math.floor(Math.random() * models.length);
  // Ensure parentB is not the same as parentA
  while (parentBIndex === parentAIndex) {
    parentBIndex = Math.floor(Math.random() * models.length);
  }
  const parentB = models[parentBIndex];

  return [parentA, parentB];
}

function nextGeneration(population, scores) {
  let newPopulation = [];
  let bestModels = selectBestModels(population, scores, 10); // Select top 10 models

  while (newPopulation.length < population.length) {
    let [parentA, parentB] = selectTwoParents(bestModels);
    let offspring = crossoverByAverage(parentA, parentB);
    mutate(offspring, 0.1); // mutation rate
    newPopulation.push(offspring);
  }

  return newPopulation;
}

export { initializePopulation, nextGeneration };
