require("dotenv").config();
import connectMongoDB from "./db_connect";
import connectApollo from "./server_connect";

const runServer = async (db, server) => {
  try {
    await db();
    await server();
  } catch (err) {
    console.log("Failed to connect db and server", err);
    process.exit();
  }
};

runServer(connectMongoDB, connectApollo);
