import { useState } from "react";
import MapArray from "../MapArray";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/client";
import { formatDate } from "../../helpers";
import "./HVACWidget.css";

import { HVAC_EVENTS_COUNT } from "../../graphql/queries";
import { Heater, AC } from "../HVACIcons";
import Button from "../Button";

export default function HVACWidget({ type }) {
  const defaultStartDate = new Date(2020, 5, 1);
  const defaultEndDate = new Date(2020, 6, 31);

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [HVACType, setHVACType] = useState("AC");
  const { data, refetch } = useQuery(HVAC_EVENTS_COUNT, {
    variables: {
      start: `${formatDate(startDate)}`,
      end: `${formatDate(endDate)}`,
      type: `${HVACType}`,
    },
  });

  async function handleHVACTypeChange(e) {
    await setHVACType(e.target.value);
  }
  async function handleSubmit() {
    // console.log(" COUNT", data?.HVACRangeCount);

    await refetch();
  }
  return (
    <div className="container" data-testid="hvac-widget">
      {HVACType === "Heater" ? <Heater /> : <AC />}
      <h2 className="center" data-testid="activations">
        {HVACType} Activations
      </h2>
      <h3 className="center" data-testid="dates">
        {formatDate(startDate)} to {formatDate(endDate)}
      </h3>
      <h2 className="center big" data-testid="number-activations">
        {data?.HVACRangeCount.length ? (
          <MapArray
            array={data?.HVACRangeCount}
            mapFunc={({ HVACCount }) => (
              <div data-testid="HVAC-count" key={HVACCount}>
                {HVACCount}
              </div>
            )}
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
            data-testid="HVACSelectType"
            defaultValue={HVACType}
            onChange={handleHVACTypeChange}
          >
            <option value="AC">AC</option>
            <option value="Heater">Heater</option>
          </select>
        </div>
        <div data-testid="DatePickerStart">
          <label>Start Date</label>
          <DatePicker
            id="start-date"
            selected={startDate || defaultStartDate}
            minDate={defaultStartDate}
            maxDate={defaultEndDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>
        <div data-testid="DatePickerEnd">
          <label>End Date</label>
          <DatePicker
            id="end-date"
            selected={endDate || defaultEndDate}
            minDate={defaultStartDate}
            maxDate={defaultEndDate}
            onChange={(date) => setEndDate(date)}
          />
        </div>
        <Button handleSubmit={handleSubmit}>Submit</Button>
        {/* <button
          className="center"
          data-testid="hvac-results-button"
          onClick={handleSubmit}
        >
          Submit
        </button> */}
      </div>
    </div>
  );
}
