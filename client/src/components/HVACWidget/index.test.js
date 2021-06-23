import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
} from "@testing-library/react";
import HVACWidget from "./index.js";
import { MockedProvider } from "@apollo/client/testing";

describe("HVACWidget", () => {
  beforeEach(async () => {
    // setup a DOM element as a render target
    // MUST mock the async functions or tests won't load
    // Use this pattern for tests -> pull out methods, act, make assertions
    await jest.mock("./index.js");

    render(
      <MockedProvider>
        <HVACWidget />
      </MockedProvider>
    );
  });

  afterEach(cleanup);

  test("Renders heading", async () => {
    let heading = await screen.queryAllByText(/AC Activations/);
    expect(heading).toHaveLength(1);
  });
  test("Renders date range", async () => {
    let dateRange = await screen.getByText(/06\/01\/2020 to 07\/31\/2020/);
    expect(dateRange).toBeInTheDocument();
  });
  // test("Shows ac icon when ac is selected", async () => {
  //   await act(async () => {
  //     const HVACSelect = await screen.getByTestId("HVACSelectType");
  //     await fireEvent.change(HVACSelect, { target: { value: "ac" } });
  //     const acIcon = await screen.getByTestId("ac icon");
  //     expect(acIcon).toBeInTheDocument();
  //   });
  // });
  // test("Shows heater icon when heater is selected", async () => {
  //   await act(async () => {
  //     const HVACSelect = document.querySelector('select[name="type"]');
  //     await fireEvent.change(HVACSelect, { target: { value: "Heater" } });
  //     const heaterIcon = await screen.getByTestId("heater icon");
  //     expect(heaterIcon).toBeInTheDocument();
  //   });
  // });

  test("Updates start date when date changes in start date picker", async () => {
    await act(async () => {
      const startDate = document.querySelector("input[id='start-date']");
      fireEvent.change(startDate, {
        target: { value: "06/07/2020" },
      });
      const dateMessage = await screen.findByText(/06\/07\/2020/);
      expect(dateMessage).toBeInTheDocument();
    });
  });
  test("Updates end date when date changes in start date picker", async () => {
    await act(async () => {
      const endDate = document.querySelector("input[id='end-date']");
      fireEvent.change(endDate, {
        target: { value: "06/09/2020" },
      });
      const dateMessage = await screen.findByText(/06\/09\/2020/);
      expect(dateMessage).toBeInTheDocument();
    });
  });
});
