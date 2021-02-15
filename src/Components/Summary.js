import React, { useRef } from "react";
import Title from "./Title";

export default function Summary() {
  var summaryContainerRef = useRef();
  return (
    <React.Fragment>
      <div ref={summaryContainerRef} className="summary-container">
        <Title>Summary</Title>
      </div>
    </React.Fragment>
  );
}
