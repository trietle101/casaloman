import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Categories.scss";

const Categories = () => {
  return (
    <div className="categories">
      <div className="container">
        <div className="item">
          <Link to={"/products/1"}>
            <img
              src="https://casaloman.com/wp-content/uploads/2023/01/12-1.jpg"
              alt="categories"
            ></img>
          </Link>
        </div>
        <div className="item">
          <Link to={"/products/2"}>
            <img
              src="https://casaloman.com/wp-content/uploads/2023/07/17.jpg"
              alt="categories"
            ></img>
          </Link>
        </div>
        <div className="item">
          <Link to={"/products/3"}>
            <img
              src="https://casaloman.com/wp-content/uploads/2023/01/16.jpg"
              alt="categories"
            ></img>
          </Link>
        </div>
        <div className="item">
          <Link to={"/products/4"}>
            <img
              src="https://casaloman.com/wp-content/uploads/2023/01/15.jpg"
              alt="categories"
            ></img>
          </Link>
        </div>
        <div className="item">
          <Link to={"/products/5"}>
            <img
              src="https://casaloman.com/wp-content/uploads/2023/01/14.jpg"
              alt="categories"
            ></img>
          </Link>
        </div>
        <div className="item">
          <Link to={"/products/5"}>
            <img
              src="https://casaloman.com/wp-content/uploads/2023/01/18.jpg"
              alt="categories"
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
