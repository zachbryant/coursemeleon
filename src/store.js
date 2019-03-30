import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);
const BASE_URL = "http://localhost:8080";
let apiLogin = BASE_URL + "/api/login/";
let apiPermission = BASE_URL + "/api/permission/";
let apiCourse = BASE_URL + "/api/course/";
let apiUserCourses = apiPermission + "";
let isDev = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || "",
    status: "",
    userCourses: {},
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
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user,
    getUserCourses: state => state.userCourses,
    navDrawerState: state => state.drawer
  },
  mutations: {
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
      console.log(state.drawer.mini);
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
    userCourses(state, courses) {
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
              state.commit("userCourses", resp.data.courses);
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
