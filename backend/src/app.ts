import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app: app,
  });

  app.use((req, res) => {
    res.send("Hello from express apollo server");
  });

  await mongoose.connect(
    "mongodb+srv://testuser:testpass@cluster0.ex1fq.mongodb.net/fooddb-3?retryWrites=true&w=majority"
  );
  //   await mongoose.connect(
  //     "mongodb+srv://taskuser:taskpassword@cluster0.hig3e.mongodb.net/task?retryWrites=true&w=majority"
  //   );

  console.log("Mongoose connected...");

  app.listen(4000, () => {
    console.log("listening on 4000");
  });
}

startServer();
