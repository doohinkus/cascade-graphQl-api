import { render, screen } from "@testing-library/react";
import Header from "./index.js";

describe("Header", () => {
  test("Renders without crashing", () => {
    render(<Header />);
  });
});
