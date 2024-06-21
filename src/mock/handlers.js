import { http, HttpResponse } from "msw";

export default [
  http.get("/resource", () => HttpResponse.json({ id: "abc-123" })),
];
