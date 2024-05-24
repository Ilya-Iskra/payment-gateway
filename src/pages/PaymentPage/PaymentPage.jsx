import Centered from "/src/layouts/Cetnered/Centered.layout";
import ContentBox from "/src/components/ContentBox";
import Logo from "/src/assets/logo.svg?react";
import SendTransaction from "../../components/SendTransaction";
import { ConnectKitButton } from "connectkit";
import "./PaymentPage.css";

function PaymentPage() {
  return (
    <Centered>
      <ContentBox className="payment-page">
        <div className="payment-page__header">
          <div className="payment-page__header-text">Payment gateway</div>
          <Logo className="payment-page__logo" />
        </div>
        <div className="payment-page__price">
          <span className="payment-page__price-number">407.24</span>
          <span className="payment-page__price-name">AGIX</span>
        </div>
        <div className="payment-page__lot">
          <div className="payment-page__lot-name">
            Russian Speech-to-Text Recognition AI
          </div>
          <div className="payment-page__lot-description">for 15 requests</div>
        </div>
        <ConnectKitButton />
        <SendTransaction />
      </ContentBox>
    </Centered>
  );
}

export default PaymentPage;
