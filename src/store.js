import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import { stat } from "fs";

Vue.use(Vuex);

const uuidv4 = require("uuid/v4");
const { API, ACCESS_LEVELS } = require("./apiDefinitions");
let isDev = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || "",
    edit: false,
    tabIndex: 0,
    level: ACCESS_LEVELS.NONE,
    course: {
      /*
      course_name: "",
      cid: uuidv4(),
      tabs: [
        {
          title: "",
          id: uuidv4(),
          elements: []
        }
      ],
      abbr: "",
      term: "",
      term_start: "",
      color: "",
      font: "",
      published: false,
      whitelist: false*/
    },
    componentEditMenuOptions: [
      { title: "Announcements", instanceName: "Announcements" },
      { title: "Calendar", instanceName: "Calendar" },
      { title: "Grade stats", instanceName: "Grade" },
      { title: "Office Hours", instanceName: "officehours" },
      { title: "Rich text", instanceName: "rich-content" },
      { title: "Embed document", instanceName: "doc-embed" }
    ],
    status: "",
    userCourses: {},
    viewedCourses: [],//localStorage.getItem("history") || [],
    apiResult: {},
    drawer: {
      // sets the open status of the drawer
      open: !!localStorage.getItem("drawer.open") || false,
      // sets if the drawer is shown above (false) or below (true) the toolbar
      clipped: !!localStorage.getItem("drawer.clipped") || true,
      // sets if the drawer is CSS positioned as 'fixed'
      fixed: !!localStorage.getItem("drawer.fixed") || true,
      // sets if the drawer remains visible all the time (true) or not (false)
      permanent: !!localStorage.getItem("drawer.permanent") || false,
      // sets the drawer to the mini variant, showing only icons, of itself (true)
      // or showing the full drawer (false)
      mini: !!localStorage.getItem("drawer.mini") || false
    },
    errorMessage: "",
    warningMessage: "",
    successMessage: "",
    infoMessage: ""
  },
  getters: {
    course: state => state.course,
    courseColor: state => state.course.color,
    accessLevel: state => state.level,
    errorMessage: state => state.errorMessage,
    warningMessage: state => state.warningMessage,
    successMessage: state => state.successMessage,
    infoMessage: state => state.infoMessage,
    courseTab: state => {
      if (
        state.course &&
        state.course.tabs &&
        state.course.tabs.length >= state.tabIndex
      )
        return state.course.tabs[state.tabIndex];
      return {};
    },
    getTabIndex: state => state.tabIndex,
    isEditMode: state => state.edit,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user,
    getUserCourses: state => state.userCourses,
    getViewedCourses: state => state.viewedCourses,
    navDrawerState: state => state.drawer,
    getApiResult: state => state.apiResult,
    componentEditMenuOptions: state => state.componentEditMenuOptions
  },
  mutations: {
    viewCourse(state, courseObj) {
      var checkIsSaved = cid => {
        Object.keys(state.userCourses).forEach(key => {
          if (key == cid && state.userCourses[key].saved) return true;
        });
        return false;
      };
      state.viewedCourses.unshift({
        cid: courseObj.cid,
        saved: checkIsSaved(courseObj.cid),
        title: courseObj.course_name,
        abbr: courseObj.course_abbr
      });
      localStorage.setItem("history", state.viewedCourses);
    },
    setColor(state, color) {
      state.course.color = color;
    },
    setCourseDates(state, { start_date, end_date, term }) {
      state.course.start_date = start_date;
      state.course.end_date = end_date;
      state.course.term = term;
    },
    setErrorMessage(state, msg) {
      state.errorMessage = msg;
    },
    setWarningMessage(state, msg) {
      state.warningMessage = msg;
    },
    setInfoMessage(state, msg) {
      state.infoMessage = msg;
    },
    setSuccessMessage(state, msg) {
      state.successMessage = msg;
    },
    setPublished(state, value) {
      state.course.published = value;
      state.course.pri = value ? "no" : "yes";
    },
    setWhitelisted(state, value) {
      state.course.whitelist = value;
    },
    removeCourseElement(state, index) {
      if (
        index >= 0 &&
        index < state.course.tabs[state.tabIndex].elements.length
      ) {
        state.course.tabs[state.tabIndex].elements.splice(index, 1);
      }
    },
    insertCourseElement(state, { index, type, data }) {
      //console.log(state.course.tabs[state.tabIndex]);
      if (
        index >= -1 &&
        index < state.course.tabs[state.tabIndex].elements.length
      ) {
        state.course.tabs[state.tabIndex].elements.splice(index + 1, 0, {
          instanceName: type,
          id: uuidv4(),
          data: data
        });
        //onsole.log(state.course.tabs[state.tabIndex].elements);
      }
    },
    updateCourseTabs(state, tabs) {
      state.course.tabs = tabs;
      if (state.tabIndex >= tabs.length) state.tabIndex = 0;
    },
    updateCourseTabElements(state, elements) {
      state.course.tabs[state.tabIndex].elements = elements;
    },
    updateCourseTabElement(state, { index, data }) {
      state.course.tabs[state.tabIndex].elements[index].data = data;
    },
    setTabIndex(state, index) {
      state.tabIndex = index;
    },
    setActiveCourse(state, course) {
      state.course = course;
    },
    setActivePermission(state, level) {
      state.level = level;
    },
    setTitle(state) {
      state.course.course_name = state.course.tabs[0].elements[0].data.text;
    },
    insertCourseTab(state, index) {
      state.course.tabs.splice(index, 0, {
        title: "",
        elements: [],
        id: uuidv4()
      });
    },
    removeCourseTab(state, index) {
      state.course.tabs.splice(index, 1);
    },
    toggleEditMode(state) {
      state.edit = !state.edit;
    },
    setEditMode(state, cond) {
      state.edit = cond;
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleNavDrawer(state) {
      if (state.drawer.permanent) {
        state.drawer.permanent = false;
        localStorage.removeItem("drawer.permanent");
        // set the clipped state of the drawer and toolbar
        state.drawer.clipped = true;
        localStorage.setItem("drawer.clipped", state.drawer.clipped);
      }
      state.drawer.open = !state.drawer.open;
    },
    // toggles the drawer variant (mini/full)
    toggleMiniNavDrawer(state) {
      state.drawer.mini = !state.drawer.mini;
      if (state.drawer.mini)
        localStorage.setItem("drawer.mini", state.drawer.mini);
      else localStorage.removeItem("drawer.mini");
    },
    // changes the drawer to permanent
    makeNavDrawerPermanent(state) {
      state.drawer.permanent = true;
      localStorage.setItem("drawer.permanent", state.drawer.permanent);
      // set the clipped state of the drawer and toolbar
      state.drawer.clipped = false;
      localStorage.removeItem("drawer.clipped");
    },
    setUserCourses(state, courses) {
      state.userCourses = courses;
    },
    unSaveCourse(state, cid) {
      state.userCourses[cid].saved = false;
    },
    saveCourse(state, cid) {
      state.userCourses[cid].saved = true;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state, message) {
      state.status = message || "Unknown error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = "";
      state.userCourses = {};
      localStorage.removeItem("token");
      delete Axios.defaults.headers.common["Authorization"];
      if (state.edit) state.edit = false;
    }
  },
  actions: {
    toggleEditMode({ state, dispatch, commit }, { users }) {
      commit("toggleEditMode");
      commit("setTitle");
      dispatch("updateCourse", state.course);
      dispatch("setCourseUsers", users);
    },
    saveCourse({ commit, state }, course) {
      let cid = course.cid;
      if (!(cid in state.userCourses)) {
        let courses = state.userCourses;
        courses.push(course);
        commit("setUserCourses", courses);
      }
      commit("saveCourse", cid);
      return new Promise((resolve, reject) => {
        Axios({
          url: API.USER_COURSES,
          method: "POST",
          data: { course: course }
        })
          .then(resp => {
            console.log(resp.response);
            resolve(resp.response);
          })
          .catch(err => {
            console.log(err.response);
            reject(err.response);
          });
      });
    },
    unsaveCourse({ dispatch, commit }, course) {
      let cid = course.cid;
      commit("unsaveCourse", cid);
      return new Promise((resolve, reject) => {
        Axios({
          url: API.USER_COURSES,
          method: "DELETE",
          data: { cid: cid }
        })
          .then(resp => {
            console.log(resp.response);
            dispatch("getUserCourses");
            resolve(resp.response);
          })
          .catch(err => {
            console.log(err.response);
            reject(err.response);
          });
      });
    },
    getUserCourses({ state }) {
      if (state.getters.isLoggedIn) {
        return new Promise((resolve, reject) => {
          Axios({
            url: API.USER_COURSES,
            method: "GET"
          })
            .then(resp => {
              console.log("User courses: " + JSON.stringify(resp.data));
              state.commit("userCourses", resp.data.courses);
              resolve(resp);
            })
            .catch(err => {
              reject(err.response);
            });
        });
      }
    },
    getCourseAccessList({ state }) {
      return new Promise((resolve, reject) => {
        let cid = state.course.cid;
        Axios({
          url: API.COURSE_USERS + "cid=" + cid,
          method: "GET"
        })
          .then(resp => {
            resolve(resp.data);
          })
          .catch(err => {
            reject(err.response);
          });
      });
    },
    queryCourse({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        var queryString = Object.keys(params)
          .map(key => {
            if (params[key]) return key + "=" + params[key];
            return "";
          })
          .filter(Boolean)
          .join("&");
        Axios({
          url: API.QUERY_COURSE + queryString,
          method: "GET"
        })
          .then(resp => {
            console.log("Course query response: " + JSON.stringify(resp.data));
            commit("setActiveCourse", resp.data.course);
            commit("setActivePermission", resp.data.level);
            commit("viewCourse", state.course);
            resolve(resp);
          })
          .catch(err => {
            commit("setActiveCourse", {});
            reject(err);
          });
      });
    },
    updateCourse({ commit }, courseObj) {
      return new Promise((resolve, reject) => {
        Axios({
          url: API.PUT_COURSE,
          data: { course: courseObj },
          method: "PUT"
        })
          .then(resp => {
            console.log("Successfully updated course");
            resolve(resp);
          })
          .catch(err => {
            console.log(err);
            reject(err.response);
          });
      });
    },
    setCourseUsers({ state }, usersObj) {
      return new Promise((resolve, reject) => {
        Axios({
          url: API.COURSE_ACCESS,
          data: { user: usersObj, course: state.course.cid },
          method: "PUT"
        })
          .then(resp => {
            console.log("Successfully updated course users");
            resolve(resp);
          })
          .catch(err => {
            console.log("error in course user update");
            console.log(err);
            console.log(err.response);
            reject(err.response);
          });
      });
    },
    sendFile({ commit }, file) {
      return new Promise((resolve, reject) => {
        Axios({
          url: API.SEND_FILE,
          data: file,
          method: "PUT"
        })
          .then(resp => {})
          .catch(err => {});
      });
    },
    retrieveFile({ commit }, file) {
      return new Promise((resolve, reject) => {
        Axios({
          url: API.RETRIEVE_FILE,
          data: file,
          method: "GET"
        })
          .then(resp => {})
          .catch(err => {});
      });
    },
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Axios({
          url: API.LOGIN,
          data: credentials,
          method: "POST"
        })
          .then(resp => {
            //console.log("Auth request " + JSON.stringify(resp.data));
            const token = resp.data.token;
            localStorage.setItem("token", token);
            Axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
            commit("auth_success", token);
            resolve(resp);
          })
          .catch(err => {
            var message;
            console.log("Login error:");
            console.log(err);
            if (err.response.status == 401) {
              message = "Your code didn't work.";
            } else {
              message = "That's an error! Try again in a few minutes.";
            }
            commit("auth_error", message);
            localStorage.removeItem("token");
            reject(err.response);
          });
      });
    },
    logout({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        Axios({
          url: API.LOGOUT,
          method: "GET"
        })
          .then(resp => {
            commit("logout");
            resolve(resp);
          })
          .catch(err => {
            console.log("Problem logging out");
            console.log(err.response);
            reject(err.response);
          });
      });
    }
  },
  strict: isDev
});
