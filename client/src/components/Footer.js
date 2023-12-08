import React from "react";
import "../assets/css/Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div>
          <a href="/#">CONTACT US</a>
          <a href="/#">CAREERS</a>
          <a href="/#">PRIVACY & COOKES</a>
          <a href="/#">TERM & CONDITIONS</a>
        </div>
        <div>
          <a href="/#">FAQ</a>
          <a href="/#">SHIPPING</a>
          <a href="/#">RETURN POLICY</a>
          <a href="/#">PROMOTION</a>
        </div>
        <div>
          <a href="/#">FACEBOOK</a>
          <a href="/#">INSTAGRAM</a>
          <a href="/#">YOUTUBE</a>
          <a href="/#">TIKTOK</a>
        </div>
        <div className="footer-contact">
          <span>SUBSCRIBE TO THE NEWSLETTER</span>
          <input type="text" placeholder="ENTER YOUR EMAIL"></input>
        </div>
      </div>
      <div className="copyright">
        <span>
          COPYRIGHT 2022 © <strong>CASALOMAN™</strong> - ALL RIGHTS RESERVED.
        </span>
      </div>
    </div>
  );
};

export default Footer;
