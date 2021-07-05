import React, { createContext, useState } from "react";

const defaultState = {
  dates: {
    startDate: new Date(2020, 5, 1),
    endDate: new Date(2020, 6, 31),
    defaultStartDate: new Date(2020, 5, 1),
    defaultEndDate: new Date(2020, 6, 31),
  },
  HVACType: "AC",
};

export const HVACContext = createContext({});

export default function Context({ children }) {
  const [dates, setDates] = useState({ ...defaultState.dates });
  const [HVACType, setHVACType] = useState("AC");
  const functions = { setDates, setHVACType };
  const state = {
    ...defaultState,
    dates: { ...dates },
    HVACType,
    ...functions,
  };
  //   console.log(dates, " ", state);
  return <HVACContext.Provider value={state}>{children}</HVACContext.Provider>;
}
