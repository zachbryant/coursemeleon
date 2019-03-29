import Vue from "vue";
import Axios from "axios";
import "es6-promise/auto";
import Vuetify from "vuetify";
import VToolTip from "v-tooltip";
import VeeValidate from "vee-validate";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/es5/util/colors";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "chart.js";
import "hchs-vue-charts";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./registerServiceWorker";

// Make Axios available via this.$http
Vue.prototype.$http = Axios;
// Set Axios authorization to token
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

// Vue Plugins
// Vue form validation
Vue.use(VeeValidate);
// Vue tooltips
Vue.use(VToolTip);
// Vue material css framework
Vue.use(Vuetify, {
  theme: {
    primary: colors.lightGreen.lighten2,
    secondary: colors.lightGreen.lighten2,
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
