import SignupModal from "./components/auth/SignupModel";
import { Routes, Route } from "react-router-dom";
import { useSelector, RootStateOrAny } from "react-redux";
import LoginModel from "./components/auth/login/LoginModel";
import Profile from "./components/users/profile/profile";
import UserDashboard from "./components/users/home/Dashboard";
import AdminDashboard from "./components/admin/dashboard/Dashboard";
import AllProduct from "./components/admin/product/AllProduct";
import AddProduct from "./components/admin/product/AddProduct";
import AdminProfile from "./components/admin/profile/AdminProfile";
import { RoutesPath } from "./constants/Constants";
import PrivateRoutes from "./PrivateRoutes";
import { WithHeader } from "./PrivateRoutes";
import LandingPage from "./components/views/landingPage/landingPage";
import NotFound from "./components/common/NotFound";
import "./App.css";
import AddCategory from "./components/admin/category/AddCategory";
import Cart from "./components/users/cart/Cart";
import BuyPrdct from "./components/users/buy/BuyProduct";
import Wishlist from "./components/users/wishlist/Wishlist";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ForgotPassword from "./components/auth/forgotPassword/ForgotPassword";
import OtpVerification from "./components/auth/otpVerification/OtpVerification";
import ResetPassword from "./components/auth/reserPassword/ResetPassword";
import AddListing from "./components/users/addListing/AddListing";

function App() {
  const isAdmin = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.authData.isAdmin
  );

  return (
    <div className="App">
      <Routes>
        <Route
          path={RoutesPath.LANDINGPAGE}
          element={
            <PrivateRoutes
              Component={LandingPage}
              route={RoutesPath.LANDINGPAGE}
            />
          }
        />
        <Route
          path={RoutesPath.SIGNUP}
          element={
            <PrivateRoutes Component={SignupModal} route={RoutesPath.SIGNUP} />
          }
        />
        <Route
          path={RoutesPath.LOGIN}
          element={
            <PrivateRoutes Component={LoginModel} route={RoutesPath.LOGIN} />
          }
        />
        <Route
          path={RoutesPath.FORGOT_PASSWORD}
          element={
            <PrivateRoutes
              Component={ForgotPassword}
              route={RoutesPath.FORGOT_PASSWORD}
            />
          }
        />
        <Route
          path={RoutesPath.OTP_VERIFICATION}
          element={
            <PrivateRoutes
              Component={OtpVerification}
              route={RoutesPath.OTP_VERIFICATION}
            />
          }
        />
        <Route
          path={RoutesPath.RESET_PASSWORD}
          element={
            <PrivateRoutes
              Component={ResetPassword}
              route={RoutesPath.RESET_PASSWORD}
            />
          }
        />
        <Route
          path={RoutesPath.USERDASHBOARD}
          element={
            isAdmin === false || isAdmin === undefined ? (
              <WithHeader
                Component={UserDashboard}
                route={RoutesPath.USERDASHBOARD}
              />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
        {/* <Route
          path={RoutesPath.CART}
          element={ isAdmin===false?(
            <WithHeader Component={Cart} route={RoutesPath.CART}/>):(
              <WithHeader Component={NotFound} route={RoutesPath.UNAUTHORIZED}/>
            )
          }
        /> */}
        <Route
          path={RoutesPath.ADD_LISTING}
          element={
            isAdmin === false || isAdmin == undefined ? (
              <WithHeader
                Component={AddListing}
                route={RoutesPath.ADD_LISTING}
              />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
        <Route
          path={RoutesPath.BUY}
          element={
            isAdmin === false ? (
              <WithHeader Component={BuyPrdct} route={RoutesPath.BUY} />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
        <Route
          path={RoutesPath.WISHLIST}
          element={
            isAdmin === false ? (
              <WithHeader Component={Wishlist} route={RoutesPath.WISHLIST} />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
        <Route
          path={RoutesPath.USERPROFILE}
          element={
            isAdmin === false || isAdmin === undefined ? (
              <WithHeader Component={Profile} route={RoutesPath.USERPROFILE} />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
        <Route
          path={RoutesPath.ADMINDASHBOARD}
          element={
            isAdmin ? (
              <WithHeader
                Component={AdminDashboard}
                route={RoutesPath.ADMINDASHBOARD}
              />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
        <Route
          path={RoutesPath.ALLPRODUCT}
          element={
            isAdmin ? (
              <WithHeader
                Component={AllProduct}
                route={RoutesPath.ALLPRODUCT}
              />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
        <Route
          path={RoutesPath.ADDPRODUCT}
          element={
            isAdmin ? (
              <WithHeader
                Component={AddProduct}
                route={RoutesPath.ADDPRODUCT}
              />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
        <Route
          path={RoutesPath.ADDCATEGORY}
          element={
            isAdmin ? (
              <WithHeader
                Component={AddCategory}
                route={RoutesPath.ADDCATEGORY}
              />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
        <Route
          path={RoutesPath.ADMINPROFILE}
          element={
            isAdmin ? (
              <WithHeader
                Component={AdminProfile}
                route={RoutesPath.ADMINPROFILE}
              />
            ) : (
              <WithHeader
                Component={NotFound}
                route={RoutesPath.UNAUTHORIZED}
              />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
