const router = require("express").Router();
const Post = require("../models/Post");

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("The post has been updated");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("The post has been deleted");
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//add comment
router.post("/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    await post.updateOne({ $push: { comments: req.body.comment } });
    res.status(200).json("The comment has been added to the post");
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete comment
router.delete("/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    await post.updateOne({ $pull: { comments: req.body.comment } });
    res.status(200).json("The comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//edit comment
router.post("/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    const comment = await post.comments.findOne({
      id: req.body.comment.id,
    });
    await comment.updateOne({ $set: req.body.comment });
    res.status(200).json("The comment has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});
