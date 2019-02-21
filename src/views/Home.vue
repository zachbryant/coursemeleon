<template lang="pug">
  v-container(fluid fill-height py-5)
    v-layout(justify-space-between row fill-height)
      v-flex#flexSidebar(xs4)
        Sidebar
      v-spacer
      v-flex(xs8)
        keep-alive
          component(:is="currentCourseComponent" :data="currentCourseName")
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar";
import Overview from "@/components/Overview";
import StaticCoursePage from "@/components/StaticCoursePage";

export default {
  name: "home",
  components: {
    Sidebar,
    Overview
  },
  props: {},
  data() {
    return {
      currentCourseName: null
    };
  },
  methods: {
    checkSelectedCoursePage() {
      this.currentCourseName = this.$route.query.course;
      return (
        this.currentCourseName != null && this.currentCourseName.length > 4
      );
    }
  },
  computed: {
    currentCourseComponent: function() {
      console.log(this.$route.query.course);
      if (this.checkSelectedCoursePage()) {
        return StaticCoursePage;
      } else {
        return "overview";
      }
    }
  }
};
</script>

<style lang="less">
#flexSidebar {
  max-width: 25vw;
  min-width: 15-vw;
}
</style>
