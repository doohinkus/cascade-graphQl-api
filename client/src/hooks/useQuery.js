import { useEffect, useState } from "react";
import queryGraphQl from "../async/queryData";

export default function useQuery({ query }) {
  const [graphQlData, setGraphQlData] = useState([]);

  const fetchData = async (query) => {
    console.log(query)
    if (!query) return;
    try {
      //  console.log("QUERY",query)
      let querieResults = await queryGraphQl({ query });
      setGraphQlData(querieResults);
      // console.log("Data>>", customerData);
    }
    catch (err) {
      console.log(err);
      setGraphQlData([])
    }

  }
  // load data
  useEffect(() => {

    fetchData(query);

  }, [query]);

  return { graphQlData, fetchData };
};