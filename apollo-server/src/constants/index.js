require("dotenv").config();

const CONSTANTS = {
  mongoUri: `${process.env.MONGO_URI}`,

  lowestTemperatureThreshold: 62,
  highestTemperatureThreshold: 75,
};

module.exports = { CONSTANTS };
