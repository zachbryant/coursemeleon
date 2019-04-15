const BASE = "http://192.168.1.3:5000";

let definitions = {
  BASE: BASE,
  ACCESS: BASE + "/api/auth/",
  COURSE: BASE + "/api/course/"
};
definitions.QUERY_COURSE = definitions.COURSE + "get/?";
definitions.PUT_COURSE = definitions.COURSE + "put";
definitions.USER_ACCESS = definitions.ACCESS + "access";
definitions.LOGIN = definitions.ACCESS + "login";
definitions.LOGOUT = definitions.ACCESS + "logout";

module.exports = definitions;
