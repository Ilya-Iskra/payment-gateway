import Cross from "/src/assets/cross.svg?react";
import "./ErrorBox.css";
import { useState, useEffect } from "react";

function ErrorBox({ error }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!!error);
  }, [error]);

  return (
    <>
      {isVisible && (
        <div className="error-box">
          <div className="error-box__text">{error}</div>
          <button
            className="nim-button-1 error-box__close"
            onClick={() => setIsVisible(false)}
          >
            <Cross className="error-box__close-icon" />
          </button>
        </div>
      )}
    </>
  );
}

export default ErrorBox;
