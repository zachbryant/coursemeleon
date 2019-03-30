const mongodb = require("mongodb");

module.exports = {
  getdb: async function() {
    const client = await mongodb.MongoClient.connect(
      "mongodb+srv://user:7987@coursemeleon-slknn.mongodb.net/test?retryWrites=true",
      { useNewUrlParser: true }
    );
    return await client.db("coursemeleon");
  },
  _db: this.getdb,
  isValidEmail: function(email) {
    const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return emailPattern.test(String(email).toLowerCase());
  },

  isAuthorized: function(token) {
    console.log("TODO isAuthorized");
    return !!token;
  },

  queryOne: function(collection, query, projection) {
    return this._db
      ? this._db.collection(collection).findOne(query, projection)
      : { error: "MongoDB client/db invalid in util.js:1" };
  },

  query: function(collection, query, projection) {
    return this._db
      ? this._db.collection(collection).find(query, projection)
      : { error: "MongoDB client/db invalid in util.js:1" };
  },

  removeOne: function(collection, projection, callback) {
    return this._db
      ? this._db.collection(collection).removeOne(projection, callback)
      : { error: "MongoDB client/db invalid in util.js:1" };
  },

  updateOne: function(collection, filter, update) {
    console.log(this._db);
    return this._db
      ? this._db.collection(collection).updateOne(filter, update)
      : { error: "MongoDB client/db invalid in util.js:1" };
  }
};
