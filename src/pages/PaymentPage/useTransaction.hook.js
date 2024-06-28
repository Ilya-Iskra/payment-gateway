import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import api from "/src/api";
import apiKeys from "/src/api/keys.json";
import chains from "/src/chains";

export default function (paymentId, address, amount) {
  // Sending a transaction
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  async function sendTransaction(chain) {
    await writeContract({
      abi: chains[chain.id].abi,
      address: chains[chain.id].AGIXAddress,
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
