import Centered from "/src/layouts/Cetnered/Centered.layout";
import ContentBox from "/src/components/ContentBox";
import CopyableField from "/src/components/CopyableField/CopyableField";
import QRCode from "/src/components/QRCode";
import Logo from "/src/assets/logo.svg?react";
import WalletConnectModule from "../../components/WalletConnectModule/WalletConnectModule";
import "./PaymentPage.css";

function PaymentPage() {
  return (
    <Centered>
      <ContentBox className="payment-page">
        <div className="payment-page__header">
          <div className="payment-page__header-text">Payment gateway</div>
          <Logo className="payment-page__logo" />
        </div>
        <QRCode
          address="0x9B345C57FAD706e349DA441E939282a4bCA0632E"
          amount="0.0001"
          className="payment-page__qr"
        />
        <CopyableField
          className="payment-page__copy"
          data="0x9B345C57FAD706e349DA441E939282a4bCA0632E"
        />
        <div className="payment-page__price">
          <span className="payment-page__price-number">0.0001</span>
          <span className="payment-page__price-name">ETH</span>
        </div>
        <div className="payment-page__lot">
          <div className="payment-page__lot-name">
            Russian Speech-to-Text Recognition AI
          </div>
          <div className="payment-page__lot-description">for 15 requests</div>
        </div>
        <WalletConnectModule />
      </ContentBox>
    </Centered>
  );
}

export default PaymentPage;
