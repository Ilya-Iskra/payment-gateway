import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ConnectWallet from "./ConnectWallet";
import SendTransaction from "./SendTransaction";
import ErrorBox from "/src/components/ErrorBox";
import { ConnectKitButton } from "connectkit";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import chains from "/src/chains";
import api from "/src/api";
import apiKeys from "/src/api/keys.json";
import "./WalletConnectModule.css";

function WalletConnectModule({ id, address, amount }) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  async function payWithWallet(chain) {
    writeContract({
      abi: chains[chain.id].abi,
      address: chains[chain.id].AGIXAddress,
      functionName: "transfer",
      args: [address, amount],
    });
  }

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: ({ id, hash }) => api[apiKeys.SEND_HASH](id, hash),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiKeys.GET_PAYMENT] });
    },
  });

  useEffect(() => {
    if (!hash) return;
    mutate({ id, hash });
  }, [mutate, id, hash]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <ConnectKitButton.Custom>
      {({
        isConnected,
        // isConnecting,
        show,
        // hide,
        address,
        truncatedAddress,
        // ensName,
        chain,
      }) => {
        return (
          <div className="wallet-connect-module">
            <ConnectWallet
              isConnected={isConnected}
              isPending={isPending}
              isConfirming={isConfirming}
              isConfirmed={isConfirmed}
              address={address}
              truncatedAddress={truncatedAddress}
              chain={chain}
              onClick={show}
            />
            {isConnected && (
              <SendTransaction
                isPending={isPending}
                isConfirming={isConfirming}
                isConfirmed={isConfirmed}
                onClick={() => payWithWallet(chain)}
              />
            )}
            <ErrorBox error={error?.shortMessage} />
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

export default WalletConnectModule;
