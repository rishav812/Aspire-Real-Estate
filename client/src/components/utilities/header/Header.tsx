import {  Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../state_management/actions/AuthActions";
import { NavLink, useNavigate } from "react-router-dom";
import { RootStateOrAny } from "react-redux";
import './Header.css';
import React from "react";

function Header() {
  const isLoggedIn = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.isLoggedIn
  );
  const isAdmin = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.authData.isAdmin
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
        <Nav className="navbar">
          {isAdmin && isLoggedIn ? (
            <>
              <NavLink to="/admin-dashboard" className="active-item">Dashboard</NavLink>
              <NavLink to="/all-product" className="active-item">All-Products</NavLink>
              <NavLink to="/product-add" className="active-item">Add-Product</NavLink>
              <NavLink to="/category-add" className="active-item">Add-Category</NavLink>
              <NavLink to="/admin-profile" className="active-item">Admin-Profile</NavLink>
              <NavLink to="/signup" onClick={handleLogout} className="active-item">Logout</NavLink>
            </>
          ) : isLoggedIn ? (
            <>
              <NavLink to="/user-dashboard" className="active-item">Home</NavLink>
              <NavLink to="/add-listing" className="active-item">Listing</NavLink>
              <NavLink to="/user-wishlist" className="active-item">Wishlist</NavLink>
              <NavLink to="/user-profile" className="active-item">Profile</NavLink>
              <NavLink to="/" onClick={handleLogout}>Logout</NavLink> 
            </>
          ) : (
            <>
              <NavLink to="/">Landing Page</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </Nav>
    </div>
  );
}

export default Header;

