import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { Faker } from "./faker";
import resolvers from "./resolvers";
import { SocketRepository } from "./socket_repository";
import typeDefs from "./type_defs";

/*
Let's load environment variables from .env file initially
*/
dotenv.config();

async function startServer() {
  const app = express();

  /*
  Since frontend & backend runs on different ports, need to handle CORS issues
  */
  app.use(
    cors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );

  /*
Creating Apollo server with GraphQL schema definitions & resolvers.
I'd like keep using GraphQL Playground, so need to enable it explicitly
*/
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  /*
  Now adding Apollo server as Express middleware
  */
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app: app,
  });

  await mongoose.connect(process.env.MONGODB_CONNECTION as string);
  console.log("Mongoose connected...");

  let server = app.listen(4000, () => {
    console.log("listening on 4000");
  });

  /*
  Creating socket.io using our http server
  need to set cors origin as well
  */
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN as string,
    },
  });

  /*
  All socket related staff handled by SocketRepository
  */
  SocketRepository.setIo(io);

  /*
  ExchangeCollector class is responsible of collecting exchange data from CoinAPI.  
  Name of the class is Faker, newertheless it's collecting exchange data from CoinAPI.  
  */
  //await Faker.startFake();
}

startServer();
