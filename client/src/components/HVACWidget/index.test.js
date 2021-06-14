import { render, screen } from "@testing-library/react";
import HVACWidget from "./index.js";

describe("HVACWidget", () => {
  test("Renders without crashing", () => {
    render(<HVACWidget />);
  });
  test("Renders date range", async () => {
    render(<HVACWidget />);
    const activations = screen.getByTestId("activations");
    let dateRange = await screen.getByText(/06\/01\/2020 to 07\/31\/2020/);
    expect(dateRange).toBeInTheDocument();
  });
});
