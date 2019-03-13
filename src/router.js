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
      // route level code-splitting (lazy load
      component: () =>
        import(/* webpackChunkName: "explore" */ "./views/Explore.vue")
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting (lazy load
      component: () =>
        import(/* webpackChunkName: "explore" */ "./views/Login.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting (lazy load)
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/help",
      name: "help",
      // route level code-splitting (lazy load
      component: () => import(/* webpackChunkName: "help" */ "./views/Help.vue")
    },
    {
      path: "*",
      name: "error",
      // route level code-splitting (lazy load)
      component: () =>
        import(/* webpackChunkName: "Error" */ "./views/Error.vue")
    }
  ]
});
