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

export function getHVACEventsByRange({ start, end, type }) {
  return `
      query {
        HVACRange(startDate: "${start.toString()}", endDate: "${end.toString()}", type: "${type.toString()}"){
          Date
          HVACEventsCount
        }
      }
    `;
}
export function getHVACCountByRange({ start, end, type }) {
  return ` 
     query {
        HVACRangeCount(startDate: ${start}, endDate: ${end}, type: ${type}){
         HVACCount
       }
    }`;
}
