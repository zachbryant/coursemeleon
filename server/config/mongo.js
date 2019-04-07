const mongoose = require("mongoose");

const mongoRemote =
  "mongodb+srv://user:7987@coursemeleon-slknn.mongodb.net/coursemeleon?retryWrites=true";
// Default connection to the db
mongoose.connect(mongoRemote, { useNewUrlParser: true });
var db = mongoose.connection;
// On Error event
db.on("error", console.error.bind(console, "MongoDB connection error: "));
// On connected event
db.on("connected", () => {
  console.log("MongoDB Connected Successfully");
});
// On Disconnected event
db.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

module.exports = {
  mongoRemote,
  db
};
