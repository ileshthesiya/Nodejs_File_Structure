const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require("dotenv/config");
const morgan = require('morgan');

// create express app
const app = express();

//morgan
app.use(morgan('tiny'));
app.use(express.json());

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const adminRouter = require("./routes/router");
app.use("/admin", adminRouter);

// Connecting to the database
const CONNECTION_STRING=process.env.CONNECTION_STRING
mongoose.set('strictQuery', true);
mongoose.connect(CONNECTION_STRING, {
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database...', err);
});

// listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});