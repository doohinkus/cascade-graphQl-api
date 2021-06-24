import { useState } from "react";
import { useQuery } from "@apollo/client";
import { formatDate } from "../../helpers";
import "./HVACWidget.css";
import SelectDate from "../SelectDate";
import HvacType from "../HVACType";
import { HVAC_EVENTS_COUNT } from "../../graphql/queries";
import { Heater, AC } from "../HVACIcons";

export default function HVACWidget() {
  const defaultStartDate = new Date(2020, 5, 1);
  const defaultEndDate = new Date(2020, 6, 31);

  const [dates, setDates] = useState({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });
  const [HVACType, setHVACType] = useState("AC");
  const { data } = useQuery(HVAC_EVENTS_COUNT, {
    variables: {
      start: `${formatDate(dates.startDate)}`,
      end: `${formatDate(dates.endDate)}`,
      type: `${HVACType}`,
    },
  });

  async function handleHVACTypeChange(e) {
    await setHVACType(e.target.value);
  }

  return (
    <div className="container" data-testid="hvac-widget">
      {HVACType === "heater" ? <Heater /> : <AC />}
      <h2 className="center" data-testid="activations">
        {HVACType} Activations
      </h2>
      <h3 className="center" data-testid="dates">
        {formatDate(dates.startDate)} to {formatDate(dates.endDate)}
      </h3>
      <h2 className="center big" data-testid="number-activations">
        <span>{data?.HVACRangeCount[0]?.HVACCount || "?"}</span>
      </h2>

      <div className="center">
        <HvacType
          name="type"
          id="type"
          testId="HVACSelectType"
          defaultValue={HVACType}
          onChange={handleHVACTypeChange}
        />

        <SelectDate
          label="Start Date"
          testId="DatePickerStart"
          id="start-date"
          selected={dates.startDate}
          minDate={defaultStartDate}
          maxDate={defaultEndDate}
          onChange={(date) => setDates({ ...dates, startDate: date })}
        />

        <SelectDate
          label="End Date"
          testId="DatePickerEnd"
          id="end-date"
          selected={dates.endDate}
          minDate={defaultStartDate}
          maxDate={defaultEndDate}
          onChange={(date) => setDates({ ...dates, endDate: date })}
        />
      </div>
    </div>
  );
}
