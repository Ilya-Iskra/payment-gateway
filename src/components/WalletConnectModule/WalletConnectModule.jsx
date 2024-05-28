import ConnectWallet from "./ConnectWallet";
import SendTransaction from "./SendTransaction";
import ErrorBox from "../ErrorBox";
import { ConnectKitButton } from "connectkit";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import "./WalletConnectModule.css";

function WalletConnectModule({ address, amount }) {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function payWithWallet() {
    sendTransaction({ to: address, value: parseEther(amount) });
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
