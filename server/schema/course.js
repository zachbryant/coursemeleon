var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const uuidv4 = require("uuid/v4");

var courseSchema = new Schema({
  course_name: String,
  course_abbr: String,
  cid: {
    type: String,
    default: uuidv4()
  },
  tabs: {
    type: Schema.Types.Mixed,
    default: []
  },
  term: {
    type: String,
    required: true
  },
  term_start: {
    type: String,
    required: true
  },
  announcements: {
    type: Schema.Types.Mixed,
    required: false,
    default: []
  },
  color: String,
  font: String,
  published: Boolean,
  whitelist: Boolean,
  pri: {
    type: String,
    default: "no",
    required: false
  }
});
// Index on course name ASCENDING and within each group term_start DESCENDING
courseSchema.index({ title: 1, term_start: -1 });

// For doing general work on "Courses"
courseSchema.statics = {
  byCid: function(cid, callback) {
    return this.findOne({ cid: cid }, callback);
  },
  byCidArray: function(cids, callback) {
    return this.find({ cid: { $in: cids } }, callback);
  },
  byName: function(name, callback) {
    return this.find({ title: new RegExp(name, "i") }, callback);
  },
  byAbbr: function(abbr, callback) {
    return this.find({ abbr: new RegExp(abbr, "i") }, callback);
  },
  exact: function(params, callback) {
    var paramsIgnoreCase = {};
    Object.keys(params).forEach(key => {
      paramsIgnoreCase[key] = new RegExp(params[key], "i");
    });
    return this.findOne(paramsIgnoreCase, callback);
  },
  exactAll: function(params, callback) {
    var paramsIgnoreCase = {};
    Object.keys(params).forEach(key => {
      paramsIgnoreCase[key] = { $regex: params[key], $options: "i" };
    });
    console.log(paramsIgnoreCase);
    return this.find(paramsIgnoreCase, callback);
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
