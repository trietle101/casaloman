var express = require("express");
var router = express.Router();
var productsModel = require("../models/products/ProductsModel");
var cateModel = require("../models/categories/CateModel");
var app = express();

/* GET home page. */
router.get("/", async function (req, res, next) {
  let data = await productsModel.find();
  //render product
  // res.render('product', {
  //   title: 'Product',
  //   data: data.name
  // });
  // api products
  res.json(data);
});
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await productsModel.findOne({ id: id });

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/relevant/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productsModel.findOne({ id: id });
    const productsByCate = await productsModel.find({
      id_cate: product.id_cate
    });
    const relevantProducts = productsByCate.filter(
      (product) => product.id !== id
    );

    if (relevantProducts) {
      res.json(relevantProducts);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/relevant/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await productsModel.findOne({ id: id });

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// router.delete("/delete/:id", async function (req, res, next) {
//   try {
//     const userId = req.params.id;
//     const deletedUser = await productsModel.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User deleted successfully", data: deletedUser });
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// });

router.put("/update/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await productsModel.findOneAndUpdate(
      { id: userId },
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const result = await productsModel.deleteOne({ id: itemId });

    // Check if a document was deleted
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Item deleted successfully" });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/add", async function (req, res, next) {
  try {
    const formData = req.body;

    const savedData = await productsModel.create(formData);

    // Send a success response
    res
      .status(201)
      .json({ message: "Data saved successfully", data: savedData });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;

// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// const router = express.Router();

// // Middleware to validate the price
// const validatePrice = (req, res, next) => {
//   const { price } = req.body;

//   if (typeof price !== "number") {
//     res.status(400).json({ error: "Price must be a number" });
//   } else if (price <= 0) {
//     res.status(400).json({ error: "Price must be a positive number" });
//   } else if (price > 100) {
//     res.status(400).json({ error: "Price cannot be higher than 100" });
//   } else {
//     next();
//   }
// };

// // Middleware to validate the presence of the "name" field
// const validateName = (req, res, next) => {
//   const { name } = req.body;

//   if (!name) {
//     res.status(400).json({ error: "Name field is required" });
//   } else {
//     next();
//   }
// };

// // Middleware to parse the request body
// router.use(bodyParser.json());

// // Route that validates the price and name
// router.post("/item", validateName, validatePrice, (req, res) => {
//   // At this point, both the name and price are valid
//   const { name, price } = req.body;

//   // Your logic to save the item with the provided name and price
//   // For this example, I'm just sending a success response
//   res.json({ message: "Item saved successfully" });
// });

// app.use("/api", router);

// const PORT = 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
