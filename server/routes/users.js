var express = require("express");
var router = express.Router();
var usersModel = require("../models/users/UsersModel");
var app = express();
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const privateKeyPath = path.join(__dirname, "..", "private-key.txt");
const PRIVATE_KEY = fs.readFile(privateKeyPath, (data, err) => {
  if (err) {
    console.error("Error reading private key:", err);
    return;
  }
  data.toString();
});

//Get all users
router.get("/", async function (req, res, next) {
  let data = await usersModel.find();
  res.json(data);
});

//Get user by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await usersModel.findOne({ id: id });

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Update user
// router.put("/update/:id", async function (req, res, next) {
//   try {
//     const userId = req.params.id;
//     const updatedData = req.body;

//     const updatedUser = await usersModel.findOneAndUpdate(
//       { id: userId },
//       updatedData,
//       { new: true }
//     );

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

//Delete user
router.delete("/:id", async (req, res) => {
  const itemId = req.params.id;

  try {
    const result = await usersModel.deleteOne({ id: itemId });

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

//Register user
router.post("/register", async function (req, res, next) {
  try {
    const formData = req.body;

    const savedData = await usersModel.create({
      id: usersModel.length + 1,
      ...formData
    });

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

router.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const userInfo = await usersModel.findOne({ email: email }).exec();

  if (userInfo && userInfo.password === password) {
    const jwtBearerToken = jwt.sign({}, PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: 120,
      subject: userInfo.id
    });

    res
      .status(200)
      .json({ token: jwtBearerToken, expiresIn: 600, userInfo: userInfo });
  } else res.status(401).json({ "error": "Incorrect password or email", "userInfo": userInfo });
});

router.put("/update/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    const user = await usersModel.findOne({ password: currentPassword });

    if (user) {
      //   const updatedUser = await usersModel.findOneAndUpdate(
      //     { id: userId },
      //     newPassword,
      //     { new: true }
      //   );
      // Update the password
      user.password = newPassword;
      // Save the updated user to the database
      await user.save();
      res.status(200).json({
        message: "User updated successfullyyy",
        data: newPassword
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router;
