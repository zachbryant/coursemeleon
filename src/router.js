import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuthQueries: false
      }
    },
    {
      path: "/explore",
      name: "explore",
      component: () => import("./views/Explore.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue"),
      props: true
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
      path: "/create",
      name: "create",
      meta: {
        requiresAuth: true
      },
      // route level code-splitting (lazy load)
      component: () =>
        import(/* webpackChunkName: "inputInfo" */ "./views/Course")
    },
    {
      path: "*",
      name: "error",
      // route level code-splitting (lazy load)
      component: () => import("./views/Error.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !!record.meta.requiresAuth)) {
    console.log(to);
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next({
      name: "login",
      path: "/login",
      props: to.props,
      meta: to.meta,
      params: {
        redirect: {
          path: to.fullPath,
          props: to.props
        }
      }
    });
    return;
  }
  if (to.matched.some(record => !!record.meta.requiresAuthQueries)) {
    console.log(to);
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    if (!isObjectEmpty(to.query)) {
      next({
        name: "login",
        path: "/login",
        props: to.props,
        meta: to.meta,
        params: {
          redirect: {
            path: to.fullPath,
            props: to.props
          }
        }
      });
      return;
    }
  }
  next();
});

export default router;
