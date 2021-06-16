import { HVAC } from "../models/HVAC";
require("dotenv").config();

export const resolvers = {
  Query: {
    HVAC: async () => await HVAC.find({}),
    async HVACRangeCount(_, { startDate, endDate, type }) {
      let match = {
        Date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        ...handleHAVACType(type),
      };

      let result = await HVAC.aggregate([
        { $match: { ...match } },
        {
          $group: {
            _id: "$Date",
            Date: { $first: "$Date" },
            Time: { $first: "$Time" },
            Name: { $first: "$Name" },
            Temperature: { $first: "$Temperature" },
            hasTriggeredAC: { $first: "$hasTriggeredAC" },
            hasTriggeredHeater: { $first: "$hasTriggeredHeater" },
            HVACEventsCount: { $sum: 1 },
          },
        },
        { $count: "HVACCount" },
        { $sort: { _id: 1 } },
      ]);
      // console.log(result);
      return result;
    },
    async HVACRange(_, { startDate, endDate, type }) {
      let match = {
        Date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        ...handleHAVACType(type),
      };

      let result = await HVAC.aggregate([
        { $match: { ...match } },
        {
          $group: {
            _id: "$Date",
            Date: { $first: "$Date" },
            Time: { $first: "$Time" },
            Name: { $first: "$Name" },
            Temperature: { $first: "$Temperature" },
            hasTriggeredAC: { $first: "$hasTriggeredAC" },
            hasTriggeredHeater: { $first: "$hasTriggeredHeater" },
            HVACEventsCount: { $sum: 1 },
          },
        },

        { $sort: { _id: 1 } },
      ]);
      console.log(
        result,
        startDate,
        " ",
        endDate,
        " ",
        new Date(startDate).toString()
      );
      return result;
    },

    async HVACByDay(_, { day, type }) {
      let match = {
        ...handleHAVACType(type),
        Date: `${day}`,
      };
      let result = await HVAC.aggregate([
        { $match: { ...match } },
        {
          $group: {
            _id: "$Date",
            Date: { $first: "$Date" },
            Time: { $first: "$Time" },
            Name: { $first: "$Name" },
            Temperature: { $first: "$Temperature" },
            hasTriggeredAC: { $first: "$hasTriggeredAC" },
            hasTriggeredHeater: { $first: "$hasTriggeredHeater" },
            HVACEventsCount: { $sum: 1 },
          },
        },
        { $sort: { _id: -1 } },
      ]);
      // console.log(result.length);
      return result.length > 0
        ? result
        : [
            {
              HVACEventsCount: 0,
            },
          ];
    },
  },
};

function handleHAVACType(type) {
  // Default to Heater
  return type.toLowerCase() === "ac"
    ? { hasTriggeredAC: true }
    : { hasTriggeredHeater: true };
}
