import React from "react";
import "../assets/css/Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-center">
        <img
          src="https://casaloman.com/wp-content/uploads/2023/04/1.png"
          alt="collection"
        ></img>
        <div className="banner-button">
          <a href="/#" className="btn-effect">
            SEE LOOKBOOK
          </a>
          <a href="/products" className="btn-effect">
            GO TO STORE
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
