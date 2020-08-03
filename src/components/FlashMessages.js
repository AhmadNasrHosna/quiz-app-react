import React from "react";
import "./FlashMessages.css";

function FlashMessages({ messages }) {
  return (
    <div className="c-floating-alerts">
      {messages.map(({ text, status }, index) => {
        return (
          <div key={index} className={`c-alert c-alert--${status}`}>
            {status === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#55a547"
                fillRule="evenodd"
                clipRule="evenodd"
                imageRendering="optimizeQuality"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                viewBox="0 0 333 333"
              >
                <path
                  fillRule="nonzero"
                  d="M44 162c-8-14 14-26 21-11l48 90L270 63c10-13 29 4 18 16L121 271c-6 6-17 5-21-2L44 162z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#c3222a"
                viewBox="0 0 90 90"
              >
                <path d="M71.509 23.852c3.454-3.454-1.905-8.817-5.36-5.36L45 39.638 29.782 24.421l-5.93-5.93c-3.454-3.454-8.817 1.905-5.36 5.36L39.638 45 24.421 60.218l-5.93 5.93c-3.454 3.454 1.905 8.817 5.36 5.36L45 50.362 60.218 65.58l5.93 5.93c3.454 3.454 8.817-1.905 5.36-5.36L50.362 45 65.58 29.782l5.93-5.93z"></path>
              </svg>
            )}
            <span>{text}</span>
          </div>
        );
      })}
    </div>
  );
}

export default FlashMessages;
