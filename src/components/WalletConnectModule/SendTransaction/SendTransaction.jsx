import WalletConnectLogo from "/src/assets/walletConnectLogo.svg?react";
import "./SendTransaction.css";

function ButtonInner({ isPending }) {
  if (isPending) return "Confirming...";
  else
    return (
      <span className="send-transaction__inner">
        <span className="send-transaction__text">Pay with WalletConnect</span>
        <WalletConnectLogo className="send-transaction__icon" />
      </span>
    );
}

export default function SendTransaction({ isPending, isConfirming, onClick }) {
  return (
    <>
      <button
        className="send-transaction"
        disabled={isPending || isConfirming}
        onClick={onClick}
      >
        <ButtonInner isPending={isPending} />
      </button>
    </>
  );
}
