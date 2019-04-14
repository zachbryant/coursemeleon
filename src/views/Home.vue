<template lang="pug">
  v-container#home(fluid fill-height px-5)
    v-layout(row)
      keep-alive
        component(:is="currentCourseComponent" :course="courseData" :search="query")
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
  props: {
    query: {
      type: Object,
      required: false,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      courseData: {}
    };
  },
  methods: {
    validQuery() {
      return (
        !!this.query.name ||
        !!this.query.cid ||
        !!this.query.term ||
        !!this.query.abbr
      );
    }
  },
  computed: {
    currentCourseComponent: function() {
      return this.validQuery() ? Course : "overview";
    }
  }
};
</script>

<style lang="less">
@import (reference) "../App.less";
</style>
