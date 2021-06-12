## Cascade GraphQl Api Project in Progress

Technology used:

- GraphQl / Apollo Server
- MongoDb
- React / Modal / Grid / Chart
- Docker / Docker Compose

<!--
### Run project with Docker
```
docker-compose build --no-cache
```

```
docker-compose up
```

Graphql server runs here: http://localhost:4000

To stop project:

```
docker-compose down --remove-orphans
```

```
docker exec -it mongo-seed_mongo_1 bash
```

```
docker-compose -f "./docker-compose.yml" up -d --build
```

## Run Project in development

cd into the **/mongo-apollo** directory
Open terminal

**/mongo-apollo**

```
npm install
```

And then start mongo server
**/mongo-apollo**

```
docker-compose up mongodb
```

This will build and run mongo. See directions below to stop mongo.

## Populate db

With mongo running, run the following command in the **/mongo-apollo** folder.

**/mongo-apollo**

```
npm run loadCSVtoMongoDB

```

There should be a success message in the console.
With mongo running, run the following command in the **/mongo-apollo** folder.
**/mongo-apollo**

```
npm run start
```

# If there is an issue with npm errors

**/mongo-apollo**

```
npm ci
```

And then try

**/mongo-apollo**

```
npm run start
```

## With both Apollo and Mongo running, play with GraphQl tool

### Graphql queries

http://localhost:4000/graphql

Retrieve days the heater was activated.

```
query{
    HeaterTriggeredDates{
        Date
    }
}
```

You can also change the responses. For example, the folowing will add the hasTriggeredAC:

```
query{
    HeaterTriggeredDates{
        Date
        hasTriggeredAC
    }
}
```

You can also click on the tabs to find other options.
Retrieve days the AC was activated.

```
query{
    ACTriggeredDates{
        Date
    }
}
```

## How to stop the docker mongo instance:

```
docker ps
```

Find the running container, then type:

```
docker stop <first four characters of container id>
```

Run docker ps again to ensure the instance has stopped.

Console should show updates. Stop the server. Then run the following command: -->
