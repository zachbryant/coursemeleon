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
  term_start: Date,
  announcements: {
    type: String,
    required: false,
    default: ""
  }
});
// Index on course name ASCENDING and within each group term_start DESCENDING
courseSchema.index({ cname: 1, term_start: -1 });

// For doing general work on "Courses"
courseSchema.statics = {
  byCid: function(cid, callback) {
    return this.findOne({ cid: cid }, callback);
  },
  byName: function(name, callback) {
    return this.find({ cname: new RegExp(name, "i") }, callback);
  },
  byAbbr: function(abbr, callback) {
    return this.find({ abbr: new RegExp(abbr, "i") }, callback);
  },
  exact: function(params, callback) {
    return this.findOne(params, callback);
  },
  byTermStart: function(termStart, callback) {
    return this.find({ term_start: termStart }, callback);
  }
};

// For doing instance work on a Course
courseSchema.methods = {
  updateObject: function(obj, callback) {
    let self = this;
    Object.keys(obj).map(key => {
      if (key in self) self[key] = obj[key];
    });
    this.save(callback);
  }
};

var Course = mongoose.model("Course", courseSchema, "Courses");
module.exports = Course;
