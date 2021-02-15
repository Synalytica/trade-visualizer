import React, { useRef } from "react";
export default function Summary() {
  var summaryContainerRef = useRef();
  return (
    <React.Fragment>
      <div ref={summaryContainerRef} className="summary-container" />
    </React.Fragment>
  );
}
