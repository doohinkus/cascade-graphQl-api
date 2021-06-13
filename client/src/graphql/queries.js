/**
 *
 * @param {Object} day  // "MM/DD/YEAR"
 * @param {Object} type // "AC" OR "HEATER"
 * THIS QUERY HITS GRAPHQL ENDPOINT RESULTS -> HVACByDay:  Array ->  with zero or more results
 */
export function getHVACEventsByDay({ day, type }) {
  return `
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
export function getHVACEventsByRange({ start, end, type }) {
  // return `query {
  //   HVACRange(startDate:"06/02/2020", endDate:"${end}", type: "${type}"){
  //     Date
  //     hasTriggeredAC
  //     hasTriggeredHeater
  //     HVACEventsCount
  //   }
  // }`;
  return `
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
export function getHVACCountByRange({ start, end, type }) {
  return ` 
     query {
        HVACRangeCount(startDate: ${start}, endDate: ${end}, type: ${type}){
         HVACCount
       }
    }`;
}
