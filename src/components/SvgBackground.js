import React, { useEffect } from "react";

function SVSBackground() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#444"
      opacity="0.1"
      viewBox="0 0 200 200"
      style={{
        position: "absolute",
        width: 1700,
        zIndex: "-1",
        top: "-50%",
        left: "-50%",
      }}
    >
      <path d="M137.2 38.3c11.5 4 21.9 12.8 31.7 23.9C178.7 73.3 188 86.6 188 100c.1 13.4-9.2 26.8-21.9 32.8-12.7 6.1-28.9 4.8-40.5 6.2-11.6 1.5-18.6 5.7-29.6 12.7-11 6.9-26.1 16.7-34 13.1-7.9-3.6-8.7-20.5-12-33.5-3.3-13-9.1-22.2-14.9-34.7-5.9-12.5-11.8-28.4-3.7-33.2 8-4.7 30.1 1.7 43.8-1 13.8-2.7 19.3-14.5 28.5-20.9 9.1-6.3 21.9-7.2 33.5-3.2z"></path>
    </svg>
  );
}

export default SVSBackground;
