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
//Imports
@import (css) url("https://fonts.googleapis.com/css?family=Nunito");
@import (css)
  url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

//Variables
@primary: var(--v-primary-base);
@secondary: var(--v-secondary-base);
@accent: var(--v-accent-base);
@text-color: #333333;
@semibold: 600;
@regular: 400;

html,
body {
  overflow: hidden;
  width: 100%;
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
  color: @text-color;
}

.justify-text {
  text-align: justify;
  text-justify: inter-word;
}

h1 {
  font-size: 48px;
  font-weight: bold;
}

h2 {
  font-size: 36px;
  font-weight: bold;
}

h3 {
  font-size: 30px;
  font-weight: @semibold;
}

h4 {
  font-size: 24px;
  font-weight: @regular;
}

h5 {
  font-size: 18px;
  font-weight: @regular;
}

p {
  font-size: 12pt;
}
</style>
