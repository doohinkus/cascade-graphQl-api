import axios from "axios";

const graphQlEndpoint = "http://localhost:4000/graphql";
export default async function queryGraphQl(query) {
  console.log(query);
  try {
    const request = await axios({
      url: graphQlEndpoint,
      method: "post",
      data: {
        query: query,
      },
    }).catch((err) => console.log(err));
    const data = await request.data.data;
    console.log("query results>>", data);
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
