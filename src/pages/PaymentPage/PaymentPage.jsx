import Centered from "/src/layouts/Cetnered/Centered.layout";
import ContentBox from "/src/components/ContentBox";
import Logo from "/src/assets/logo.svg?react";

function PaymentPage() {
  return (
    <Centered>
      <ContentBox style={{ padding: "20px 30px 48px" }}>
        text <Logo />
      </ContentBox>
    </Centered>
  );
}

export default PaymentPage;
