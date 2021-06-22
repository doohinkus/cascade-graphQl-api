import { HVAC } from "../models/HVAC";
require("dotenv").config();

export const resolvers = {
  Query: {
    HVAC: async () => await HVAC.find({}),
    async HVACRangeCount(_, { startDate, endDate, type }) {
      return await handleAggregate([
        {
          $match: {
            Date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
            ...handleHAVACType(type),
          },
        },
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
    },
    async HVACRange(_, { startDate, endDate, type }) {
      return await handleAggregate([
        {
          $match: {
            Date: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
            ...handleHAVACType(type),
          },
        },
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
    },

    async HVACByDay(_, { day, type }) {
      let result = await handleAggregate([
        { $match: { ...handleHAVACType(type), Date: new Date(day) } },
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

async function handleAggregate(aggregate) {
  try {
    let result = await HVAC.aggregate(aggregate);
    return result;
  } catch (err) {
    throw new Error("Error ", err);
  }
}
function handleHAVACType(type) {
  // Default to Heater
  return type.toLowerCase() === "ac"
    ? { hasTriggeredAC: true }
    : { hasTriggeredHeater: true };
}
