import mongoose from "mongoose";
require("dotenv").config();

export default async function connectMongoDB() {
  console.log(`Attempting to connect to ${process.env.MONGO_URI}`);
  try {
    await mongoose
      .connect(`${process.env.MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(
          `Sucessfully connected to mongo db (${process.env.MONGO_URI}`
        );
      })
      .catch((err) => {
        console.log(
          `
          Failed to connect to mongo.
          `,
          err
        );
        throw new Error("Error connecting to mongo.");
      });
  } catch (err) {
    console.log("Failed to connect to mongo...", err);
    throw new Error("Failed mongo connection", err);
  }
}
