import { render, screen, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Button from "./index.js";
import { HVAC_EVENTS_COUNT } from "../../graphql/queries.js";
import { formatDate } from "../../helpers";

import HVACWidget from "../HVACWidget";

describe("HVACWidget", () => {
  test("Renders without crashing", async () => {
    const handleClick = jest.fn();
    await act(async () => {
      const { getByText } = render(
        <Button onClick={handleClick}>Submit</Button>
      );
      fireEvent.click(screen.getByText(/submit/i));
    });
  });
  test("Updates", async () => {
    const startDate = new Date(2020, 5, 1);

    const endDate = new Date(2020, 6, 31);
    const HVACRangeMock = [
      {
        request: {
          query: HVAC_EVENTS_COUNT,
          variables: {
            start: `${formatDate(startDate)}`,
            end: `${formatDate(endDate)}`,
            type: "AC",
          },
        },
        result: {
          data: {
            HVACRangeCount: [{ HVACCount: 4 }],
          },
        },
      },
    ];

    const { findByText, findByTestId } = render(
      <MockedProvider mocks={HVACRangeMock}>
        <HVACWidget />
      </MockedProvider>
    );
    const button = await findByText(/Submit/);
    await fireEvent.click(button);
    // await fireEvent.click(button);
    expect(screen.getByText(`4`)).toBeInTheDocument();
  });
  test("Displays default result", async () => {
    const { findByText, findByTestId } = render(
      <MockedProvider>
        <HVACWidget />
      </MockedProvider>
    );
    const defaultValue = await screen.findByTestId("number-activations");
    expect(defaultValue).toBeInTheDocument();
    expect(screen.getByText("?")).toBeInTheDocument();
  });
});
