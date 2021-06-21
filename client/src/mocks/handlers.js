import { graphql } from "msw";
import { graphql as graphqlRequest, buildSchema } from "graphql";
import { typeDefs } from "../../../apollo-server/src/graphql";
import {
  getHVACEventsByDay,
  getHVACEventsByRange,
  getHVACRangeCount,
} from "../graphql/queries";

export const handlers = [
  graphql.query(
    `${getHVACRangeCount({ start: "asdf", end: "afsdf", type: "ac" })}`,
    (req, res, ctx) => {
      return res(
        ctx.data({
          HVACRangeCount: {
            HVACRangeCount: 10,
          },
        })
      );
    }
  ),
];
