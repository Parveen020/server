const express = require("express");
const {
  registerController,
  loginController,
  updateController,
  requireSignIn,
} = require("../controllers/userControllers");

//router object
const router = express.Router();

// routes - Register
router.post("/register", registerController);

//routes - Logins
router.post("/Login", loginController);

//route - update
router.put("/updateUser", requireSignIn, updateController);

//export
module.exports = router;
