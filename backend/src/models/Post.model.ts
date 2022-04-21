import mongoose, { Schema as MongooseSchema } from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: MongooseSchema.Types.String,
    required: true,
  },
  description: {
    type: MongooseSchema.Types.String,
  },
});

const Post = mongoose.model("post", PostSchema);
export default Post;
