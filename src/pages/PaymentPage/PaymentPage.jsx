import Centered from "/src/layouts/Cetnered/Centered.layout";
import ContentBox from "/src/components/ContentBox";
import CountdownTimer from "/src/components/CountdownTimer";
import QRCode from "/src/components/QRCode";
import CopyableField from "/src/components/CopyableField/CopyableField";
import WalletConnectModule from "/src/components/WalletConnectModule";
import { isAddress, parseEther } from "viem";
import "./PaymentPage.css";
import { useState } from "react";

function parseAmount(amount) {
  try {
    parseEther(amount);
    return parseFloat(amount);
  } catch {
    return null;
  }
}

function PaymentPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const transactionData = {
    address: isAddress(urlParams.get("address"))
      ? urlParams.get("address")
      : "0x9B345C57FAD706e349DA441E939282a4bCA0632E",
    amount: parseAmount(urlParams.get("amount")) || "0.00001",
    expiry: urlParams.get("expiry") || Date.now() + 15 * 60 * 1000,
    currency: urlParams.get("currency") || "ETH",
  };

  const [isExpired, setIsExpired] = useState(
    transactionData.expiry <= Date.now()
  );

  function onExpired() {
    setIsExpired(true);
  }

  return (
    <Centered>
      {isExpired ? (
        <ContentBox className="expired-page">
          The payment deadline has expired…
        </ContentBox>
      ) : (
        <ContentBox className="payment-page">
          <div className="payment-page__header">
            <h1 className="payment-page__header-text">Payment gateway</h1>
            <CountdownTimer
              className="payment-page__countdown"
              expiry={transactionData.expiry}
              onComplete={onExpired}
            />
          </div>
          <QRCode
            address={transactionData.address}
            amount={transactionData.amount}
            className="payment-page__qr"
          />
          <CopyableField
            className="payment-page__copy"
            data={transactionData.address}
          />
          <div className="payment-page__price">
            <span className="payment-page__price-number">
              {transactionData.amount}
            </span>
            <span className="payment-page__price-name">
              {transactionData.currency}
            </span>
          </div>
          <div className="payment-page__lot">
            <div className="payment-page__lot-name">
              Russian Speech-to-Text Recognition AI
            </div>
            <div className="payment-page__lot-description">for 15 requests</div>
          </div>
          <WalletConnectModule
            address={transactionData.address}
            amount={transactionData.amount}
          />
        </ContentBox>
      )}
    </Centered>
  );
}

export default PaymentPage;
