var express = require("express");
var router = express.Router();
var cateModel = require("../models/categories/CateModel");
var productsModel = require("../models/products/ProductsModel");

// router.get("/list", async function (req, res) {
//   let data = await cateModel.find();

//   const { min, max } = req.query;

//   const minScore = parseFloat(min);
//   const maxScore = parseFloat(max);

//   if (isNaN(minScore) || isNaN(maxScore)) {
//     return res.status(400).json({
//       error: "Min va Max sai vui long nhap lai",
//     });
//   }

//   const filteredStudents = data.filter(
//     (resp) => resp.avg_score >= minScore && resp.avg_score <= maxScore
//   );

//   res.json(filteredStudents);
// });

router.get("/", async (req, res) => {
  try {
    let data = await cateModel.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cate = await cateModel.findOne({ id: id });
    const productsByCate = await productsModel.find({ id_cate: id });

    if (productsByCate) {
      res.json(productsByCate);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/cate/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const cate = await cateModel.findOne({ id: id });

    if (cate) {
      res.json(cate);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const result = await cateModel.deleteOne({ id: itemId });

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

router.put("/update/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    const updatedUser = await cateModel.findOneAndUpdate(
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

router.post("/add", async function (req, res, next) {
  try {
    const formData = req.body;

    const savedData = await cateModel.create(formData);

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

// router.put("/student-status/:id", async function (req, res, next) {
//   try {
//     const userId = req.params.id;
//     const updatedData = req.body;

//     const updatedUser = await cateModel.findByIdAndUpdate(userId, updatedData, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json({ message: "User updated successfully", data: updatedUser });
//   } catch (error) {
//     console.error("Error:", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// });

// router.get("/:id", async (req, res) => {
//   const studentId = req.params.id;

//   try {
//     const student = await user.findById(studentId);
//     if (!student) {
//       return res.status(404).json({ error: "Student not found." });
//     }
//     res.json(student);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred." });
//   }
// });

module.exports = router;
