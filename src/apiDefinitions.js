const BASE = "http://localhost:5000";

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

const ACCESS_LEVELS = {
  NONE: 0,
  VIEW: 1,
  EDIT: 2,
  ADMIN: 3,
  OWNER: 4,
  OP: 5
};

module.exports = {
  definitions,
  ACCESS_LEVELS
};
