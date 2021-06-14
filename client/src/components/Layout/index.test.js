import { render, screen } from "@testing-library/react";
import Layout from "./index.js";

describe("HVACWidget", () => {
  test("Renders without crashing", () => {
    render(<Layout />);
  });
});
