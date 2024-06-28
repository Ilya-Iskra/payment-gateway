import { useState } from "react";
import { formatUnits } from "viem";
import usePayment from "./usePayment.hook";
import useTransaction from "./useTransaction.hook";
import Centered from "/src/layouts/Cetnered/Centered.layout";
import ContentBox from "/src/components/ContentBox";
import CountdownTimer from "/src/components/CountdownTimer";
import QRCode from "/src/components/QRCode";
import CopyableField from "/src/components/CopyableField/CopyableField";
import WalletConnectModule from "/src/components/WalletConnectModule";
import ErrorBox from "/src/components/ErrorBox";
import "./PaymentPage.css";

const urlParams = new URLSearchParams(window.location.search);
const paymentId = urlParams.get("id");

function PaymentPage() {
  const [isExpired, setIsExpired] = useState(false);

  const {
    payment,
    isPending: isPaymentPending,
    error: paymentLoadingError,
  } = usePayment(paymentId);

  const {
    sendTransaction,
    isPending: isTransactionPending,
    isConfirming: isTransactionConfirming,
    isConfirmed: isTransactionConfirmed,
    error: sendingTransactionError,
  } = useTransaction(paymentId, payment?.toAddress, payment?.amount);

  if (!paymentId || paymentLoadingError)
    return (
      <Centered>
        <ContentBox className="error-page fade-zoom-in">
          {paymentLoadingError?.message || "Payment ID is not specified"}
        </ContentBox>
      </Centered>
    );

  if (isPaymentPending)
    return (
      <Centered>
        <div className="pending-loader loader-2"></div>
      </Centered>
    );

  if (isExpired)
    return (
      <Centered>
        <ContentBox className="expired-page fade-zoom-in">
          The payment deadline has expired…
        </ContentBox>
      </Centered>
    );

  return (
    <Centered>
      <ContentBox className="payment-page fade-zoom-in">
        <div className="payment-page__header">
          <h1 className="payment-page__header-text">Payment gateway</h1>
          <CountdownTimer
            className="payment-page__countdown"
            isPaused={isTransactionConfirming || isTransactionConfirmed}
            expiry={payment.expiresAt}
            onComplete={() => setIsExpired(true)}
          />
        </div>
        <QRCode url={payment.url} className="payment-page__qr" />
        <CopyableField
          className="payment-page__copy"
          data={payment.toAddress}
        />
        <div className="payment-page__price">
          <span className="payment-page__price-number">
            {formatUnits(payment.amount, 8)}
          </span>
          <span className="payment-page__price-name">AGIX</span>
        </div>
        <div className="payment-page__lot">
          <div className="payment-page__lot-name">{payment.key}</div>
          {/* <div className="payment-page__lot-description">for 15 requests</div> */}
        </div>
        <WalletConnectModule
          isPending={isTransactionPending}
          isConfirming={isTransactionConfirming}
          isConfirmed={isTransactionConfirmed}
          sendTransaction={sendTransaction}
        />
        <ErrorBox error={sendingTransactionError?.shortMessage} />
      </ContentBox>
    </Centered>
  );
}

export default PaymentPage;
