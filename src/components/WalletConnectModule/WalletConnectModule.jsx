import ConnectWallet from "./ConnectWallet";
import SendTransaction from "./SendTransaction";
import { ConnectKitButton } from "connectkit";
import "./WalletConnectModule.css";

function WalletConnectModule({
  isPending,
  isConfirming,
  isConfirmed,
  sendTransaction,
}) {
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
                onClick={() => sendTransaction(chain)}
              />
            )}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

export default WalletConnectModule;
