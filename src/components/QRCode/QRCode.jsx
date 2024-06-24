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

function QRCode({ url, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
    });
  }, [url]);

  return (
    <a href={url} className={`qrcode ${className}`} style={style}>
      <div ref={ref}>
        <div className="qrcode__loader-wrapper">
          <div className="qrcode__loader loader-1"></div>
        </div>
      </div>
      <span className="qrcode__text">Open QR link</span>
    </a>
  );
}

export default QRCode;
