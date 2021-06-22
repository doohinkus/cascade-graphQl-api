import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import MapArray from "./index.js";

describe("HVACWidget", () => {
  test("Renders without crashing", () => {
    render(
      <MockedProvider>
        <MapArray />
      </MockedProvider>
    );
  });
});
