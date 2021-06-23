import { render } from "@testing-library/react";
import Layout from "./index.js";

describe("Layout", () => {
  test("Renders without crashing", () => {
    render(<Layout />);
  });
});
