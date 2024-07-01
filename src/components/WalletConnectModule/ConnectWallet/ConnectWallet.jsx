import { useAccount, useConfig, useReadContract } from "wagmi";
import { ChainIcon, Avatar } from "connectkit";
import { formatUnits } from "viem";
import abi from "singularitynet-token-contracts/abi/SingularityNetToken.json";
import chains from "singularitynet-token-contracts/networks/SingularityNetToken.json";
import WalletConnectLogo from "/src/assets/walletConnectLogo.svg?react";
import AGIXLogo from "/src/assets/agix.svg?react";
import "./ConnectWallet.css";

function ButtonInner({ isConnected, address, truncatedAddress, chain }) {
  const { address: userAddress } = useAccount();

  const { data: balance } = useReadContract({
    abi,
    address: chain && chains[chain.id].address,
    functionName: "balanceOf",
    args: [userAddress],
  });
  const hasBalance = typeof balance === "bigint";

  const {
    chains: { length: chainsLength },
  } = useConfig();
  const isMultiChain = chainsLength > 1;

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
          className={`connect-wallet__connected-balance ${
            hasBalance && "connect-wallet__connected-balance--loaded"
          }`}
        >
          <span className="connect-wallet__connected-balance-text">
            {hasBalance && formatUnits(balance, 8)}
          </span>
          <div className="connect-wallet__connected-icons">
            <AGIXLogo className="connect-wallet__connected-currency-icon" />
            {isMultiChain && <ChainIcon id={chain.id} size={12} />}
          </div>
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
