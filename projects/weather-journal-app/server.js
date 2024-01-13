// Setup empty JS object to act as endpoint for all routes
projectData = {};

const dailyForcast = {
    temperature: 0,
    date: "",
    userResponse: ""
}

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// const bodyParser = require('body-parser') DEPRECATED
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3002;
/* Spin up the server*/
const server = app.listen(port, listening);

function listening(){
   console.log(`running on localhost: ${port}`);
};

// GET route to return the projectData{}
app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
};

// POST route to update the projectData{} object
app.post('/weather', forecast);

function forecast (req,res){
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;

    console.log(projectData);
    res.send(projectData);
};