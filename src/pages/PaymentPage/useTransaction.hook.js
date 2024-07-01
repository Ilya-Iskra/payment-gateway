import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import abi from "singularitynet-token-contracts/abi/SingularityNetToken.json";
import chains from "singularitynet-token-contracts/networks/SingularityNetToken.json";
import api from "/src/api";
import apiKeys from "/src/api/keys.json";

export default function (paymentId, address, amount) {
  // Sending a transaction
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  async function sendTransaction(chain) {
    await writeContract({
      abi,
      address: chains[chain.id].address,
      functionName: "transfer",
      args: [address, amount],
    });
  }
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Sending transaction hash to the backend
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ paymentId, hash }) =>
      api[apiKeys.SEND_HASH](paymentId, hash),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiKeys.GET_PAYMENT] });
    },
  });
  useEffect(() => {
    if (!hash) return;
    mutate({ paymentId, hash });
  }, [mutate, paymentId, hash]);

  return {
    sendTransaction,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}
