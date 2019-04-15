var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const uuidv4 = require("uuid/v4");

var courseSchema = new Schema({
  title: String,
  abbr: String,
  cid: {
    type: String,
    default: uuidv4()
  },
  tabs: {
    type: Schema.Types.Mixed,
    default: []
  },
  term: String,
  term_start: Date,
  announcements: {
    type: String,
    required: false,
    default: ""
  },
  color: String,
  font: String,
  published: Boolean,
  whitelist: [String]
});
// Index on course name ASCENDING and within each group term_start DESCENDING
courseSchema.index({ title: 1, term_start: -1 });

// For doing general work on "Courses"
courseSchema.statics = {
  byCid: function(cid, callback) {
    return this.findOne({ cid: cid }, callback);
  },
  byName: function(name, callback) {
    return this.find({ title: new RegExp(name, "i") }, callback);
  },
  byAbbr: function(abbr, callback) {
    return this.find({ abbr: new RegExp(abbr, "i") }, callback);
  },
  exact: function(params, callback) {
    return this.findOne(params, callback);
  },
  byTermStart: function(termStart, callback) {
    return this.find({ term_start: termStart }, callback);
  },
  putOne: function(data, callback) {
    let query = {};
    if ("cid" in data) {
      query.cid = data.cid;
    } else if ("_id" in data) {
      query._id = data._id;
    } else {
      console.log("Received putCourse with bad query: ");
      console.log(data);
    }
    this.findOneAndUpdate(query, data, { upsert: true, new: true }, callback);
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
