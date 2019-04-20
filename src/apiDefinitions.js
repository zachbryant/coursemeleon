const BASE = "http://localhost:5000";

let API = {
  BASE: BASE,
  ACCESS: BASE + "/api/auth/",
  COURSE: BASE + "/api/course/",
  FILE: BASE + "/api/file/"
};
API.QUERY_COURSE = API.COURSE + "get/?";
API.QUERY_COURSE_ALL = API.COURSE + "getAll/?";
API.PUT_COURSE = API.COURSE + "put";
API.USER_IDENTITY = API.ACCESS + "user/";
API.USER_COURSES = API.ACCESS + "user/courses/";
API.COURSE_ACCESS = API.ACCESS;
API.USER_ACCESS_COURSE = API.ACCESS;
API.COURSE_USERS = API.COURSE + "access/?";
API.LOGIN = API.ACCESS + "login";
API.LOGOUT = API.ACCESS + "logout";
API.SEND_FILE = API.FILE;
API.RETRIEVE_FILE = API.FILE;

const ACCESS_LEVELS = {
  NONE: 0,
  VIEW: 1,
  EDIT: 2,
  ADMIN: 3,
  OWNER: 4,
  OP: 5
};

module.exports = {
  API,
  ACCESS_LEVELS
};
