# Node JS boilerplate with Docker

- Simple Web Server
- MongoDB database (You can change this in the docker-compose (2) file)
- Nodemon for Development

## Requirements

- Docker
- Node 10 and npm 5 (You can change this in the Dockerfile (1) image file)

## Installation

1. Clone repository

`git clone https://github.com/gmoralesc/node-basic-boilerplate-docker`

2. Go to the project folder and up the enviroment

`cd node-basic-boilerplate-docker`
`docker-compose up`

The app will run in development mode and Nodemon will looking for changes in the directory and restart the app

3. If you want to run command inside the container

In a new terminal session:

A. Identify the name of the container:

`docker container ls`

B. Run the command:

`docker exec [name] npm test`

Another example:

`docker exec [name] npm install eslint --global`

(The last argument is the command)

## Configuration files

1. Dockerfile: Docker image
2. docker-compose.yml: Docker services
3. package.json: npm scripts
