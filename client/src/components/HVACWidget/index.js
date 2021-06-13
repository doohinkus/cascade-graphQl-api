import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../helpers";
import "./HVACWidget.css";

import useQuery from "../../hooks/useQuery";
import {
  getHVACEventsByDay,
  getHVACEventsByRange,
  getHVACRangeCount,
} from "../../graphql/queries";

export default function HVACWidget({ type }) {
  function getQueryResultsByDay(day, type) {
    let query = getHVACEventsByDay({
      day,
      type,
    });
    // rangeResults(query);
  }

  const defaultStartDate = new Date(2020, 5, 1);
  const defaultEndDate = new Date(2020, 6, 31);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [HVACType, setHVACType] = useState("AC");

  const [rangeResults, fetchData] = useQuery();
  const [rangeResults2, fetchData2] = useQuery();
  // const { rangeCount, fetchData } = useQuery();
  console.log("1>>", rangeResults, " 2 >>", rangeResults2);

  function getQueryResultsByRange({ start, end, type }) {
    // console.log("sfsadf", query);
    fetchData(getHVACEventsByRange({ start, end, type }));
    fetchData2(getHVACRangeCount({ start, end, type }));
  }
  return (
    <div>
      <h2>{HVACType} Activations</h2>
      <h2>
        From {formatDate(startDate)} to {formatDate(endDate)}
      </h2>
      <div>
        <label>Select HVAC Type (Heater or AC)</label>
        <select
          name="type"
          defaultValue={HVACType}
          onChange={(e) => setHVACType(e.target.value)}
        >
          <option value="AC">AC</option>
          <option value="Heater">Heater</option>
        </select>
      </div>
      <div>
        <label>Start Date</label>
        <DatePicker
          selected={startDate || defaultStartDate}
          minDate={defaultStartDate}
          maxDate={defaultEndDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        <label>End Date</label>
        <DatePicker
          selected={endDate || defaultEndDate}
          minDate={new Date("06-01-2020")}
          maxDate={new Date("07-31-2020")}
          onChange={(date) => setEndDate(date)}
        />
      </div>
      <button
        onClick={() =>
          getQueryResultsByRange({
            start: formatDate(startDate),
            end: formatDate(endDate),
            type: HVACType,
          })
        }
      >
        Submit
      </button>
    </div>
  );
}
