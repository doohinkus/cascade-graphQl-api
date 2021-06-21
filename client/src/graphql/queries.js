import { gql } from "@apollo/client";
/**
 *
 * @param {Object} day  // "MM/DD/YEAR"
 * @param {Object} type // "AC" OR "HEATER"
 * THIS QUERY HITS GRAPHQL ENDPOINT RESULTS -> HVACByDay:  Array ->  with zero or more results
 */
export function getHVACEventsByDay({ day, type }) {
  return gql`
     {
          HVACByDay(day: "${day}", type: "${type}"){
          Date
          hasTriggeredHeater
          hasTriggeredAC
          HVACEventsCount
        }
      }
    `;
}
/**
 *
 * @param {Object} start  // "MM/DD/YEAR"
 * @param {Object} end  // "MM/DD/YEAR"
 * @param {Object} type // "AC" OR "HEATER"
 * THIS QUERY HITS GRAPHQL ENDPOINT RESULTS -> HVACRange:  Array ->  with zero or more results
 */

export const HVAC_EVENTS_COUNT = gql`
  query ($start: Date!, $end: Date!, $type: String!) {
    HVACRangeCount(startDate: $start, endDate: $end, type: $type) {
      HVACCount
    }
  }
`;
export function getHVACEventsByRange({ start, end, type }) {
  return gql`
      query {
        HVACRange(startDate: "${start}", endDate: "${end}", type: "${type}"){
          Date
          hasTriggeredHeater
          hasTriggeredAC
          HVACEventsCount
        }
      }
    `;
}
/**
 *
 * @param {Object} start  // "MM/DD/YEAR"
 * @param {Object} end  // "MM/DD/YEAR"
 * @param {Object} type // "AC" OR "HEATER"
 * THIS QUERY HITS GRAPHQL ENDPOINT RESULTS -> HVACRangeCount:  Array ->  with zero or more results
 */
export function getHVACRangeCount({ start, end, type }) {
  return gql` 
     query {
        HVACRangeCount(startDate: "${start}", endDate: "${end}", type: "${type}"){
         HVACCount
       }
    }`;
}
