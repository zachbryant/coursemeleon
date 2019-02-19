<template lang="pug">
  v-container(fluid fill-height py-5)
    v-layout(justify-space-between row fill-height)
      v-flex#flexSidebar(xs4)
        Sidebar
      v-spacer
      v-flex(xs8)
        CoursePage(v-if="checkSelectedCoursePage()" course="selectedCoursePage")
        Overview(v-else)
</template>

<script>
// @ is an alias to /src
import Sidebar from "@/components/Sidebar";
import Overview from "@/components/Overview";
import CoursePage from "@/components/CoursePage";

export default {
  name: "home",
  components: {
    Sidebar,
    Overview,
    CoursePage
	},
	props: {
    selectedCoursePage: {
      type: String,
      required: false
    }
  },
	data() {
		return {
      coursePage: this.selectedCoursePage,
		}
	},
	methods: {
    checkSelectedCoursePage() {
      return this.coursePage != null && this.coursePage.length > 4;
    }
	},
};
</script>

<style lang="less">
#flexSidebar {
  max-width: 500px;
}
</style>
