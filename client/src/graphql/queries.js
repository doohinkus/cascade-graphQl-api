import { gql } from "@apollo/client";
export const HVAC_EVENTS_COUNT = gql`
  query ($start: Date!, $end: Date!, $type: String!) {
    HVACRangeCount(startDate: $start, endDate: $end, type: $type) {
      HVACCount
    }
  }
`;
export const HVAC_BY_DAY = gql`
  query ($start: Date!, $end: Date!, $type: String!) {
    HVACRangeCount(startDate: $start, endDate: $end, type: $type) {
      HVACCount
    }
  }
`;
