import { render, screen } from "@testing-library/react";
import MapArray from "./index.js";

describe("HVACWidget", () => {
  test("Renders without crashing", () => {
    render(<MapArray />);
  });
});
