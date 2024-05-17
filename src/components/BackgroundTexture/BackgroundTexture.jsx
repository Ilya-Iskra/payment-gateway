import Triangle from "./elements/Triangle.jsx";
import Rectangle from "./elements/Rectangle.jsx";
import Cross from "./elements/Cross.jsx";
import Round from "./elements/Round.jsx";
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
