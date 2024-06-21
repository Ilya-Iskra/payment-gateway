import { setupWorker } from "msw/browser";
import handlers from "./handlers";

export default async function () {
  return await setupWorker(...handlers).start();
}
