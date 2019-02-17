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
  methods: {
    queryCourses(queryString) {
      if (queryString != undefined && queryString.length > 1) {
        this.isLoading = true;
        console.log(queryString);
        //@TODO insert api call
        this.isLoading = false;
      }
    }
  },
  components: {
    Navigation
  }
};
</script>

<style lang="less">
@import (css) url("https://fonts.googleapis.com/css?family=Nunito");
@import (css)
  url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
@primary: var(--v-primary-base);
@secondary: var(--v-secondary-base);
@accent: var(--v-accent-base);
@semibold: 600;

#app {
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //color: @primary;
  height: 100vh;
}

#container {
  padding: 0;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>