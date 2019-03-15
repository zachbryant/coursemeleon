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
        requiresAuthQueries: true
      }
    },
    {
      path: "/manage:cid",
      name: "manage",
      component: () => import("./views/Manage.vue"),
      alias: "/edit",
      meta: {
        requiresAuth: true
      },
      props: true
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
      path: "*",
      name: "error",
      // route level code-splitting (lazy load)
      component: () => import("./views/Error.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !!record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next({ path: "/login", props: to.props });
    return;
  }
  if (to.matched.some(record => !!record.meta.requiresAuthQueries)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    if (!isObjectEmpty(to.query)) {
      next({ path: "/login", props: to.props, query: to.query });
      return;
    }
  }
  next();
});

export default router;
