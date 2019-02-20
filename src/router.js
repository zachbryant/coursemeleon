import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
//import fs from "file-exists";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    /*
    {
      path: "/course/:selectedCoursePage",
      name: "home",
      component: Home,
      props: true,
      beforeEnter: (to, from, next) => {
        var path =
          "./components/coursepages/" + to.params.selectedCoursePage + ".vue";
        console.log(path);
        next("/404");
        /*if (!fs.sync(path)) {
          next("/404");
        } else {
          next();
        }*/
      }
    },
    */
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
        import(/* webpackChunkName: "Error" */ "./views/Error.vue"),
      beforeEnter: (to, from, next) => {
        next("/404");
      }
    }
  ]
});
