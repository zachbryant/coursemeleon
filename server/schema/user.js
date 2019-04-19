var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const uuidv4 = require("uuid/v4");

let timerMap = {};

var userSchema = new Schema({
  uname: String,
  uid: {
    type: String,
    default: uuidv4()
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  savedCourses: {
    type: Array,
    default: []
  },
  code: {
    type: String,
    default: ""
  }
});

// For doing general work on "Users"
userSchema.statics = {
  byUid: function(uid, callback) {
    return this.findOne({ uid: uid }, callback);
  },
  byUidArray: function(uids, callback) {
    return this.find({ uid: { $in: uids } }, callback);
  },
  byName: function(name, callback) {
    return this.find({ uname: new RegExp(name, "i") }, callback);
  },
  byEmail: function(email, callback) {
    return this.findOne({ email: new RegExp(email, "i") }, callback);
  }
};
// For doing instance work on a User
userSchema.methods = {
  saveCourse: function(course, callback) {
    this.savedCourses.push(course);
    this.save(callback);
  },
  clearCode: function(callback) {
    this.code = "";
    this.save(callback);
  },
  setCode: function(code, callback) {
    this.code = code;
    this.save(callback);
    // Codes expire after X minutes
    var prevTimer = timerMap[this.uid];
    if (prevTimer) {
      clearTimeout(prevTimer);
    }
    let self = this;
    timerMap[this.uid] = setTimeout(function() {
      self.clearCode();
    }, 5 * 60 * 1000);
  }
};

var User = mongoose.model("User", userSchema, "Users");

/*User.create({ uname: "TA 3", email: "ta3@test.com" }, function(err, def) {
  if (err) {
    console.log("Error creating default user: %s", JSON.stringify(err));
  }
  if (def) {
    console.log("Default user: %s", JSON.stringify(def));
  }
});*/

module.exports = User;
