import { graphql } from "msw";
import { HVAC_EVENTS_COUNT } from "../graphql/queries";

export const handlers = [
  graphql.query(HVAC_EVENTS_COUNT, (req, res, ctx) => {
    return res(
      ctx.data({
        HVACRangeCount: {
          HVACRangeCount: 10,
        },
      })
    );
  }),
];
