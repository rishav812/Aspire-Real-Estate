import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
const navigate=useNavigate()

  const goBack = () => {
    navigate(-1);
  }
  return (
    <div className="container">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
    <p>Please check the URL for spelling errors or go back to the <button onClick = {goBack}> Previous Page</button></p>
  </div>
  )
}

export default NotFound