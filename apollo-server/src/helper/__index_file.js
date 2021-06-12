import { CONSTANTS } from "../constants";
require("dotenv").config();
import csv from "csv-parser";
import fs from "fs";

function CsvToArray() {
  const promises = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream("src/csvToGraphQl/history_data_hourly.csv")
      .pipe(csv())

      .on("data", async (row) => {
        let entry = {
          Date: row["Date time"].split(" ")[0],
          Time: row["Date time"].split(" ")[1],
          Name: row["Name"],
          Temperature: parseFloat(row["Temperature"]),
          hasTriggeredAC:
            row["Temperature"] >= CONSTANTS.highestTemperatureThreshold,
          hasTriggeredHeater:
            row["Temperature"] <= CONSTANTS.lowestTemperatureThreshold,
        };
        promises.push(entry);
      })
      .on("error", reject)
      .on("end", async () => {
        let data = await Promise.all(promises);
        // console.log(data);
        // write data to json
        writeArrayToJson({
          array: data,
          destination: "src/csvToGraphQl/hvac.json",
        });
        resolve();
      });
  });
}

function writeArrayToJson({ array, destination }) {
  const jsonObj = JSON.stringify(array);
  try {
    fs.writeFileSync(`${destination}`, jsonObj);
    console.log(`Success! array is now here -> ${destination}`);
  } catch (err) {
    console.log("Error writing array to json", err);
    throw new Error("Error writing array to json...", err);
  }
}

CsvToArray();
