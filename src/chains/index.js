import { mainnet, sepolia } from "wagmi/chains";
import mainnetABI from "./mainnet.json";
import sepoliaABI from "./sepolia.json";

export default {
  [mainnet.id]: {
    abi: mainnetABI,
    AGIXAddress: "0x5B7533812759B45C2B44C19e320ba2cD2681b542",
  },
  [sepolia.id]: {
    abi: sepoliaABI,
    AGIXAddress: "0xf703b9aB8931B6590CFc95183be4fEf278732016",
  },
};
