import React from "react";
import { useState, useEffect} from "react";
import { useParams} from "react-router-dom";
import "../assets/css/ProductUpdate.scss";

const CategoryUpdate = () => {
  let { id_update } = useParams();
  const url = "https://casaloman-api.vercel.app";
  const [name, setName] = useState("");

  useEffect(() => {
    fetch(`${url}/categories/cate/${id_update}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
      });
    // fetch(`${url}/categories`)
    //   .then((res) => res.json())
    //   .then((data) => setCategories(data));
  }, [id_update]);

  function handleSubmit() {
    const updatedData = {
      name: name,
    };
    fetch(`${url}/categories/update/${id_update}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    })
      .then((data) => {
        console.log("PUT request successful:", data);
        window.location.replace("/admin/categorylist");
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
        <button className="btn-update" type="submit">
          Update Details
        </button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
