var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var accessSchema = new Schema({
  uid: String,
  cid: String,
  level: Number
});
accessSchema.index({ uid: 1, cid: 1 });

accessSchema.statics = {
  byUser: function(user, callback) {
    return this.find({ uid: user.id || user }, callback);
  },
  byCourse: function(course, callback) {
    return this.find({ cid: course.id || course }, callback);
  },
  findAccess: function(user, course, callback) {
    return this.find(
      { uid: user.id || user, cid: course.id || course },
      callback
    );
  },
  byCourseAndLevel: function(course, level, callback) {
    return this.find({ cid: course.id || course, level: level }, callback);
  }
};

var Access = mongoose.model("Access", accessSchema, "Access");

module.exports = Access;
