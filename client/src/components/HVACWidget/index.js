import { useState } from "react";
import MapArray from "../MapArray";
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
import { Heater, AC } from "../HVACIcons";

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
  const [showCount, setShowCount] = useState(false);
  const [showDates, setShowDates] = useState(false);

  const [rangeResults, fetchRangeResults] = useQuery();
  const [countResults, fetchCount] = useQuery();
  // const { rangeCount, fetchRangeResults } = useQuery();
  // console.log("1>>", rangeResults, " 2 >>", countResults);

  async function getQueryResultsByRange({ start, end, type }) {
    await fetchRangeResults(getHVACEventsByRange({ start, end, type }));
    await fetchCount(getHVACRangeCount({ start, end, type }));
    await setShowCount(true);
  }

  async function handleHVACTypeChange(e) {
    await setHVACType(e.target.value);
    await setShowCount(false);
  }

  return (
    <div className="container">
      {HVACType === "Heater" ? <Heater /> : <AC />}
      <h2 className="center">{HVACType} Activations</h2>
      <h3 className="center">
        {formatDate(startDate)} to {formatDate(endDate)}
      </h3>
      <h2 className="center big">
        {showCount ? (
          <MapArray
            array={countResults.HVACRangeCount}
            mapFunc={({ HVACCount }) => <div key={HVACCount}>{HVACCount}</div>}
          />
        ) : (
          "?"
        )}
      </h2>
      {/* Shows dates
      <div className="flex flex-wrap center">
        <MapArray
          array={rangeResults.HVACRange}
          mapFunc={({ Date }) => <span key={Date}>{Date}</span>}
        />
      </div> */}
      <div className="center">
        <div>
          <label>Select HVAC Type (Heater or AC)</label>
          <select
            name="type"
            defaultValue={HVACType}
            onChange={handleHVACTypeChange}
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
          className="center"
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
    </div>
  );
}
