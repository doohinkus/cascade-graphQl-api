export function getHVACEventsByDay({day, type}){
    return `
        query {
            HVACByDay(day:${day}, type: ${type}){
            Date
            hasTriggeredHeater
            HVACEventsCount
          }
        }
    `;
}

export function getHVACEventsByRange({start, end, type}){
    return `
      query {
        HVACRange(startDate: ${start}, endDate: ${end}, type: ${type}){
          Date
          HVACEventsCount
        }
      }
    `
}
export function getHVACCountByRange({start, end, type}){
   return ` 
     query {
        HVACRangeCount(startDate: ${start}, endDate: ${end}, type: ${type}){
         HVACCount
       }
    }`;
}
