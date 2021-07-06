import React, { createContext, useState } from "react";

export const HVACContext = createContext({});

export default function Context({ children }) {
  const [dates, setDates] = useState({
    startDate: new Date(2020, 5, 1),
    endDate: new Date(2020, 6, 31),
    defaultStartDate: new Date(2020, 5, 1),
    defaultEndDate: new Date(2020, 6, 31),
  });
  const [HVACType, setHVACType] = useState("AC");
  const functions = { setDates, setHVACType };
  const state = {
    dates,
    HVACType,
    ...functions,
  };
  //   console.log(dates, " ", state);
  return <HVACContext.Provider value={state}>{children}</HVACContext.Provider>;
}
