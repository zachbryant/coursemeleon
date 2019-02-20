import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/:selectedCoursePage",
      name: "home",
      component: Home,
      props: true,
      beforeEnter: (to, from, next) => {
        console.log(to.params.selectedCoursePage);
        var fs = require("fs");
        if (
          !fs.existsSync(
            "./components/coursepages/" + to.params.selectedCoursePage + ".vue"
          )
        ) {
          next("/404");
        } else {
          next();
        }
      }
    },
    {
      path: "/",
      name: "home",
      component: Home,
      props: false
    },
    {
      path: "/explore",
      name: "explore",
      // route level code-splitting (lazy load
      component: () =>
        import(/* webpackChunkName: "explore" */ "./views/Explore.vue")
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
      name: "Error",
      // route level code-splitting (lazy load)
      component: () =>
        import(/* webpackChunkName: "Error" */ "./views/Error.vue")
    }
  ]
});
