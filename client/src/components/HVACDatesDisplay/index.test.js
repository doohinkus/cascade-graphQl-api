import { render, screen } from "@testing-library/react";
import HVACDatesDisplay from "./index.js";

describe("HVACDatesDisplay", () => {
  test("Displays correct dates", () => {
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
    // const logo = screen.getByRole("img");
    // expect(logo).toHaveAttribute("src", "heater.png");
    // expect(logo).toHaveAttribute("alt", "Heater image");
  });
});
