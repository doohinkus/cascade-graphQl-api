import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { formatDate } from "../../helpers";
import "./HVACWidget.css";
import SelectDate from "../SelectDate";
import HvacType from "../HVACType";
import { HVAC_EVENTS_COUNT } from "../../graphql/queries";
import HVACDatesDisplay from "../HVACDatesDisplay";
// import { DisplayHVACIcon } from "../HVACIcons";
import { HVACContext } from "../../context/HVACContext";

export default function HVACWidget() {
  const { setDates, setHVACType, dates, HVACType } = useContext(HVACContext);
  // console.log(dates.startDate);

  const { loading, error, data } = useQuery(HVAC_EVENTS_COUNT, {
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
      <div className="center">
        <HVACDatesDisplay
          HVACType={HVACType}
          loading={loading}
          error={error}
          dates={dates}
          data={data}
        />

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
          minDate={dates.defaultStartDate}
          maxDate={dates.defaultEndDate}
          onChange={(date) => setDates({ ...dates, startDate: date })}
        />

        <SelectDate
          label="End Date"
          testId="DatePickerEnd"
          id="end-date"
          selected={dates.endDate}
          minDate={dates.defaultStartDate}
          maxDate={dates.defaultEndDate}
          onChange={(date) => setDates({ ...dates, endDate: date })}
        />
      </div>
    </div>
  );
}
