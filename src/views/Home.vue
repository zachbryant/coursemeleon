<template lang="pug">
  v-container(fluid fill-height py-5)
    v-layout(justify-space-between row fill-height)
      v-flex#flexSidebar(xs4)
        Sidebar
      v-spacer
      v-flex(xs8)
        component(:is="currentCourseComponent")
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar";
import Overview from "@/components/Overview";

export default {
  name: "home",
  components: {
    Sidebar,
    Overview,
	},
	props: {
    currentCourseName: {
      type: String,
      required: false
    }
  },
	data() {
    return {
      
    }
	},
	methods: {
    checkSelectedCoursePage() {
      return this.currentCourseName != null && this.currentCourseName.length > 4;
    }
  },
  computed: {
    currentCourseComponent: function() {
      if(this.checkSelectedCoursePage()) {
        return () => {
          console.log(this.currentCourseName);
          import("@components/coursepages/" + this.currentCourseName.toLowerCase());
        }
      }
      else {
        return "overview"
      }
    }
  }
};
</script>

<style lang="less">
#flexSidebar {
  max-width: 500px;
}
</style>
