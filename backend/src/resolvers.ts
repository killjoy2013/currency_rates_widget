import { GraphQLResolveInfo } from "graphql";
import Post from "./models/Post.model";

type CreatePostInputType = {
  title: string;
  description: string;
};

type CreatePostArgs = {
  input: CreatePostInputType;
};

type UpdatePostInputType = {
  title?: string;
  description?: string;
};

type UpdatePostArgs = {
  id: string;
  input: UpdatePostInputType;
};

type DeletePostArgs = {
  id: string;
};

const resolvers = {
  Query: {
    hello: () => {
      return "Hellooooo";
    },

    getAllPosts: async () => {
      return await Post.find();
    },

    getPost: async (_: undefined, name: string) => {
      return await Post.find();
    },
  },

  Mutation: {
    createPost: async (_: undefined, args: CreatePostArgs) => {
      const {
        input: { title, description },
      } = args;

      const post = new Post({
        title,
        description,
      });

      await post.save();

      return post;
    },

    deletePost: async (_: undefined, args: DeletePostArgs) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return id;
    },

    updatePost: async (_: undefined, { id, input }: UpdatePostArgs) => {
      const { description, title } = input;

      //const params = {};
      // Object.entries(input)
      //   .filter((f) => f[1])
      //   .reduce((accum, [k, v]) => {
      //     accum[k] = v;
      //     return accum;
      //   }, {});

      const params = Object.fromEntries(
        Object.entries(input).filter((f) => f[1])
      );

      await Post.findByIdAndUpdate(id, params);
      return await Post.findById(id);
    },
  },
};

export default resolvers;
