import { useState } from "react";
import Copy from "/src/assets/copy.svg?react";
import "./CopyableField.css";
import { copyToClipboard } from "/src/utils/utils.js";

function CopyableField({ data, className, style }) {
  const [isCopied, setIsCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  async function copyData() {
    await copyToClipboard(data);
    setIsCopied(true);
    resetIsCopiedAfterDelay(5000);
  }

  function resetIsCopiedAfterDelay(delayMs) {
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(setTimeout(setIsCopied, delayMs, false));
  }

  return (
    <div
      className={`copyable-field ${className}`}
      style={style}
      data-tooltip={isCopied ? "Copied!" : ""}
      data-tooltip-flow={isCopied ? "bottom" : ""}
      onClick={copyData}
      onMouseLeave={() => resetIsCopiedAfterDelay(200)}
    >
      <button className="copyable-field__copy">
        <Copy className="copyable-field__copy-icon" />
      </button>
      <div className="copyable-field__text">{data}</div>
    </div>
  );
}

export default CopyableField;
