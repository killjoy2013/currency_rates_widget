import express from "express";
import cors from "cors";
import http from "http";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "socket.io";
import typeDefs from "./type_defs";
import resolvers from "./resolvers";
import { SocketRepository } from "./socket_repository";
import { Faker } from "./faker";

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
      origin: process.env.CORS_ORIGIN as string,
    },
  });

  SocketRepository.setIo(io);
  //await Faker.startFake();
}

startServer();
