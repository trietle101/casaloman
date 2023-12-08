import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "../assets/css/ProductUpdate.scss";

const ProductUpdate = () => {
  const mySelect = useRef();
  let { id_update } = useParams();
  const url = "http://localhost:4000";
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cate, setCate] = useState("");

  useEffect(() => {
    fetch(`${url}/products/${id_update}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setName(data.name);
        setPrice(data.price);
        setCate(data.id_cate);
      });
    // fetch(`${url}/categories`)
    //   .then((res) => res.json())
    //   .then((data) => setCategories(data));
  }, [id_update]);

  function handleSubmit() {
    const updatedData = {
      name: name,
      price: price,
      id_cate: cate
    };
    fetch(`${url}/products/update/${id_update}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log("PUT request successful:", data);
        window.location.replace("/admin/productlist");
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  }
  return (
    <div className="productupdate-container">
      <form onSubmit={handleSubmit}>
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label for="email">Price:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label for="cate">Category:</label>
        <select
          name="cate"
          aria-label="Shop order"
          ref={mySelect}
          onChange={(e) => setCate(e.target.value)}
        >
          <option value="1">TOP</option>
          <option value="2" selected="selected">
            BOTTOM
          </option>
          <option value="3">JACKET</option>
          <option value="4">SHOES</option>
          <option value="5">ACCESSORIES</option>
        </select>

        <button className="btn-update" type="submit">
          Update Details
        </button>
      </form>
    </div>
  );
};

export default ProductUpdate;
