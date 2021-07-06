import { render, screen } from "@testing-library/react";
import HVACDatesDisplay from "./index.js";

describe("HVACDatesDisplay", () => {
  test("Renders without crashing", () => {
    // data?.HVACRangeCount[0]?.HVACCount
    render(
      <HVACDatesDisplay
        HVACType="ac"
        dates={{
          startDate: new Date("06-02-2020"),
          endDate: new Date("07-02-2020"),
        }}
        data={{ HVACRangeCount: [{ HVACCount: 10 }] }}
      />
    );
  });
  test("Displays error", async () => {
    render(
      <HVACDatesDisplay
        HVACType="ac"
        error={true}
        dates={{
          startDate: new Date("06-02-2020"),
          endDate: new Date("07-02-2020"),
        }}
        data={{ HVACRangeCount: [{ HVACCount: 10 }] }}
      />
    );
    const error = screen.getByTestId("error");
    expect(error.textContent).toBe("Error");
  });
  test("Displays no results", async () => {
    render(
      <HVACDatesDisplay
        HVACType="ac"
        error={false}
        dates={{
          startDate: new Date("06-02-2020"),
          endDate: new Date("07-02-2020"),
        }}
        data={{ HVACRangeCount: [{ HVACCount: 0 }] }}
      />
    );
    const results = screen.getByTestId("results");
    expect(results.textContent).toBe("No results");
  });
});
