<template lang="pug">
  v-container#home(fluid fill-height px-2)
    v-layout(row)
      v-flex#flexSidebar(xs4 scroll-y)
        Sidebar
      v-flex#coursePage(xs10 justify-center scroll-y)
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
        this.currentCourseName != null &&
        this.currentCourseName.length > 4 &&
        this.currentCourseName.startsWith("CS 3")
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
@import (reference) "../App.less";

#home {
  .responsiveSizeH(max-height, 94, 94vh, 96.5);
}

#flexSidebar {
  min-width: 33vw;
  //border-right: 1px solid @primary;
}
#coursePage {
  padding: 0 5% 0 5%;
}

#coursePage,
#flexSidebar {
  min-height: 100%;
}
</style>
