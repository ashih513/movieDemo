var express = require('express');
const dotenv = require('dotenv').config()
var cors = require('cors');
var path = require('path');

var adminRouter = require("./route/admin");
var bodyParser = require('body-parser');
var fileUpload = require("express-fileupload");
var cors = require('cors')
const MongoDBConnection = require("./connection/MongoDBConnection");
require("dotenv").config();

// Set path to .env file

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(fileUpload())


app.use(cors()) // enable cors

// admin api route
app.use('/api/admin', adminRouter);

// user api route 
app.use("/movies", express.static(path.join(__dirname, '../public/movies')))

 
let PORT = process.env.PORT;
let LIVE_URL = process.env.LIVE_URL;
// app.listen(PORT, "halalguide.etrueconcept.com", () => {
//   console.log(`Server is up and running on ${PORT} ...`);
// });
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}.`);
});
