<template lang="pug">
  v-container#home(fluid fill-height px-5)
    v-layout(row)
      keep-alive
        component(v-if="isCreate" :is="currentCourseComponent")
        component(v-if="validQuery" :is="currentCourseComponent" :search="query")
        
</template>

<script>
// * @ is an alias to /src
import { Overview } from "@/components/componentImports";
const uuidv4 = require("uuid/v4");

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
    return {};
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
  created() {
    if (this.isCreate) {
      this.$store.commit("toggleEditMode");
      this.$store.commit("setActiveCourse", {
        title: "",
        cid: uuidv4(),
        tabs: [
          {
            title: "",
            id: uuidv4(),
            elements: [
              {
                instanceName: "text-item",
                id: uuidv4(),
                data: {
                  type: "h1",
                  text: ""
                }
              }
            ]
          }
        ],
        abbr: "",
        term: "",
        term_start: "",
        color: "",
        font: "",
        published: false,
        whitelist: false
      });
    }
  }
};
</script>

<style lang="less">
@import (reference) "../App.less";
</style>
