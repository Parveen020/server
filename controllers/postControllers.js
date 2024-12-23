const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //validation
    if (!title || !description) {
      return res
        .status(500)
        .send({ success: false, message: "Please provide all fields" });
    }
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res
      .status(201)
      .send({ success: true, message: "Post created successfully", post });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating API",
      error,
    });
  }
};

//GET ALL POSTS
const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(201).send({ success: true, message: "All post data", posts });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAllPosts API",
      error,
    });
  }
};

//get user posts
const getUserPosts = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res
      .status(201)
      .send({ success: true, message: "All user posts", userPosts });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getAllPosts API",
      error,
    });
  }
};

//delete posts
const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res
      .status(201)
      .send({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete API",
      error,
    });
  }
};

//update post
const updatePosts = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if (!title && !description) {
      return res.status(500).send({ success: false, message: "Not found" });
    }

    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post updated successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update API",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPosts,
  getUserPosts,
  deletePosts,
  updatePosts,
};
