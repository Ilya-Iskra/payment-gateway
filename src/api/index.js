import JSONbigDefault from "json-bigint";
const JSONbig = JSONbigDefault({
  alwaysParseAsBig: true,
  useNativeBigInt: true,
});
import apiKeys from "./keys.json";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL ||
  `${window.location.origin}${import.meta.env.BASE_URL.slice(0, -1)}`;

async function fetchServer(
  path,
  { method = "GET", query, body, parseBigNumber }
) {
  const url = new URL(`${BASE_URL}${path}`);
  for (const key in query) url.searchParams.set(key, query[key]);

  const options = { method };
  if (body && Object.keys(body).length) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, options);
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
  async [apiKeys.SEND_HASH](id, txHash) {
    return await fetchServer("/payment", {
      method: "PUT",
      body: { id, txHash },
    });
  },
};
