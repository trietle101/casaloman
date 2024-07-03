import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Banner.scss";

const Banner = () => {
  return (
    <div className="banner" data-aos="fade-up">
      <div className="banner-center">
        <img
          src="https://casaloman.com/wp-content/uploads/2023/04/1.png"
          alt="collection"
        ></img>
        <div className="banner-button ">
          <Link to="/#" className="btn-effect pointer">
            SEE LOOKBOOK
          </Link>
          <Link to="/products" className="btn-effect pointer">
            GO TO STORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
