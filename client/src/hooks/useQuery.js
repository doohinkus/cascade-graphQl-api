import { useEffect, useState } from "react";
import queryGraphQl from "../graphql/async";

export default function useQuery(query) {
  const [customersData, setCustomerData] = useState([]);

  const fetchData = async (query) => {
    console.log(query);
    if (!query) return;
    try {
      console.log("QUERY>>>>", query);
      let customerData = await queryGraphQl(query);
      setCustomerData(customerData);
      console.log("Data>>", customerData);
    } catch (err) {
      console.log(err);
      setCustomerData([]);
    }
  };

  return [customersData, fetchData];
}
