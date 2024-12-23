const express = require("express");
const { requireSignIn } = require("../controllers/userControllers");
const {
  createPostController,
  getAllPosts,
  getUserPosts,
  deletePosts,
  updatePosts,
} = require("../controllers/postControllers");

//router object
const router = express.Router();

// create Post || post
router.post("/createPost", requireSignIn, createPostController);

//get user post
router.get("/getUserPosts", requireSignIn, getUserPosts);

//delete posts
router.delete("/deletePost/:id", requireSignIn, deletePosts);

//update port
router.put("/updatePost/:id", requireSignIn, updatePosts);

//get all post
router.get("/getAllPosts", getAllPosts);
//export
module.exports = router;
