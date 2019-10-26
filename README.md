Server-side geospatial analysis app

Built with [Node JS boilerplate with Docker](https://github.com/gmoralesc/node-basic-boilerplate-docker)

# Docker commands
`docker-compose up`  The app will run in development mode and Nodemon will looking for changes in the directory and restart the app

`docker container ls` list containers

`docker exec [name] npm test`

`docker exec [name] npm install eslint --global`

# Mongo commands

To enter Mongo shell on Docker Mongo volume, run `docker exec -it mongo bash` then `mongo` to start mongo shell. Some useful commands include `show collections` and `use <db>`.

To connect via Robo3T, connect to localhost at port 5432.


## MongoDB
Must create a spatial index on geojson collection
//db.collection.createIndex({'geometry': '2dsphere'});

Geojson objects in mongo must be structured like
```
{
    "_id" : ObjectId("582122d4a98c5c6f7b955ebf"),
    "type" : "Feature",
    "properties" : {
        "OBJECTID" : 9,
        "TYPE" : "LIB",
        "DESCRIPTION" : "GEORGE MASON REGIONAL LIBRARY",
        …
        "Editor" : "FairfaxCounty"
    },
    "geometry" : {
        "type" : "Point",
        "coordinates" : [
            -77.18621789486043,
            38.82741811639861
        ]
    }
}
```

which is different than how they are structured for mapbox layer
