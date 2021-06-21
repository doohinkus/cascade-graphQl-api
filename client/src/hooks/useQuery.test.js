import { renderHook, act } from "@testing-library/react-hooks";
import useQuery from "./useQuery";
import {
  getHVACEventsByDay,
  getHVACEventsByRange,
  getHVACRangeCount,
} from "../graphql/queries";

// jest.mock("axios");
// src/setupTests.js
import { server, setUpServer } from "../mocks/server.js";
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe("useQuery Hook", () => {
  it("get correct data", async () => {});
});
