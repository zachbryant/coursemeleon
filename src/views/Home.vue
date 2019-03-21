<template lang="pug">
  v-container#home(fluid fill-height px-2)
      v-layout
        v-layout(row)
          v-flex#flexSidebar(xs4 scroll-y)
            Sidebar
          v-flex#coursePage(xs10 justify-center scroll-y)
            keep-alive
              component(:is="currentCourseComponent" :data="courseData")
</template>

<script>
// @ is an alias to /src
import { Sidebar, Overview, Course } from "@/components/componentImports";

export default {
  name: "home",
  components: {
    Sidebar,
    Overview,
    Course
  },
  props: {},
  data() {
    return {
      courseData: {
        name: ""
      }
    };
  },
  methods: {
    validateCourseName() {
      this.courseData.name = this.$route.query.course;
      return this.courseData.name != null && this.courseData.name.length > 2;
    }
  },
  computed: {
    currentCourseComponent: function() {
      if (this.validateCourseName()) {
        return Course;
      } else {
        return "overview";
      }
    }
  }
};
</script>

<style lang="less">
@import (reference) "../App.less";

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
