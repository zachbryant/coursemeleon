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
			// Not lazy loading b/c we want this to be fast
			component: Home,
		},
		{
			path: "/explore",
			name: "explore",
			// route level code-splitting (lazy load
			component: () =>
				import(/* webpackChunkName: "explore" */ "./views/Explore.vue"),
		},
		{
			path: "/about",
			name: "about",
			// route level code-splitting (lazy load)
			component: () =>
				import(/* webpackChunkName: "about" */ "./views/About.vue"),
		},
		{
			path: "/help",
			name: "help",
			// route level code-splitting (lazy load
			component: () =>
				import(/* webpackChunkName: "help" */ "./views/Help.vue"),
		},
	],
});
