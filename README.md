# Node JS boilerplate with Docker 

Simple empty Node JS project to run with Docker

## Requirements
- Docker
- Node 8 and npm 5 (You can change this in the Dockerfile base image)

## Installation

1. Clone repository

`git clone https://github.com/gmoralesc/node-basic-boilerplate-docker`

2. Go to the project folder and up the enviroment

`docker-compose up`

Nodemon will looking for changes in the directory and restart the app

3. If you want to run command inside the container

In a new terminal session:

3a. Identify the name of the container: `docker container ls`

3b. Run the command: `docker container exec npm test` (The last argument is the command) or for example: `docker container exec npm install eslint --global`

## Configuration

- Dockerfile: Docker image
- docker-compose.yml: Docker services
- package.json: npm scripts