# Notebook

A notebook is a digital-analog to a paper notebook

## Features

- Store all your notes in one place
- Complete privacy from other users
- Authenticate and authorize before accessing the notes
- Divides your notes into two parts: Header and Note itself. Just like Google Keep
- Access your notes from anywhere and anytime

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You would require the below system dependencies to run the project.

* Node >= 10.0
* NPM >= 6.0
* MongoDB >= 3.6.0

### Installing

Install the required packages using the below command


```
npm install
```


And that's all you need.

## Running the server

Before starting the server, make sure the `local.env` file is placed in the root folder of the project.

Run the below command to start the node server


```
NODE_ENV=local node index.js
```

if it starts without any error, go to the Swagger/API documentation using the below link in your favorite browser and start exploring.

[http://localhost:8001/docs](http://localhost:8001/docs)

## Built With

* [NodeJs](https://nodejs.org/)
* [ExpressJs](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
