import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../assets/css/Details.scss";

const Details = () => {
  let { id_prod } = useParams();
  const url = "https://casaloman-api.vercel.app";
  const [products, setProducts] = useState({});
  const [relproducts, setRelProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({ size: "", amount: 1 });

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      fetch(`${url}/products/${id_prod}`)
        .then((res) => res.json())
        .then((data) => setProducts(data));
      fetch(`${url}/products/relevant/${id_prod}`)
        .then((res) => res.json())
        .then((data) => setRelProducts(data));
      fetch(`${url}/categories`)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data);
          setLoading(false);
        });
    }
    fetchData();
  }, [id_prod]);
  console.log(products);
  const cate = categories.find((c) => c.id === products.id_cate);
  if (!loading && Object.keys(products).length !== 0) {
    return (
      <>
        <div className="details">
          <div className="details-product">
            <div className="product details-product--info">
              <div className="info__name">
                <div className="name-cate">
                  <a href="#/">{cate.name.toUpperCase()}</a>
                </div>
                <div className="name-name">
                  <h3>{products.name}</h3>
                </div>
              </div>
              <div className="info__about">
                <b>ABOUT</b>
                <ul>
                  {products.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="product details-product--images">
              {products.img.map((d, i) => (
                <img key={i} src={d} alt={products.name} />
              ))}
            </div>
            <div className="product details-product--price">
              <div className="price__price">
                <b>{products.price} USD</b>
              </div>
              <div className="price__size">
                <p>SIZES</p>
                <div className="size-list">
                  <div
                    className={item.size === "S" ? "active" : ""}
                    onClick={() => setItem((prev) => ({ ...prev, size: "S" }))}
                  >
                    <span>S</span>
                  </div>
                  <div
                    className={item.size === "M" ? "active" : ""}
                    onClick={() => setItem((prev) => ({ ...prev, size: "M" }))}
                  >
                    <span>M</span>
                  </div>
                  <div
                    className={item.size === "L" ? "active" : ""}
                    onClick={() => setItem((prev) => ({ ...prev, size: "L" }))}
                  >
                    <span>L</span>
                  </div>
                  <div
                    className={item.size === "XL" ? "active" : ""}
                    onClick={() => setItem((prev) => ({ ...prev, size: "XL" }))}
                  >
                    <span>XL</span>
                  </div>
                </div>
              </div>
              <div className="price__cart">
                <div className="cart-quantity">
                  <button
                    type="button"
                    className="qty minus"
                    onClick={() => {
                      if (item.amount > 1) {
                        setItem((prev) => ({
                          ...prev,
                          amount: item.amount - 1
                        }));
                      }
                    }}
                  >
                    -
                  </button>
                  <div className="amount">{item.amount}</div>
                  <button
                    type="button"
                    className="qty plus"
                    onClick={() =>
                      setItem((prev) => ({ ...prev, amount: item.amount + 1 }))
                    }
                  >
                    +
                  </button>
                </div>
                <button type="submit" class="cart-add">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
          <div className="relevant">
            <h3>RELATED PRODUCTS</h3>
            <Carousel
              centerMode
              centerSlidePercentage={23}
              width={1240}
              showIndicators={false}
              showStatus={false}
              showThumbs={false}
              infinite={true}
              totalSlides={relproducts.length}
              infiniteLoop={true}
              slidesToSlide={4}
            >
              {Object.keys(relproducts).length !== 0 &&
                relproducts.map((product, i) => (
                  <Link
                    to={"/products/details/" + product.id}
                    className="products-card"
                    key={i}
                    itemClass="carousel-item-padding-40-px"
                  >
                    <div className="images">
                      <img
                        className="w-full h-full"
                        src={product.img[0]}
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p>{product.name}</p>
                    </div>
                    <div>
                      <b>{product.price} USD</b>
                    </div>
                  </Link>
                ))}
            </Carousel>
          </div>
        </div>
      </>
    );
  }
};

export default Details;
