var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const uuidv4 = require("uuid/v4");

var accessSchema = new Schema({
  uid: String,
  cid: String,
  level: Number
});
var Access = mongoose.model("Access", accessSchema);

module.exports = Access;
