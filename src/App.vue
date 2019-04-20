<template lang="pug">
  v-app#app(light)
    Navigation(v-on:toggleHamburgerEvent="toggleHamburger")
    hamburger(ref="hamburgerMenu")
    v-content
      v-container#container(fluid align-content-center fill-height fill-width)
        v-layout(column justify-start)
          router-view#routerView
          v-alert(:value="!!errorMessage" type="error") {{ errorMessage }}
          v-alert(:value="!!warningMessage" type="warning") {{ warningMessage }}
          v-alert(:value="!!infoMessage" type="info") {{ infoMessage }}
          v-alert(:value="!!successMessage" type="success") {{ successMessage }}
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
  },
  computed: {
    errorMessage() {
      return this.$store.getters.errorMessage;
    },
    warningMessage() {
      return this.$store.getters.warningMessage;
    },
    successMessage() {
      return this.$store.getters.successMessage;
    },
    infoMessage() {
      return this.$store.getters.infoMessage;
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

/*#routerView {
  .responsiveSizeH(max-height, 94, 94vh, 95);
}*/

#app,
.tui-editor-contents {
  font-family: "Nunito", "Roboto", Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
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
  color: @primary !important;
  font-weight: bold !important;
}

p,
h3,
h4,
h5,
.te-apply-button,
.tui-editor-contents p,
.tui-editor-contents h3,
.tui-editor-contents h4,
.tui-editor-contents h5 {
  color: @textColor !important;
}

h1,
h2,
.tui-editor-contents h1,
.tui-editor-contents h2 {
  font-weight: bold !important;
}

h1,
.tui-editor-contents h1 {
  .responsiveSizeW(font-size, 30, 30pt, 48) !important;
}

h2,
.tui-editor-contents h2 {
  .responsiveSizeW(font-size, 24, 24pt, 36) !important;
}

h3,
.tui-editor-contents h3 {
  .responsiveSizeW(font-size, 18, 18pt, 30) !important;
}

h3,
.v-btn__content,
.tui-editor-contents h3 {
  font-weight: @semibold !important;
}

h4,
h5,
.tui-editor-contents h4,
.tui-editor-contents h5 {
  font-weight: @regular !important;
}

h4,
.tui-editor-contents h4 {
  .responsiveSizeW(font-size, 12, 12pt, 24) !important;
}

h5,
.tui-editor-contents h5 {
  .responsiveSizeW(font-size, 12, 12pt, 18) !important;
}

p,
.tui-editor-contents p {
  .responsiveSizeW(font-size, 12, 12pt, 14) !important;
}

span,
p,
.tui-editor-contents p,
.tui-editor-contents span {
  .light() !important;
}

.italic {
  .italic();
}

.tui-editor-contents h1 {
  border: none;
}

// Style the vertical drawer divider
.v-navigation-drawer__border {
  background-color: rgba(174, 213, 129, 0.5) !important;
}
//Remove 72px padding in expandable lists
div.v-list__group__items.v-list__group__items--no-action > div > div {
  padding-left: 20px !important;
}

.tui-colorpicker-palette-hex {
  width: 85px !important;
}

.tui-editor-contents pre code {
  min-width: 100px;
  width: 96%;
  padding: 2%;
}

.tui-editor-contents *:not(table)*:not(li) {
  line-height: 1 !important;
}

.tui-editor-contents .task-list-item {
  margin-left: 0;
}

.flip-list-move {
  transition: transform 0.3s;
}
</style>
