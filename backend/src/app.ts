import express from "express";
import cors from "cors";
import http from "http";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

dotenv.config();

async function startServer() {
  const app = express();

  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );

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

  await mongoose.connect(process.env.MONGODB_CONNECTION as string);

  console.log("Mongoose connected...");

  let server = app.listen(4000, () => {
    console.log("listening on 4000");
  });
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    console.log(socket.id);
    io.on("disconnect", (socket) => {
      console.log(`${socket.id} disconnected`);
    });
  });
}

startServer();
