<template lang="pug">
  v-layout(column align-start justify-start justify-text)
    h2 Activity Overview
    br
    br
    p Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    textItem(:data="temp" ref="textItemTest")
    p end textItem
</template>

<script>
import textItem from "@/components/CourseCreation/simple/Text.vue";

export default {
  name: "overview",
  components: {
    textItem
  },
  props: {},
  data() {
    return {
      temp: {type: 'h3', data: "Testing H3 Text!", style:"color: red !important;"}
    };
  },
  methods: {

  },
  mounted() {
    console.log(this.$refs["textItemTest"]);
  }
};
</script>
