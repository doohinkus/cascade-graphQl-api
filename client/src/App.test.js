import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import App from "./App";

test("Renders without crashing", () => {
  render(
    <MockedProvider>
      <App />
    </MockedProvider>
  );
});
