import { createRain } from "./Rain.js";
import { drawSun } from "./Sun.js";
import { drawWind } from "./Wind.js";
import { drawTree } from "./Tree.js";
import { drawSoil } from "./Soil.js";
import { calculateNeed, calculateHealthState } from "./Fitness.js";
import { drawBar, drawScore } from "./Bars.js";

function createSimulationSketch(
  leafSize,
  leafCount,
  trunkThickness,
  sunIntensity,
  rainIntensity,
  windIntensity,
  soilQuality,
  score,
  alive,
  index
) {
  let raindrops = [];
  let windParticles = [];
  let sunHealth = 1;
  let waterHealth = 1;
  let soilHealth = 1;
  let windHealth = 1;
  let healthStepsizeMultiplier = 0.05;

  return (sketch) => {
    sketch.setup = () => {
      sketch.createCanvas(400, 300);
    };

    sketch.draw = () => {
      const treeScale = 1 - Math.exp(-score[index] / 300);
      if (treeScale > 1) {
        treeScale = 1;
      }
      drawSun(sunIntensity, sketch);
      drawSoil(soilQuality, sketch);
      drawTree(leafSize, leafCount, trunkThickness, sketch, treeScale);
      drawWind(windParticles, windIntensity, sketch);
      createRain(raindrops, rainIntensity, sketch);
      drawScore(score[index], sketch);

      let sunNeed = calculateNeed(leafSize, trunkThickness);
      let waterNeed = calculateNeed(trunkThickness, leafCount);
      let soilQualityNeed = calculateNeed(leafCount, leafSize);
      let windRobustness = calculateNeed(leafCount, leafSize);

      sunHealth = calculateHealthState(
        sunNeed,
        sunIntensity,
        sunHealth,
        healthStepsizeMultiplier
      );
      waterHealth = calculateHealthState(
        waterNeed,
        rainIntensity,
        waterHealth,
        healthStepsizeMultiplier
      );
      soilHealth = calculateHealthState(
        soilQualityNeed,
        soilQuality,
        soilHealth,
        healthStepsizeMultiplier
      );
      windHealth = calculateHealthState(
        windRobustness,
        windIntensity,
        windHealth,
        healthStepsizeMultiplier
      );

      drawBar(
        sunHealth,
        "Sun Nourishment",
        sketch.color(255, 204, 0),
        0,
        sketch
      );
      drawBar(waterHealth, "Hydration", sketch.color(0, 0, 255), 1, sketch);
      drawBar(
        soilHealth,
        "Soil Nutrients",
        sketch.color(120, 67, 21),
        2,
        sketch
      );
      drawBar(
        windHealth,
        "Wind Robustness",
        sketch.color(128, 128, 128),
        3,
        sketch
      );
      if (
        sunHealth > 0 &&
        waterHealth > 0 &&
        soilHealth > 0 &&
        windHealth > 0
      ) {
        score[index] += 1;
      } else {
        alive[index] = false;
      }
    };
  };
}

export { createSimulationSketch };
