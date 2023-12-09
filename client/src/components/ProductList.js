import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ProductList.scss";

const ProductList = () => {
  const url = "https://casaloman-api.vercel.app";
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cate, setCate] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState([]);

  useEffect(() => {
    fetch(`${url}/products`)
      .then((res) => res.json())
      .then((data) => setProductList(data));
    fetch(`${url}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleDelete = async (productId) => {
    const userConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xoá sản phẩm này?"
    );
    if (userConfirmed) {
      try {
        await fetch(`${url}/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));

        const updatedProducts = productList.filter(
          (product) => product.id !== productId
        );
        setProductList(updatedProducts);

        console.log("Sản phẩm đã được xoá");
      } catch (error) {
        console.error("Lỗi khi xoá sản phẩm:", error);
      }
    }
  };

  async function handleSubmit() {
    const newProduct = {
      id: productList.length + 1,
      name: name,
      cate_id: cate,
      img: img,
      date: date,
      price: price
    };
    console.log(newProduct);
    fetch(`${url}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then((data) => {
        console.log("PUT request successful:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error making PUT request:", error);
      });
  }

  return (
    <div className="productlist-container">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Image</th>
            <th>
              <span>Name</span>
            </th>
            <th>Date</th>
            <th>
              <span>Price</span>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <td></td>
            <td>
              <select
                name="cate"
                aria-label="Shop order"
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
            </td>
            <td>
              <input
                type="text"
                onChange={(e) => setImg([e.target.value])}
                required
              />
            </td>
            <td>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </td>
            <td>
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </td>
            <td>
              <div className="btn-add">
                <i
                  class="bx bx-plus-circle bx-sm"
                  onClick={() => handleSubmit()}
                ></i>
              </div>
            </td>
          </tr>
          {productList.map((product, index) => {
            const category = categories.filter((c) => c.id === product.id_cate);
            return (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{category[0]?.name.toUpperCase()}</td>
                <td>
                  <img src={product.img[0]} alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{new Date(product.date).toLocaleDateString("vi")}</td>
                <td>{product.price} USD</td>
                <td className="action-btn">
                  <Link
                    to={`/admin/productupdate/${product.id}`}
                    className="btn edit"
                  >
                    <i class="bx bx-edit-alt"></i>
                  </Link>
                  &nbsp;
                  <a
                    href="#/"
                    className="btn del"
                    onClick={() => handleDelete(product.id)}
                  >
                    <i class="bx bxs-trash"></i>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
