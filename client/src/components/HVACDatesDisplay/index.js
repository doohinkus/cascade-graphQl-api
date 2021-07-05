import React, { Fragment } from "react";
import { formatDate } from "../../helpers";

export default function HVACDatesDisplay({ HVACType, dates, data }) {
  return (
    <>
      <h2 className="center big" data-testid="number-activations">
        <span>{data?.HVACRangeCount[0]?.HVACCount || "?"}</span>
      </h2>
      <h2 className="center" data-testid="activations">
        {HVACType.toUpperCase()} Activations
      </h2>
      <h3 className="center" data-testid="dates">
        {formatDate(dates.startDate)} to {formatDate(dates.endDate)}
      </h3>
    </>
  );
}
