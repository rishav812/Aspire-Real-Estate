import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default Loading;
