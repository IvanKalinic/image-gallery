const router = require("express").Router();
const Post = require("../models/Post");

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get one post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    await post.updateOne({ $set: req.body });
    res.status(200).json("The post has been updated");
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
    console.log(req.body);
    await post.updateOne({ $push: { comments: req.body } });
    res.status(200).json("The comment has been added to the post");
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete comment
router.put("/:id/comment/:commentId", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentId
    );
    await post.updateOne({ $pull: { comments: comment } });
    res.status(200).json("The comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//edit comment
router.put("/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    const comment = post.comments.find((comment) => comment.id === req.body.id);
    await post.updateOne({ $pull: { comments: comment } });
    await post.updateOne({ $push: { comments: req.body } });
    // await post.updateOne(
    //   { comments: comment },
    //   { $set: { content: req.body.content } },
    //   (err, res) => {
    //     if (err) throw err;
    //     console.log("1 document updated");
    //   }
    // );

    res.status(200).json("The comment has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
