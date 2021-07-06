import React, { Fragment } from "react";
import { DisplayHVACIcon } from "../HVACIcons";
import { formatDate } from "../../helpers";

export default function HVACDatesDisplay({
  HVACType,
  dates,
  data,
  loading,
  error,
}) {
  return (
    <>
      <h2 className="center big" data-testid="number-activations">
        {error ? (
          <span data-testid="error">Error</span>
        ) : loading ? (
          <span data-testid="loading">Loading ...</span>
        ) : (
          <span data-testid="results">
            {data?.HVACRangeCount[0]?.HVACCount || "No results"}
          </span>
        )}
      </h2>

      <h2 className="center" data-testid="activations">
        {HVACType.toUpperCase()} Activations
      </h2>
      <DisplayHVACIcon HVACType={HVACType} />
      <h3 className="center" data-testid="dates">
        {formatDate(dates.startDate)} to {formatDate(dates.endDate)}
      </h3>
    </>
  );
}
