const mongoose = require("mongoose");
const user = require("./user");

const postSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  prompt: {
    required: true,
    type: String,
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Prompt = mongoose.models.prompt || mongoose.model("prompt", postSchema);
export default Prompt;
