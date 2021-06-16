import { ApolloServer, gql } from "apollo-server";
require("dotenv").config();
import { resolvers, typeDefs } from "./graphql";
import connectMongoDB from "./db_connect";

const runServer = async (db, server) => {
  // catch error
  try {
    connectMongoDB().catch((err) => {
      console.log("Error connecting to mongo", err);
      throw new Error("Failed to connect to mongo", err);
    });

    const server = new ApolloServer({
      cors: true,
      typeDefs,
      resolvers,
    });

    server.listen().then(() => {
      console.log(
        `🚀  Graphql server ready at http://localhost:${process.env.PORT}`
      );
    });
  } catch (err) {
    console.log("Failed to connect to Apollo.", err);
    process.exit();
  }
};

runServer(connectMongoDB, "adsfds");
