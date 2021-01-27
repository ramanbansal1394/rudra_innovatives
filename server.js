const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const morgan = require("morgan");
require('dotenv').config();

const port = process.env.PORT || 5000;

// create express app
const app = express();

const cors = require("cors");
app.use(cors());

app.use(morgan("dev"));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

require("./routes")(app);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
