import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateOrAny } from "react-redux";
import Header from "./components/utilities/header/Header";
import React from "react";

interface Props {
  Component: React.ComponentType;
  route: string;
}

export const WithHeader: React.FC<Props> = (props) => {
  return (
    <>
      <div className="main-box">
        <Header />
        <div className="common-box">
          <PrivateRoutes {...props} />
        </div>
      </div>
    </>
  );
};

function PrivateRoutes(props: any) {
  const { Component, route } = props;
  const isLogin = useSelector((state: any) => state.AuthReducer.isLoggedIn);
  const isAdmin = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.authData.isAdmin
  );
  console.log("isAdmin=>",isAdmin)
  const token = localStorage.getItem("login");

  const beforeLoginRoutes = ["/login", "/signup", "/forgot-password", "/otp-verification", "/reset-password" , "/"];

  // let returnData;

  if (token) {
    if (beforeLoginRoutes.includes(route) && isAdmin) {
      return <Navigate to={"/admin-dashboard"} />;
    } else if (beforeLoginRoutes.includes(route) && !isAdmin && isLogin) {
      return <Navigate to={"/user-dashboard"} />;
    } else {
      console.log("components routes",route)
      return <Component />;
    }
  } else {
    if (beforeLoginRoutes.includes(route)) {
      return <Component />;
    } else {
      return <Navigate to={"/login"} />;
    }
  }
}

export default PrivateRoutes;
