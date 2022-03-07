const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      max: 500,
    },
    img: { type: String },
    comments: {
      type: Array,
      default: [{ id: String | Number, content: String }],
    },
    saveDimensions: { height: Number, width: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
