<template lang="pug">
  v-container(fluid fill-height pa-0)
    v-layout
      login(:redirect="redirect" fill-height)
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  name: "loginPage",
  data() {
    return {};
  },
  methods: {},
  components: {
    Login
  },
  computed: {},
  props: {
    redirect: {
      type: Object,
      required: false,
      default: function() {
        return { path: "/" };
      }
    }
  }
};
</script>

<style lang="less">
@import (reference) "../App.less";
</style>
