import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

let apiLogin = process.env.BASE_URL + "/api/login/";
let apiPermission = process.env.BASE_URL + "/api/permission/";
let apiCourse = process.env.BASE_URL + "/api/course/";

export default new Vuex.Store({
  state: {
    user: localStorage.getItem("user") || {},
    token: localStorage.getItem("token") || "",
    status: ""
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUser: state => state.user
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = "";
    }
  },
  actions: {
    login({ commit }, credentials) {
      console.log(apiLogin);
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Axios({
          url: apiLogin,
          data: credentials,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            const user = resp.data.user;
            console.log("logged in as " + JSON.stringify(user));
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
            Axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
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
  strict: process.env.NODE_ENV !== "production"
});
