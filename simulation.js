import { createRain } from "./Rain.js";
import { drawSun } from "./Sun.js";
import { drawWind } from "./Wind.js";
import { drawTree } from "./Tree.js";
import p5 from "https://cdn.skypack.dev/p5";

// Define separate sketch functions for each canvas
function createSketch(
  treeType,
  leafSize,
  leafCount,
  trunkThickness,
  rootType,
  scaleFactor,
  sunIntensity,
  rainIntensity,
  windIntensity
) {
  let raindrops = [];
  let windParticles = [];
  return (sketch) => {
    sketch.setup = () => {
      sketch.createCanvas(400, 400); // Adjust size as needed
    };

    sketch.draw = () => {
      sketch.background(200);
      drawSun(sunIntensity, sketch);
      drawTree(
        treeType,
        leafSize,
        leafCount,
        trunkThickness,
        rootType,
        scaleFactor,
        sketch
      );
      createRain(raindrops, rainIntensity, sketch);
      drawWind(windParticles, windIntensity, sketch);
    };
  };
}

// Create four p5 instances with different parameters
new p5(
  createSketch("pointed1", 50, 50, 40, "outwards", 1.0, 1, 2, 1),
  "canvas1"
);
new p5(
  createSketch("pointed2", 60, 40, 35, "inwards", 1.1, 0.5, 1, 2),
  "canvas2"
);
new p5(
  createSketch("rounded", 45, 60, 30, "outwards", 1.2, 0.3, 3, 3),
  "canvas3"
);
new p5(
  createSketch("pointed3", 55, 55, 45, "inwards", 1.0, 0.1, 2, 4),
  "canvas4"
);
