import { initializePopulation, nextGeneration } from "./GeneticAlgorithm.js";
import { createNeuralNetSketch } from "./NeuralNet.js";
import { createSimulationSketch } from "./Simulation.js";
import { createStatisticsSketch } from "./Statistics.js";
import p5 from "https://cdn.skypack.dev/p5";

function checkAndReset() {
  let viewCompleted = alive
    .slice(displayStartIndex, displayStartIndex + displayCount)
    .every((status) => status === false);

  if (!viewCompleted) return;
  if (isFirstRun) {
    alive.fill(true);
    isFirstRun = false;
  }

  completedSimulations += displayCount;

  if (completedSimulations >= population.length) {
    population = nextGeneration(population, scores);

    scores.fill(0);
    alive.fill(true);
    completedSimulations = 0;
    displayStartIndex = 0;
    currentGeneration++;
  } else {
    displayStartIndex = (displayStartIndex + displayCount) % population.length;
  }

  // Update the canvas and neural_net for the new set of 4 simulations
  for (let i = 0; i < displayCount; i++) {
    const actualIndex = (displayStartIndex + i) % population.length;
    const canvasIndex = i; // Canvas names will be 0 to 3

    if (window["canvas" + canvasIndex]) window["canvas" + canvasIndex].remove();
    if (window["neural_net" + canvasIndex])
      window["neural_net" + canvasIndex].remove();

    const input = tf.tensor2d([
      [sunIntensity, rainIntensity, windIntensity, soilQuality],
    ]);
    const prediction = population[actualIndex].predict(input);
    const values = prediction.dataSync();

    window["canvas" + canvasIndex] = new p5(
      createSimulationSketch(
        values[0],
        values[1],
        values[2],
        sunIntensity,
        rainIntensity,
        windIntensity,
        soilQuality,
        scores,
        alive,
        actualIndex
      ),
      "canvas" + canvasIndex
    );

    window["neural_net" + canvasIndex] = new p5(
      createNeuralNetSketch(population[actualIndex], input, values),
      "neural_net" + canvasIndex
    );
  }
  bestScore = Math.max(...scores) > bestScore ? Math.max(...scores) : bestScore;
  if (window.statistics) window.statistics.remove();
  window.statistics = new p5(
    createStatisticsSketch(currentGeneration, scores, bestScore),
    "statistics"
  );
}

let sunIntensity = Math.random();
let rainIntensity = Math.random();
let windIntensity = Math.random();
let soilQuality = Math.random();

const populationSize = 20;
const scores = new Array(populationSize).fill(0);
const alive = new Array(populationSize).fill(false);
let displayStartIndex = 0;
const displayCount = 4;
let completedSimulations = 0;
let currentGeneration = 1;
let isFirstRun = true;
let bestScore = 0;

let population = initializePopulation(populationSize);

setInterval(checkAndReset, 1000);
