import WalletConnectLogo from "/src/assets/walletConnectLogo.svg?react";
import Success from "/src/assets/success.svg?react";
import "./SendTransaction.css";

function ButtonInner({ isPending, isConfirming, isConfirmed }) {
  if (isConfirmed)
    return (
      <span className="send-transaction__inner">
        <span className="send-transaction__text">Transaction is over</span>
        <Success className="send-transaction__icon" />
      </span>
    );
  else if (isConfirming)
    return (
      <span className="send-transaction__text">Transaction is pending</span>
    );
  else if (isPending) return "Confirming";
  else
    return (
      <span className="send-transaction__inner">
        <span className="send-transaction__text">Pay with WalletConnect</span>
        <WalletConnectLogo className="send-transaction__icon" />
      </span>
    );
}

export default function SendTransaction({
  isPending,
  isConfirming,
  isConfirmed,
  onClick,
}) {
  return (
    <>
      <button
        className={`nim-button-1 send-transaction ${isConfirming && "send-transaction--confirming"} ${isConfirmed && "send-transaction--confirmed"}`}
        disabled={isPending || isConfirming || isConfirmed}
        onClick={onClick}
      >
        <ButtonInner
          isPending={isPending}
          isConfirming={isConfirming}
          isConfirmed={isConfirmed}
        />
      </button>
    </>
  );
}
