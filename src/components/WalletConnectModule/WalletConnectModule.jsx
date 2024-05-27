import ConnectWallet from "./ConnectWallet";
import SendTransaction from "./SendTransaction";
import { ConnectKitButton } from "connectkit";
import "./WalletConnectModule.css";

function WalletConnectModule() {
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
              address={address}
              truncatedAddress={truncatedAddress}
              chain={chain}
              onClick={show}
            />
            {isConnected && <SendTransaction />}
          </div>
        );
      }}
    </ConnectKitButton.Custom>
  );
}

export default WalletConnectModule;
