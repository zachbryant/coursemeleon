var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ACCESS_LEVELS = {
  NONE: 0,
  VIEW: 1,
  EDIT: 2,
  ADMIN: 3,
  OWNER: 4,
  OP: 5
};

var accessSchema = new Schema({
  uid: String,
  cid: String,
  level: Number
});
accessSchema.index({ uid: 1, cid: 1 });

accessSchema.statics = {
  byUser: function(user, callback) {
    return this.find({ uid: user.uid || user }, callback);
  },
  byCourse: function(course, callback) {
    return this.findOne({ cid: course.cid || course }, callback);
  },
  hasAccessToCourse: function(user, course, callback) {
    return this.findOne(
      { uid: user.uid || user, cid: course.cid || course },
      callback
    );
  },
  byCourseAndLevel: function(course, level, callback) {
    return this.find({ cid: course.cid || course, level: level }, callback);
  },
  byUserAndLevel: function(user, level, callback) {
    return this.find({ uid: user.uid || user, level: level }, callback);
  }
};

var Access = mongoose.model("Access", accessSchema, "Access");

module.exports = {
  Access,
  ACCESS_LEVELS
};
