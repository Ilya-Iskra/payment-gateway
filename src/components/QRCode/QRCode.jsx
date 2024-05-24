import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import "./QRCode.css";

const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  type: "svg",
  dotsOptions: {
    color: "#ffffff",
    type: "extra-rounded",
  },
  cornersSquareOptions: {
    color: "#ffffff",
    type: "extra-rounded",
  },
  cornersDotOptions: {
    color: "#ffffff",
    type: "dot",
  },
  backgroundOptions: {
    color: "transparent",
  },
  image: "/logo-head.svg",
  imageOptions: {
    margin: 5,
  },
});

function QRCode({ address, amount, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    const data = `ethereum:${address}?amount=${amount}`;
    qrCode.update({
      data,
    });
  }, [address, amount]);

  return (
    <div className={className} style={style} ref={ref}>
      <div className="qrcode__loader-wrapper">
        <div className="qrcode__loader"></div>
      </div>
    </div>
  );
}

export default QRCode;
