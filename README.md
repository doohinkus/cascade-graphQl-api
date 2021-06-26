# Master branch is the first iteration, here is the second:

https://github.com/doohinkus/cascade-graphQl-api/tree/apollo-client

## Cascade GraphQl Api Project in Progress

Stack used:

- GraphQl / Apollo Server / Apollo Client
- MongoDb
- React
- Docker
- React Testing Library / Apollo Client Testing

## Mongo is hosted on MongoDB Atlas Cloud

I removed the docker mongo dependency. The data is hosted on remote mongo cloud server. Here are the updated directions.

## Step 1 Run Apollo

**apollo-server**

```
npm install
```

## Step 2 Run Apollo / Play with Queries

Change directories into **apollo-server**

**apollo-server**

```
npm run serve
```

This will launch apollo server. There should be a success message in the console.

You can use the apollo query tool to view results:
http://localhost:4000

![Graphql](images/graphql.png)

A few queries to try:

```
   query {
        HVACRange(startDate: "06/01/2020", endDate: "07/31/2020", type: "AC"){
          Date
          hasTriggeredHeater
          hasTriggeredAC
          HVACEventsCount
        }
      }
```

The query above shows results for AC events. You can add or remove fields. For instance, you can remove **hasTriggeredHeater** as a result, that field will not be present in the json response. Other avialable fields should auto suggest.

Note: HVACEventsCount shows all AC events for the date range--that is why the number is high--it's activations by the hour. **HVACRangeCount** is the count requested in the challenge. It counts the days the HVAC was on at least once.

## Step 4 Run Client

![Cascade](images/cascade.png)

With apollo and mongo running, change directories into **client**. Run the following command to install node_modules.

**client**

```
npm install
```

After installing node_modules, run this command

```
npm start
```

The client will launch here:
http://localhost:3000

I have written some code to show the dates in the UI--but it's commented out. My idea was to show the dates, and then let the user click on the date, a modal would show the HVAC details for that date (details page). I decided to focus more effort on Graphql because UI was extra. As a result, the queries and resolvers are written for the feature--but the UI is not.

Todo:

- ~~More Unit Tests -- there are very few in the UI.~~ 100% unit test converage
  **client**

```
npm run test:cov
```

- Improve data seeding
- CI/CD process (Would like to dockerize run the project in ngnix)
- UI, including basic date (I rushed though UI, there is much to be improved--but the core features are present)

* SECURITY-- I would NEVER include .env with senstive information in git. However, the .env files in the project are needed to run locally. Also, the db is containerized, so it's not an issue in DEV, it would be huge gigantic issue in PROD.
