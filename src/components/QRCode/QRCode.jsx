import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import "./QRCode.css";

const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  margin: 10,
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
  // image: "./logo-head.png",
  // imageOptions: {
  //   margin: 5,
  // },
});

function QRCode({ address, amount, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  const link = `ethereum:${address}?amount=${amount}`;
  useEffect(() => {
    qrCode.update({
      data: link,
    });
  }, [link]);

  return (
    <a href={link} className={`qrcode ${className}`} style={style}>
      <div ref={ref}>
        <div className="qrcode__loader-wrapper">
          <div className="qrcode__loader"></div>
        </div>
      </div>
      <span
        href={`ethereum:${address}?amount=${amount}`}
        className="qrcode__text"
      >
        Open QR link
      </span>
    </a>
  );
}

export default QRCode;
