import { ApolloServer, gql } from "apollo-server";
import { resolvers, typeDefs } from "../graphql";

const config = {
  cors: true,
  typeDefs,
  resolvers,
};

export default function connectApollo() {
  const server = new ApolloServer(config);
  try {
    server.listen().then(() => {
      console.log(
        `🚀  Graphql server ready at http://localhost:${process.env.PORT}`
      );
    });
  } catch (err) {
    console.log("Failed to connect to Apollo");
    throw new Error("Failed to connect to Apollo");
  }
}
