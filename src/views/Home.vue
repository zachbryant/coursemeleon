<template lang="pug">
  v-container#home(fluid fill-height px-5)
    v-layout(row)
      keep-alive
        component(:is="currentCourseComponent" :data="courseData")
</template>

<script>
// @ is an alias to /src
import { Overview, Course } from "@/components/componentImports";

export default {
  name: "home",
  components: {
    Overview,
    Course
  },
  props: {},
  data() {
    return {
      courseData: {
        name: ""
      }
    };
  },
  methods: {},
  computed: {
    currentCourseComponent: function() {
      return this.courseData ? Course : "overview";
    }
  }
};
</script>

<style lang="less">
@import (reference) "../App.less";
</style>
