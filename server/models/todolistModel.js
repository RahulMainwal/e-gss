const mongoose = require("mongoose");
const { Schema } = mongoose;

const todolistSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoList = mongoose.model("todolists", todolistSchema);

module.exports = TodoList;