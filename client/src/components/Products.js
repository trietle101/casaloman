import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../assets/css/Products.scss";

const Products = (props) => {
  let { id_cate } = useParams();
  const url = "https://casaloman-api.vercel.app";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (id_cate) {
      fetch(`${url}/categories/${id_cate}`)
        .then((res) => res.json())
        .then((data) => {
          switch (props.sort) {
            case "price-asc":
              data.sort((a, b) => a.price - b.price);
              setProducts(data);
              break;
            case "price-desc":
              data.sort((a, b) => b.price - a.price);
              setProducts(data);
              break;
            default:
              data.sort((a, b) => new Date(b.date) - new Date(a.date));
              setProducts(data);
              break;
          }
          setProducts(data);
        });
      // console.log(products);
      // console.log(id_cate);
    } else {
      fetch(`${url}/products`)
        .then((res) => res.json())
        .then((data) => {
          switch (props.sort) {
            case "price-asc":
              data.sort((a, b) => a.price - b.price);
              setProducts(data);
              break;
            case "price-desc":
              data.sort((a, b) => b.price - a.price);
              setProducts(data);
              break;
            default:
              data.sort((a, b) => new Date(b.date) - new Date(a.date));
              setProducts(data);
              break;
          }
          setProducts(data);
        });
    }
  }, [id_cate, props.sort]);

  return (
    <div className="products">
      <div className="products-container">
        {products.map((product, i) => (
          <Link
            to={"/products/details/" + product.id}
            className="products-card"
            key={i}
          >
            <div className="images">
              <img className="img1" src={product.img[0]} alt={product.name} />
              <img className="img2" src={product.img[1]} alt={product.name} />
            </div>
            <div>
              <p>{product.name}</p>
            </div>
            <div>
              <b>{product.price} USD</b>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
