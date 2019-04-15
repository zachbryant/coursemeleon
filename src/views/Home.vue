<template lang="pug">
  v-container#home(fluid fill-height px-5)
    v-layout(row)
      keep-alive
        component(v-if="isCreate" :is="currentCourseComponent" :course="courseData")
        component(v-if="validQuery" :is="currentCourseComponent" :search="query")
        
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
    },
    isCreate: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      courseData: {
        title: "",
        elements: [],
        term: "",
        term_start: "",
        color: "",
        font: "",
        published: false,
        whitelist: false
      }
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
      return this.isCreate || this.validQuery() ? Course : "overview";
    }
  }
};
</script>

<style lang="less">
@import (reference) "../App.less";
</style>
