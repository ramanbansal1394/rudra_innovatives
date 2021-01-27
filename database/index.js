const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(
  `mongodb+srv://@cluster0.zmx7l.mongodb.net/${config.database}?retryWrites=true&w=majority`,
  {
    user: config.username,
    pass: config.password,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("database connection failed", err);
    } else {
      console.log("Successfully connected to database");
    }
  }
);

module.exports.db = mongoose.connection;
