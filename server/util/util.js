const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");


module.exports.isValidEmail = function(email) {
  const emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return emailPattern.test(String(email).toLowerCase());
};

module.exports.getUUIDV4 = function() {
  return uuidv4();
};
