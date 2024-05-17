import { generateRandomNumber } from "/src/utils/utils.js";

export function generatePoints(length) {
  return Array.from({ length }, () => ({
    top: `${generateRandomNumber(0, 100)}%`,
    left: `${generateRandomNumber(0, 100)}%`,
    animationDuration: `${generateRandomNumber(100, 180)}s`,
    animationDelay: `${generateRandomNumber(0, 10)}s`,
  }));
}
