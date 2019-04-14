<template lang="pug">
  v-container#home(fluid fill-height px-5)
    v-layout(row)
      keep-alive
        component(:is="currentCourseComponent" :data="courseData")
</template>

<script>
// * @ is an alias to /src
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
        name: "Dummy"
      }
    };
  },
  methods: {
    // TODO needs to be fully validated
    isValidData() {
      return !!this.courseData.name;
    }
  },
  computed: {
    currentCourseComponent: function() {
      return this.isValidData() ? Course : "overview";
    }
  }
};
</script>

<style lang="less">
@import (reference) "../App.less";
</style>
