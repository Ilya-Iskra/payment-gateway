export function generateRandomNumber(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export async function copyToClipboard(text) {
  if (!text) return;
  await navigator.clipboard.writeText(text);
}
