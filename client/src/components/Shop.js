import React from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Products";
import { useState } from "react";
import "../assets/css/Shop.scss";

const Shop = (props) => {
  const [opt, setOpt] = useState("latest");
  function handleSort(e) {
    setOpt(e.target.value);
    // console.log(opt);
  }

  return (
    <div className="shop">
      <div className="shop-container">
        <div className="shop-heading">
          <div shop-heading--left>
            <div>
              <h3>THE PARADISE OF SINS COLLECTION</h3>
            </div>
          </div>
          <div shop-heading--right>
            <select
              name="orderby"
              class="orderby"
              aria-label="Shop order"
              onChange={handleSort}
            >
              <option value="popularity">Sort by popularity</option>
              <option value="date" selected="selected">
                Sort by latest
              </option>
              <option value="price-asc">Sort by price: low to high</option>
              <option value="price-desc">
                Sort by price: high to low
              </option>{" "}
            </select>
          </div>
        </div>
        <Routes>
          <Route path="/" exact element={<Products sort={opt} />} />
          <Route path="/:id_cate" element={<Products sort={opt} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Shop;
