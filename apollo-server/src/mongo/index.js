import mongoose from "mongoose";
require("dotenv").config();
import { CONSTANTS } from "../constants";

export default async function connectMongoDB() {
  let connectionResult = "";

  console.log(`${CONSTANTS.mongoUri}`);

  try {
    await mongoose
      .connect(`${CONSTANTS.mongoUri || process.env.MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        connectionResult = `Connected to mongo db (${CONSTANTS.mongoUri})`;
      })
      .catch((err) => {
        console.log(
          `
          Failed to connect to mongo.
          Is mongo running? 
          docker ps  

          If no containers are running:
          docker-compose up mongo
          `,
          err
        );
        throw new Error("Error connecting to mongo.");
        // process.exit();
      });
  } catch (err) {
    // console.log("Failed to connect to mongo...", err);
    connectionResult = "Failed to connect to mongo...";
    throw new Error("Failed mongo connection", err);
  }

  console.log(connectionResult);
}

export async function cleanConnect() {
  try {
    await mongoose
      .connect(`${CONSTANTS.mongoUri || process.env.MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      // .drop()
      .then(() => {
        connectionResult = `Connected to mongo db (${CONSTANTS.mongoUri})`;
        // clear db
      })
      .catch((err) => {
        console.log(
          `
          Failed to connect to mongo.
          Is mongo running? 
          docker ps  

          If no containers are running:
          docker-compose up mongo
          `,
          err
        );
        throw new Error("Error connecting to mongo.");
        // process.exit();
      });
  } catch (err) {
    // console.log("Failed to connect to mongo...", err);
    connectionResult = "Failed to connect to mongo...";
    throw new Error("Failed mongo connection", err);
  }
}
