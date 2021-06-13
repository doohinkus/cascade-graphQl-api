import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../helpers";
import "./HVACDatePicker.css";

import useQuery from "../../hooks/useQuery";
import { getHVACEventsByDay } from "../../graphql/queries";

export default function HVACDatePicker({ type }) {
  function getQueryResults(day, type) {
    // let day = "07/11/2020";
    // let typesx = "ac";
    // const query = `
    //   query{
    //     HVACByDay(day: "${day}", type: "${typesx}"){
    //     Date
    //     hasTriggeredHeater
    //     HVACEventsCount
    //   }
    // }
    //   `;

    let query = getHVACEventsByDay({
      day,
      type,
    });
    fetchData(query);
  }

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { customersData, fetchData } = useQuery();

  return (
    <div>
      <div>
        <label>Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        <label>End Date</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <button onClick={() => getQueryResults("07/12/2020", "ac")}>
        Submit
      </button>
    </div>
  );
}
