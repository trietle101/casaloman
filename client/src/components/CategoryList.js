import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/css/ProductList.scss";

const CategoryList = () => {
  const url = "https://casaloman-api.vercel.app";
  const [categoryList, setCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [cate, setCate] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState([]);

  useEffect(() => {
    fetch(`${url}/categories`)
      .then((res) => res.json())
      .then((data) => setCategoryList(data));
  }, []);

  const handleDelete = async (productId) => {
    const userConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xoá sản phẩm này?"
    );
    if (userConfirmed) {
      try {
        await fetch(`${url}/categories/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((err) => console.log(err));

        const updatedCategories = categoryList.filter(
          (product) => product.id !== productId
        );
        setCategoryList(updatedCategories);

        console.log("Sản phẩm đã được xoá");
      } catch (error) {
        console.error("Lỗi khi xoá sản phẩm:", error);
      }
    }
  };

  async function handleSubmit() {
    const newCategory = {
      id: categoryList.length + 1,
      name: name
    };
    console.log(newCategory);
    fetch(`${url}/categories/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCategory)
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

            <th>
              <span>Name</span>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
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
          {categoryList.map((product, index) => {
            return (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td className="action-btn">
                  <Link
                    to={`/admin/categoryupdate/${product.id}`}
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

export default CategoryList;
