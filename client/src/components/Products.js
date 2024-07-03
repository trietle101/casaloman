import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ReactLoading from "react-loading";
import "../assets/css/Products.scss";
import AOS from "aos";

const Products = (props) => {
  let { id_cate } = useParams();
  const [products, setProducts] = useState([]);
  const productsData = useSelector((state) => state.products.products);
  const [loadedCount, setLoadedCount] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);

  useEffect(() => {
    setProducts(productsData);
    let sortedProducts = [...productsData];
    // console.log(sortedProducts);
    if (id_cate) {
      sortedProducts = sortedProducts.filter(
        (item) => item.id_cate === id_cate
      );
    }
    switch (props.sort) {
      case "price-asc":
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = sortedProducts.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        break;
    }
    setProducts(sortedProducts);
    // console.log(loadedCount);
    // console.log(products.length);
    // console.log(loadedCount === products.length);
    console.log(products.length > 0 && loadedCount / 2 === products.length);
    if (products.length > 0 && loadedCount / 2 === products.length) {
      // console.log("aaaaaaaaaaaaaa");
      setAllImagesLoaded(true);
      AOS.init();
      AOS.refresh();
    }
  }, [id_cate, props.sort, productsData, loadedCount, products.length]);
  const handleImageLoad = () => {
    setLoadedCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="products">
      {products.map((product, i) => (
        <div className="images" style={{ display: "none" }} key={i}>
          <img
            className="img1"
            src={product.img[0]}
            alt={product.name}
            onLoad={handleImageLoad}
          />
          <img
            className="img2"
            src={product.img[1]}
            alt={product.name}
            onLoad={handleImageLoad}
          />
        </div>
      ))}
      {allImagesLoaded ? (
        <div className="products-container">
          {products.map((product, i) => (
            <Link
              to={"/products/details/" + product.id}
              className="products-card"
              key={i}
              data-aos="fade-up"
              data-aos-offset="50"
              data-aos-delay="20"
              data-aos-duration="500"
              data-aos-once="false"
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
      ) : (
        <ReactLoading
          type={"spinningBubbles"}
          color={"#999999"}
          height={50}
          width={50}
        />
      )}
    </div>
  );
};

export default Products;
