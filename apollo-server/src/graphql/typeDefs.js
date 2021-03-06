import { gql } from "apollo-server";
// Query fields must match up with resolvers, including arguments
export const typeDefs = gql`
  scalar Date
  type Query {
    HVAC: [HVACEvent!]!
    HVACByDay(day: String, type: String): [HVACEvent!]!
    HVACRange(startDate: Date, endDate: Date, type: String): [HVACEvent!]!
    HVACRangeCount(startDate: Date, endDate: Date, type: String): [Count!]!
  }

  type Count {
    HVACCount: Int!
  }
  type HVACEvent {
    id: ID!
    Date: Date
    Time: String
    Name: String
    Temperature: Float
    hasTriggeredAC: Boolean
    hasTriggeredHeater: Boolean
    HVACEventsCount: Int
  }
  # not in use, but could be handy
  type DateExtremeTemperatures {
    id: ID!
    date: String!
    lowestTemperature: Float!
    highestTemperature: Float!
  }
`;
