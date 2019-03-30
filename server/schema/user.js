var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const uuidv4 = require("uuid/v4");

var userSchema = new Schema({
  uname: String,
  uid: {
    type: String,
    default: uuidv4()
  },
  email: String,
  savedCourses: {
    type: Array,
    default: []
  }
});

userSchema.statics.authenticate = function(req, res, callback) {};
userSchema.statics.generateCode = function(req, res, callback) {};

var User = mongoose.model("User", userSchema);

module.exports = User;
