import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/Sidebar.scss";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const userId = localStorage.getItem("userId");

  function showList1() {
    setHide1(!hide1);
  }
  function showList2() {
    setHide2(!hide2);
  }

  function logOut() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className={`sidebar-container ${props.isOpenedSide ? "active" : ""}`}>
      <div className="sidebar">
        <div className="sidebar--overlay " onClick={props.setOpenedSide}></div>
        <div className="sidebar--slidein">
          <ul className="top-ul">
            <li className={`top-li ${hide1 ? "active" : ""}`}>
              <div>
                <a className="head-a" href="/products">
                  SHOP
                </a>
                <div className="btn" onClick={showList1}>
                  <i className="bx bx-chevron-down bx-sm"></i>
                </div>
              </div>
              <ul className="bottom-ul">
                <li>
                  <a href="/products/1">TOP</a>
                </li>
                <li>
                  <a href="/products/2">BOTTOM</a>
                </li>
                <li>
                  <a href="/products/3">JACKET</a>
                </li>
                <li>
                  <a href="/products/4">SHOES</a>
                </li>
                <li>
                  <a href="/products/5">ACCESSORIES</a>
                </li>
              </ul>
            </li>
            <li className={`top-li ${hide2 ? "active" : ""}`}>
              <div>
                <a className="head-a" href="/#">
                  COLLECTIONS
                </a>
                <div className="btn" onClick={showList2}>
                  <i className="bx bx-chevron-down bx-sm"></i>
                </div>
              </div>
              <ul className="bottom-ul">
                <li>
                  <a href="/#">FW22 - BACK IN BLACK</a>
                </li>
              </ul>
            </li>
            <li>
              <a className="head-a" href="/#">
                ABOUT US
              </a>
            </li>
            <li>
              <a className="head-a" href="/#">
                THE PERMANENT DIARIES
              </a>
            </li>
            {isAuthenticated ? (
              <>
                <li></li>
                <li>
                  <a className="head-a" href="/admin/productlist">
                    MANAGE PRODUCTS
                  </a>
                </li>
                <li>
                  <a className="head-a" href="/admin/categorylist">
                    MANAGE CATEGORIES
                  </a>
                </li>
                <li>
                  <a className="head-a" href={`/changepassword/${userId}`}>
                    CHANGE PASSWORD
                  </a>
                </li>
                <li onClick={logOut}>
                  <a className="head-a" href="/#">
                    LOGOUT
                  </a>
                </li>
              </>
            ) : (
              <li>
                <a className="head-a" href="/account">
                  LOGIN
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
