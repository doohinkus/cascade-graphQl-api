import { render, screen, fireEvent, act } from "@testing-library/react";
import HVACWidget from "./index.js";

describe("HVACWidget", () => {
  test("Renders without crashing", () => {
    render(<HVACWidget />);
  });
  test("Renders date range", async () => {
    render(<HVACWidget />);
    // const activations = screen.getByTestId("activations");
    let dateRange = await screen.getByText(/06\/01\/2020 to 07\/31\/2020/);
    expect(dateRange).toBeInTheDocument();
  });
  test("Shows ac icon when ac is selected", async () => {
    // console.log(screen);
    await act(async () => {
      await render(<HVACWidget />);
      const HVACSelect = await screen.getByTestId("HVACSelectType");
      await fireEvent.change(HVACSelect, { target: { value: "ac" } });
      const acIcon = await screen.getByTestId("ac icon");
      expect(acIcon).toBeInTheDocument();
    });
  });
  test("Shoes heater icon when heater is selected", async () => {
    await act(async () => {
      await render(<HVACWidget />);
      const HVACSelect = await screen.getByTestId("HVACSelectType");
      await fireEvent.change(HVACSelect, { target: { value: "Heater" } });
      const heaterIcon = await screen.getByTestId("heater icon");
      expect(heaterIcon).toBeInTheDocument();
    });
  });
});
