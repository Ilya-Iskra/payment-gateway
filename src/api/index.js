import JSONbigDefault from "json-bigint";
const JSONbig = JSONbigDefault({
  alwaysParseAsBig: true,
  useNativeBigInt: true,
});

import apiKeys from "./keys.json";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || window.location.origin;

async function fetchServer(path, { query, parseBigNumber }) {
  const url = new URL(path, BASE_URL);
  for (const key in query) url.searchParams.set(key, query[key]);

  let response;
  try {
    response = await fetch(url);
  } catch (cause) {
    throw new Error(`A network error occured (${cause.message})`, {
      cause,
    });
  }

  if (!response.ok)
    throw new Error(
      `An error occured: ${response.statusText} (${response.status})`,
      {
        cause: response,
      }
    );

  if (parseBigNumber) {
    const text = await response.text();
    return JSONbig.parse(text);
  }

  return await response.json();
}

export default {
  async [apiKeys.GET_PAYMENT](id) {
    return await fetchServer("/payment", {
      query: { id },
      parseBigNumber: true,
    });
  },
  [apiKeys.SEND_HASH]() {},
};
