import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VToolTip from "v-tooltip";
import Vuetify from "vuetify";
import "./registerServiceWorker";
import VeeValidate from "vee-validate";

import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/es5/util/colors";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "chart.js";
import "hchs-vue-charts";
Vue.use(window.VueCharts);

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
