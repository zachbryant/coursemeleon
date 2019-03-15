<template lang="pug">
  v-app#app(light)
    v-content
      v-container#container(fluid align-content-center fill-height fill-width)
        v-layout(column justify-start)
          v-layout#nav(row justify-center)
            v-flex(xs12)
              Navigation
          v-flex(xs12)
            router-view
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "app",
  data() {
    return {};
  },
  methods: {},
  components: {
    Navigation
  }
};
</script>

<style lang="less">
@import (reference) "App.less";

html,
body {
  overflow: hidden;
  width: 100%;
  min-width: @minViewWidthPx;
}

body {
  position: fixed;
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

.justify-text {
  text-align: justify;
  text-justify: inter-word;
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
</style>
