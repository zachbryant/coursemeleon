import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);
const BASE_URL = "http://localhost:5000";
let apiLogin = BASE_URL + "/api/auth/login/";
let apiPermission = BASE_URL + "/api/access/";
let apiQueryCourse = BASE_URL + "/api/course/?";
let apiUserCourses = apiPermission + "";
let isDev = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    user: localStorage.getItem("user") || null,
    token: localStorage.getItem("token") || "",
    edit: false,
    editData: null,
    componentEditMenuOptions: [
      { title: "Rich text", instanceName: "rich-content" },
      { title: "Embed document", instanceName: "doc-embed" }
    ],
    status: "",
    userCourses: {},
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
    }
  },
  getters: {
    isEditMode: state => state.edit,
    getEditData: state => state.editData,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user,
    getUserCourses: state => state.userCourses,
    navDrawerState: state => state.drawer,
    getApiResult: state => state.apiResult,
    componentEditMenuOptions: state => state.componentEditMenuOptions
  },
  mutations: {
    setEditData(state, editData) {
      state.editData = editData;
    },
    toggleEditMode(state, editData) {
      state.edit = !state.edit;
      if (state.edit) this.commit("setEditData", editData);
    },
    setApiResult(state, result) {
      state.apiResult = result;
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
    queryCourse({ commit }, params) {
      return new Promise((resolve, reject) => {
        var queryString = Object.keys(params)
          .map(key => key + "=" + params[key])
          .join("&");
        Axios({
          url: apiQueryCourse + queryString,
          method: "GET"
        })
          .then(resp => {
            console.log("Course query response: " + JSON.stringify(resp.data));
            commit("setApiResult", resp.data);
            resolve(resp);
          })
          .catch(err => {
            commit("setApiResult", {});
            reject(err);
          });
      });
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
            localStorage.setItem("token", token);
            Axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
            commit("auth_success", token);
            resolve(resp);
          })
          .catch(err => {
            var message;
            console.log(err);
            if (err.response.status == 401) {
              message = "Your code didn't work.";
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
        delete Axios.defaults.headers.common["Authorization"];
        resolve();
      });
    }
  },
  strict: isDev
});
