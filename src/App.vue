<template lang="pug">
  v-app#app(light)
    Navigation(v-on:toggleHamburgerEvent="toggleHamburger")
    hamburger(ref="hamburgerMenu")
    v-content
      v-container#container(fluid align-content-center fill-height fill-width)
        v-layout(column justify-start)
          router-view#routerView
</template>

<script>
import { Navigation, Drawer } from "@/components/componentImports";

export default {
  name: "app",
  data() {
    return {};
  },
  components: {
    Navigation,
    hamburger: Drawer
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      // eslint-disable-next-line no-unused-vars
      return new Promise(function(resolve, reject) {
        // Intercept 401 Unauthorized response (probably expired token)
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
          this.$store.commit(
            "auth_error",
            "Session expired. Please log in again."
          );
        }
        throw err;
      });
    });
  },
  methods: {
    toggleHamburger() {
      this.$refs.hamburgerMenu.toggleDrawer();
    }
  }
};
</script>

<style lang="less">
@import (reference) "App.less";

body,
html {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

#home {
  overflow-y: hidden;
  min-width: @minViewWidthPx;
  position: fixed;
}

#routerView {
  .responsiveSizeH(max-height, 94, 94vh, 95);
}

#app {
  font-family: "Nunito", "Roboto", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#container {
  padding: 0;
}

#header {
  a {
    &.router-link-exact-active {
      color: #ffffff;
    }
  }
}

.justify-text {
  text-align: justify;
  text-justify: inter-word;
}

h1,
h2 {
  color: @primary;
  font-weight: bold;
}

p,
h3,
h4,
h5 {
  color: @textColor;
}

h1,
h2 {
  font-weight: bold;
}

h1 {
  .responsiveSizeW(font-size, 30, 30pt, 48);
}

h2 {
  .responsiveSizeW(font-size, 24, 24pt, 36);
}

h3 {
  .responsiveSizeW(font-size, 18, 18pt, 30);
}

h3,
.v-btn__content {
  font-weight: @semibold;
}

h4,
h5 {
  font-weight: @regular;
}

h4 {
  .responsiveSizeW(font-size, 12, 12pt, 24);
}

h5 {
  .responsiveSizeW(font-size, 12, 12pt, 18);
}

p {
  .responsiveSizeW(font-size, 12, 12pt, 14);
}

span,
p {
  .light();
}

.light {
  font-weight: 200;
}

// Style the vertical drawer divider
.v-navigation-drawer__border {
  background-color: rgba(174, 213, 129, 0.5) !important;
}
//Remove 72px padding in expandable lists
div.v-list__group__items.v-list__group__items--no-action > div > div {
  padding-left: 20px !important;
}
</style>
