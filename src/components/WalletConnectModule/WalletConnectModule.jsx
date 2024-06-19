import ConnectWallet from "./ConnectWallet";
import SendTransaction from "./SendTransaction";
import ErrorBox from "/src/components/ErrorBox";
import { ConnectKitButton } from "connectkit";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import chains from "/src/chains";
import "./WalletConnectModule.css";

function WalletConnectModule({ address, amount }) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function payWithWallet(chain) {
    writeContract({
      abi: chains[chain.id].abi,
      address: chains[chain.id].AGIXAddress,
      functionName: "transfer",
      args: [address, parseUnits(amount, 8)],
    });
  }

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
