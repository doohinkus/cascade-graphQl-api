import { render } from "@testing-library/react";
import SelectDate from "./index.js";

describe("SelectDate", () => {
  test("Renders without crashing", () => {
    render(<SelectDate />);
  });
});
