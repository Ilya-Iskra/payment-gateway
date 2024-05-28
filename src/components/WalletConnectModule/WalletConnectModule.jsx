import ConnectWallet from "./ConnectWallet";
import SendTransaction from "./SendTransaction";
import { ConnectKitButton } from "connectkit";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import "./WalletConnectModule.css";

function WalletConnectModule() {
  const {
    data: hash,
    // error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  async function payWithWallet() {
    const to = "0x9B345C57FAD706e349DA441E939282a4bCA0632E";
    const value = "0.0001";
    sendTransaction({ to, value: parseEther(value) });
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
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

export default WalletConnectModule;
