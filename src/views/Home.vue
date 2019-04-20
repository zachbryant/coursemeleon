<template lang="pug">
  v-container#home(fluid fill-height px-5)
    component(v-if="isCreate" :is="currentCourseComponent" :isCreate="isCreate")
    component(v-if="!isCreate && validQuery" :is="currentCourseComponent" :search="query" :key="renderKey")
</template>

<script>
// * @ is an alias to /src
import { Overview } from "@/components/componentImports";

export default {
  name: "home",
  components: {
    Overview,
    course: () => import("@/components/Course/Course")
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
      renderKey: 0
    };
  },
  methods: {
    validQuery() {
      return (
        !!this.query.title ||
        !!this.query.cid ||
        !!this.query.term ||
        !!this.query.abbr
      );
    }
  },
  computed: {
    currentCourseComponent: function() {
      return this.isCreate || this.validQuery() ? "course" : "overview";
    }
  },
  watch: {
    query: function(value) {
      console.log("Query changed");
      this.renderKey++;
    }
  }
};
</script>

<style lang="less">
@import (reference) "../App.less";
</style>
