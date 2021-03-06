import { CONSTANTS } from "../constants";
require("dotenv").config();
import connectMongoDB from "../mongo";
import { HVAC } from "../models/HVAC";
import csv from "csv-parser";
import fs from "fs";

async function addCsvToMongo() {
  await connectMongoDB();
  const result = [];
  await fs
    .createReadStream("src/helper/history_data_hourly.csv")
    .pipe(csv())
    .on("data", (row) => {
      let time = row["Date time"].split(" ")[1];
      let date = row["Date time"].split(" ")[0];

      let entry = {
        Date: date,
        Time: time,
        Name: row["Name"],
        Temperature: parseFloat(row["Temperature"]),
        hasTriggeredAC:
          row["Temperature"] >= CONSTANTS.highestTemperatureThreshold,
        hasTriggeredHeater:
          row["Temperature"] <= CONSTANTS.lowestTemperatureThreshold,
      };
      result.push(entry);
    })
    .on("error", (err) => {
      console.log("Error ", err);
      throw new Error("Error connecting to mongo.", err);
    })
    .on("end", async () => {
      // add to mongo
      try {
        await addEntriesToMongo(result);
        console.log(
          `Entries added to mongo db (${process.env.MONGO_INITDB_DATABASE}) on ${process.env.MONGO_DATABASE_HOST}:${process.env.MONGO_DATABASE_PORT}
          `
        );
      } catch (err) {
        console.log("Error adding entries.");
        throw new Error("Failed to add entries", err);
      }
    });
}

async function addEntriesToMongo(array) {
  // todo make this promise
  // ensure that all entries got added
  array.forEach(
    async ({
      Date,
      Time,
      Name,
      Temperature,
      hasTriggeredAC,
      hasTriggeredHeater,
    }) => {
      const entry = new HVAC({
        Date,
        Time,
        Name,
        Temperature,
        hasTriggeredAC,
        hasTriggeredHeater,
      });
      await entry
        .save()
        .catch((err) =>
          console.log("Failed to create customer -> ", entry, " ERROR ", err)
        );
    }
  );
}

const runAddCsvToMongo = async () => {
  await addCsvToMongo();
};
runAddCsvToMongo();
