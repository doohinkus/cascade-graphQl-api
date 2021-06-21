import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
} from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useQuery from "../../hooks/useQuery";
import HVACWidget from "./index.js";
// import { formatDate } from "../../helpers";
import {
  getHVACEventsByDay,
  getHVACEventsByRange,
  getHVACRangeCount,
} from "../../graphql/queries";

import { server } from "../../mocks/server";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe("HVACWidget", () => {
  beforeEach(async () => {
    // setup a DOM element as a render target
    // MUST mock the async functions or tests won't load
    // Use this pattern for tests -> pull out methods, act, make assertions
    await jest.mock("./index.js");

    render(<HVACWidget />);
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
  test("Shows ac icon when ac is selected", async () => {
    await act(async () => {
      const HVACSelect = await screen.getByTestId("HVACSelectType");
      await fireEvent.change(HVACSelect, { target: { value: "ac" } });
      const acIcon = await screen.getByTestId("ac icon");
      expect(acIcon).toBeInTheDocument();
    });
  });
  test("Shows heater icon when heater is selected", async () => {
    await act(async () => {
      const HVACSelect = await screen.getByTestId("HVACSelectType");
      await fireEvent.change(HVACSelect, { target: { value: "Heater" } });
      const heaterIcon = await screen.getByTestId("heater icon");
      expect(heaterIcon).toBeInTheDocument();
    });
  });

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
  test("Updates submit button is clicked", async () => {
    await act(async () => {
      const submit = await screen.findAllByTestId("hvac-results-button");
      // console.log(submit);
      fireEvent.click(submit[0]);
      expect(await screen.findByTestId("activations")).toBeInTheDocument();
    });
  });
});
