var mongoose = require("mongoose");
var schemas = require("../schema/schema");
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
    return this.find(
      { uid: user instanceof Object ? user.uid : user },
      callback
    );
  },
  byCourse: function(course, callback) {
    return this.find(
      { cid: course instanceof Object ? course.cid : course },
      callback
    );
  },
  hasAccessToCourse: function(user, course, callback) {
    let self = this;
    if (course instanceof Object && "cid" in course) {
      return this.findOne(
        {
          uid: user instanceof Object ? user.uid : user,
          cid: course instanceof Object ? course.cid : course
        },
        callback
      );
    } else if (
      course instanceof Object &&
      "term" in course &&
      "title" in course
    ) {
      return schemas.Course.exact(
        { term: course.term, title: course.title },
        function(err, ok) {
          if (err) console.log(err);
          self.findOne(
            {
              uid: user instanceof Object ? user.uid : user,
              cid: ok.cid
            },
            callback
          );
        }
      );
    }
  },
  byCourseAndLevel: function(course, level, callback) {
    return this.find({ cid: course.cid || course, level: level }, callback);
  },
  byUserAndLevel: function(user, level, callback) {
    return this.find({ uid: user.uid || user, level: level }, callback);
  },
  byUserAndCidArray: function(user, cids, callback) {
    let uid = user instanceof Object ? user.uid : user;
    console.log(uid);
    return this.find({ uid: uid, cid: { $in: cids } }, callback);
  }
};

var Access = mongoose.model("Access", accessSchema, "Access");

module.exports = {
  Access,
  ACCESS_LEVELS
};
