import { render, screen, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import Context from "../../context/HVACContext";

import HVACWidget from "../HVACWidget";

describe("HVACWidget", () => {
  test("updates text when ac is selected", async () => {
    await act(async () => {
      const { getByText, getByTestId } = render(
        <MockedProvider>
          <Context>
            <HVACWidget />
          </Context>
        </MockedProvider>
      );
      fireEvent.change(await screen.getByTestId("HVACSelectType"), {
        target: { value: "ac" },
      });
      expect(await screen.getByText(/ac activations/i)).toBeInTheDocument();
    });
  });

  test("updates text when heater is selected", async () => {
    const handleHVACTypeChange = jest.fn();
    let HVACType = "ac";
    await act(async () => {
      const { getByText, getByTestId } = render(
        <MockedProvider>
          <Context>
            <HVACWidget />
          </Context>
        </MockedProvider>
      );
      fireEvent.change(await screen.getByTestId("HVACSelectType"), {
        target: { value: "heater" },
      });
      expect(await screen.getByText(/heater activations/i)).toBeInTheDocument();
    });
  });
  //   test("Updates", async () => {
  //     const startDate = new Date(2020, 5, 1);

  //     const endDate = new Date(2020, 6, 31);
  //     const HVACRangeMock = [
  //       {
  //         request: {
  //           query: HVAC_EVENTS_COUNT,
  //           variables: {
  //             start: `${formatDate(startDate)}`,
  //             end: `${formatDate(endDate)}`,
  //             type: "AC",
  //           },
  //         },
  //         result: {
  //           data: {
  //             HVACRangeCount: [{ HVACCount: 4 }],
  //           },
  //         },
  //       },
  //     ];

  //     const { findByText, findByTestId } = render(
  //       <MockedProvider mocks={HVACRangeMock}>
  //         <HVACWidget />
  //       </MockedProvider>
  //     );
  //     const button = await findByText(/Submit/);
  //     await fireEvent.click(button);
  //     // await fireEvent.click(button);
  //     expect(screen.getByText(`4`)).toBeInTheDocument();
  //   });
  test("Displays default result", async () => {
    const { findByText, findByTestId } = render(
      <MockedProvider>
        <Context>
          <HVACWidget />
        </Context>
      </MockedProvider>
    );
    const defaultValue = await screen.findByTestId("number-activations");
    expect(defaultValue).toBeInTheDocument();
    expect(screen.getByText("?")).toBeInTheDocument();
  });
});
