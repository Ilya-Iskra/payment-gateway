import { delay, http, HttpResponse } from "msw";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || window.location.origin;

const createdAt = new Date();
const expiresAt = new Date(createdAt);
expiresAt.setMinutes(createdAt.getMinutes() + 10);
let txHash = null;

export default [
  http.get(`${BASE_URL}/payment`, async ({ request }) => {
    const id = new URL(request.url).searchParams.get("id");

    await delay();

    if (id == 500) return HttpResponse.error();

    if (id == 404) return new HttpResponse(null, { status: 404 });

    return HttpResponse.json({
      data: {
        id,
        url: "ethereum:0x5B7533812759B45C2B44C19e320ba2cD2681b542/transfer?address=0x9B345C57FAD706e349DA441E939282a4bCA0632E&uint256=200000000",
        key: "!xCdIavKuoYxldVrfal:nim @test:nim Exampleservice/Calculator add",
        txHash,
        tokenAddress: "0x5B7533812759B45C2B44C19e320ba2cD2681b542",
        toAddress: "0x9B345C57FAD706e349DA441E939282a4bCA0632E",
        amount: 200000000,
        status: "pending",
        createdAt: createdAt.toISOString(),
        updatedAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
      },
    });
  }),
  http.put(`${BASE_URL}/payment`, async ({ request }) => {
    const { txHash: newTxHash } = await request.json();
    console.log(newTxHash);

    txHash = newTxHash;
    return HttpResponse.json({
      message: "Success!",
    });
  }),
];
