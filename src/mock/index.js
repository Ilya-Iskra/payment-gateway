import { setupWorker } from "msw/browser";
import handlers from "./handlers";

export default async function () {
  return await setupWorker(...handlers).start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}
