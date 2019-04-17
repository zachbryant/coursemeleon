import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);
const BASE_URL = "http://localhost:8080";
let apiLogin = BASE_URL + "/api/login/";
let apiPermission = BASE_URL + "/api/permission/";
//let apiCourse = BASE_URL + "/api/course/";
let apiUserCourses = apiPermission + "";
let isDev = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || "",
    status: "",
    userCourses: {},
    color: "#aed581",
    courseIndex: 0,
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user,
    getUserCourses: state => state.userCourses,
    getColor: state => state.color,
    getCourseIndex: state => state.courseIndex
  },
  mutations: {
    unSaveCourse(state, cid) {
      state.userCourses[cid].saved = false;
    },
    saveCourse(state, cid) {
      state.userCourses[cid].saved = true;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state, message) {
      state.status = message || "Unknown error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = "";
      state.userCourses = {};
    },
    setPrimaryColor(state, newcolor) {
      state.color = newcolor;
    },
    setCourseIndex(state, index) {
      console.log("MUTATING " + index);
      state.courseIndex = index;
    }
  },
  actions: {
    getUserCourses({ state }) {
      if (state.getters.isLoggedIn) {
        return new Promise((resolve, reject) => {
          Axios({
            url: String.format(apiUserCourses, state.user.id),
            method: "GET"
          })
            .then(resp => {
              console.log("User courses: " + JSON.stringify(resp.data));
              state.userCourses = resp.data.courses;
              resolve(resp);
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    },
    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Axios({
          url: apiLogin,
          data: credentials,
          method: "POST"
        })
          .then(resp => {
            console.log("Auth request " + JSON.stringify(resp.data));
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
            Axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            var message;
            if (err.status == 401) {
              message = "Your code was invalid or expired.";
            } else {
              message = "That's an error! Try again in a few minutes.";
            }
            commit("auth_error", message);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete Axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  strict: isDev
});
