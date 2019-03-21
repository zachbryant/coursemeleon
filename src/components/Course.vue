<template lang="pug">
  StaticCoursePage()
</template>

<script>
import StaticCoursePage from "@/components/StaticCoursePage";

export default {
  name: "course",
  data() {
    return {};
  },
  methods: {},
  components: {
    StaticCoursePage
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="less"></style>
