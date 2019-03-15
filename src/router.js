import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "overview",
      component: Home
    },
    {
      path: "/explore",
      name: "explore",
      component: () => import("./views/Explore.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    },
    {
      path: "/help",
      name: "help",
      component: () => import("./views/Help.vue")
    },
    {
      path: "*",
      name: "error",
      // route level code-splitting (lazy load)
      component: () => import("./views/Error.vue")
    }
  ]
});
