import { useState } from "react";
import { formatUnits } from "viem";
import { useQuery } from "@tanstack/react-query";
import Centered from "/src/layouts/Cetnered/Centered.layout";
import ContentBox from "/src/components/ContentBox";
import CountdownTimer from "/src/components/CountdownTimer";
import QRCode from "/src/components/QRCode";
import CopyableField from "/src/components/CopyableField/CopyableField";
import WalletConnectModule from "/src/components/WalletConnectModule";
import api from "/src/api";
import apiKeys from "/src/api/keys.json";
import "./PaymentPage.css";

function PaymentPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const {
    data: transaction,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: [apiKeys.GET_PAYMENT, id],
    queryFn: () => api[apiKeys.GET_PAYMENT](id),
    enabled: !!id,
  });

  console.log({ error });

  const [isExpired, setIsExpired] = useState(false);

  if (!id || isError)
    return (
      <Centered>
        <ContentBox className="error-page fade-zoom-in">
          {error.message}
        </ContentBox>
      </Centered>
    );

  if (isPending)
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
            expiry={transaction.data.expiresAt}
            onComplete={() => setIsExpired(true)}
          />
        </div>
        <QRCode url={transaction.data.url} className="payment-page__qr" />
        <CopyableField
          className="payment-page__copy"
          data={transaction.data.toAddress}
        />
        <div className="payment-page__price">
          <span className="payment-page__price-number">
            {formatUnits(transaction.data.amount, 8)}
          </span>
          <span className="payment-page__price-name">AGIX</span>
        </div>
        <div className="payment-page__lot">
          <div className="payment-page__lot-name">{transaction.data.key}</div>
          {/* <div className="payment-page__lot-description">for 15 requests</div> */}
        </div>
        <WalletConnectModule
          address={transaction.data.toAddress}
          amount={transaction.data.amount}
        />
      </ContentBox>
    </Centered>
  );
}

export default PaymentPage;
