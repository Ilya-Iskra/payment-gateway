import Triangle from "./elements/triangle.svg?react";
import Rectangle from "./elements/rectangle.svg?react";
import Cross from "./elements/cross.svg?react";
import Round from "./elements/round.svg?react";
import Waves from "./elements/Waves.jsx";
import { generatePoints } from "./BackgroundTexture.helpers.js";
import "./BackgroundTexture.css";

const NUMBER_OF_FIGURES = 25;
const figures = {
  triangles: generatePoints(NUMBER_OF_FIGURES),
  rectangles: generatePoints(NUMBER_OF_FIGURES),
  crosses: generatePoints(NUMBER_OF_FIGURES),
  rounds: generatePoints(NUMBER_OF_FIGURES),
};

function BackgroundTexture() {
  return (
    <div className="background-texture">
      {figures.triangles.map((style, i) => (
        <Triangle key={i} style={style} />
      ))}
      {figures.rectangles.map((style, i) => (
        <Rectangle key={i} style={style} />
      ))}
      {figures.crosses.map((style, i) => (
        <Cross key={i} style={style} />
      ))}
      {figures.rounds.map((style, i) => (
        <Round key={i} style={style} />
      ))}
      <Waves />
    </div>
  );
}

export default BackgroundTexture;
