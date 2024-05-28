import { useBalance } from "wagmi";
import { ChainIcon, Avatar } from "connectkit";
import WalletConnectLogo from "/src/assets/walletConnectLogo.svg?react";
import "./ConnectWallet.css";

function ButtonInner({ isConnected, address, truncatedAddress, chain }) {
  const { data: balance } = useBalance({
    address,
  });

  if (!isConnected)
    return (
      <span className="connect-wallet__not-connected">
        <span className="connect-wallet__not-connected-text">
          Connect wallet
        </span>
        <WalletConnectLogo className="connect-wallet__not-connected-icon" />
      </span>
    );
  else
    return (
      <span className="connect-wallet__connected">
        <span className="connect-wallet__connected-address">
          <Avatar address={address} size={24} />{" "}
          <span className="connect-wallet__connected-text">
            {truncatedAddress}
          </span>
        </span>
        <span
          className={`connect-wallet__connected-balance ${balance?.formatted && "connect-wallet__connected-balance--loaded"}`}
        >
          <span className="connect-wallet__connected-balance-text">
            {balance?.formatted}
          </span>
          <ChainIcon id={chain.id} size={16} />
        </span>
      </span>
    );
}

export default function ConnectWallet({
  isConnected,
  isPending,
  isConfirming,
  isConfirmed,
  address,
  truncatedAddress,
  chain,
  onClick,
}) {
  return (
    <button
      className="nim-button-1 connect-wallet"
      disabled={isPending || isConfirming || isConfirmed}
      onClick={onClick}
    >
      <ButtonInner
        isConnected={isConnected}
        address={address}
        truncatedAddress={truncatedAddress}
        chain={chain}
      />
    </button>
  );
}
