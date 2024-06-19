import ConnectWallet from "./ConnectWallet";
import SendTransaction from "./SendTransaction";
import ErrorBox from "/src/components/ErrorBox";
import { ConnectKitButton } from "connectkit";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import abi from "/src/chains/abi";
import "./WalletConnectModule.css";

function WalletConnectModule({ address, amount }) {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function payWithWallet() {
    writeContract({
      abi,
      address: "0xf703b9aB8931B6590CFc95183be4fEf278732016",
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
                onClick={payWithWallet}
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
