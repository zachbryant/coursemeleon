var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const uuidv4 = require("uuid/v4");

var courseSchema = new Schema({
  cname: String,
  cid: {
    type: String,
    default: uuidv4()
  },
  term: String,
  term_start: Date
});
var Course = mongoose.model("Course", courseSchema);
module.exports = Course;
