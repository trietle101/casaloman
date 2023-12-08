import React from "react";
import { useState, useEffect } from "react";
import "../assets/css/Nav.scss";
import { useSelector } from "react-redux";

const Nav = (props) => {
  const [isFixed, setIsFixed] = useState("");
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userName = localStorage.getItem("user");

  useEffect(() => {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 31) {
        setIsFixed("fixed");
      } else setIsFixed("");
    });

    return () => {
      window.removeEventListener("scroll", function () {
        if (window.scrollY > 31) {
          setIsFixed("fixed");
        } else setIsFixed("");
      });
    };
  }, []);

  return (
    <div className="nav-container">
      <div className="ribbon">
        <span>FREESHIPPING IN VIETNAM. WORLDWIDE SHIPPING FIXED RATES.</span>
      </div>
      <div className={`nav ${isFixed}`}>
        <div className="nav--left">
          <a href="#">
            <i className="bx bx-menu bx-sm" onClick={props.setOpenedNav}></i>
          </a>
        </div>
        <div className="nav--center">
          <a href="/#">
            <img
              src="https://casaloman.com/wp-content/uploads/2022/05/1-copy.png"
              alt="logo"
            />
          </a>
        </div>
        <div className="nav--right">
          {isAuthenticated ? (
            <a href="/#">
              <span>{userName}</span>
            </a>
          ) : (
            <a href="/account">
              <i className="bx bx-user bx-sm"></i>
            </a>
          )}
          <a href="/#" className="cart">
            <i className="bx bx-shopping-bag bx-sm"></i>
            <span>0</span>
          </a>
        </div>
      </div>
    </div>
  );
};
export default Nav;
