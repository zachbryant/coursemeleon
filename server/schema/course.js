var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const uuidv4 = require("uuid/v4");

var courseSchema = new Schema({
  cname: String,
  abbr: String,
  cid: {
    type: String,
    default: uuidv4()
  },
  term: String,
  term_start: Date
});
// Index on course name ASCENDING and within each group term_start DESCENDING
courseSchema.index({ cname: 1, term_start: -1 });

courseSchema.statics.byName = function(name, callback) {
  return this.find({ name: new RegExp(name, "i") }, callback);
};
courseSchema.statics.byAbbr = function(abbr, callback) {
  return this.find({ name: new RegExp(abbr, "i") }, callback);
};
courseSchema.statics.byTermStart = function(termStart, callback) {
  return this.find({ term_start: termStart }, callback);
};
courseSchema.statics.exact = function(params, callback) {
  return this.findOne(params, callback);
};

var Course = mongoose.model("Course", courseSchema, "Courses");
module.exports = Course;
