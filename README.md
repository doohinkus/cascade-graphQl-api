## Cascade GraphQl Api Project in Progress

Stack used:

- GraphQl / Apollo Server
- MongoDb
- React
- Docker / Docker Compose

# Run Locally

## Step 1 Run Mongo in Docker Container

Change into mongo directory. Run the following command.

**mongo**
```
docker-compose pull
```

```
docker-compose build --no-cache
```

And then run this command:

```
docker-compose up
```

This will launch and run the mongo database--creating shared folders in the **mongo** directory. This is how the data is persisted on subsequent runs.

## Step 2 Populate MongoDb

### Populate the mongo database

Change directories into **apollo-server**
Run the following command to install node_modules.

**apollo-server**

```
npm install
```

After modules are installed run this command:

```
npm run loadData
```

This will load data into mongo db through mongoose. You should see a success message. Terminate the process. (This is klunky--I had big issues trying to use docker to load the data. I am actively learning more about Docker so I can fix this issue.)

## Step 3 Run Apollo / Play with Queries

With mongo running, change directories into **apollo-server**

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

## Stopping Docker

To stop mongo, terminate the process in the terminal.
Then use this command:

```
docker-compose down --remove-orphans
```

When you are ready to run the project again, you can restart mongo:

```
docker-compose up
```

If you did NOT delete the docker created sub folders -> **mongo** and **mongo.docker** then the data from the previous run should remain on subsequent runs.

Todo:

- More Unit Tests -- there are very few in the UI
- Improve data seeding
- CI/CD process (Would like to dockerize run the project in ngnix)
- UI (I rushed though UI, there is much to be improved--but the core features are present)

* SECURITY-- I would NEVER include .env with senstive information in git. However, the .env files in the project are needed to run locally. Also, the db is containerized, so it's not an issue in DEV, it would be huge gigantic issue in PROD.
