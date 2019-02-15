import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidate from "vee-validate";
import VToolTip from "v-tooltip";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import colors from "vuetify/es5/util/colors";
import "./registerServiceWorker";

Vue.use(VeeValidate);
Vue.use(VToolTip);
Vue.use(Vuetify, {
  theme: {
    primary: colors.lightGreen.lighten3,
    secondary: colors.lightGreen.lighten3,
    accent: colors.lightGreen.accent1,
    error: colors.red.lighten1,
    info: colors.lightBlue.lighten1,
    success: colors.green.lighten1,
    warning: colors.yellow.lighten1
  },
  options: {
    customProperties: true
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
