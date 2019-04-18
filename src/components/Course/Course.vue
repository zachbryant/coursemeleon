<template lang="pug">
  v-container(grid-list-xs fluid align-content-center fill-height pa-0 ma-0)
    v-layout(row align-center justify-space-between justify-text fill-width fill-height)
      v-flex#courseNav(xs3 lg2 fill-height mr-4)
        course-sidebar()
      v-flex#content(column align-center justify-center xs9 lg10 shrink fill-height)
        v-progress-circular(v-if="loadingCourse"
                            indeterminate
                            color="primary")
        // TODO add editable title here
        list-item(v-else ref="courseDataList")
    v-layout#fabContainer(column justify-end)
      v-speed-dial(v-model="showFab"
              bottom left
              direction="top"
              transition="scale-transition")
        template(v-slot:activator)
          v-btn(v-model="showFab"
                color="primary"
                dark fab)
            v-icon fa-cog
            v-icon fa-times
        v-btn(small fab)
          v-icon(color="blue") fa-user
        v-btn(v-if="isEditMode" small fab)
          v-icon(color="purple") fa-paperclip
        v-btn(small fab @click="saveEdit")
          v-icon(v-if="isEditMode" color="green") fa-check
          v-icon(v-else color="green") fa-pencil-alt
        v-btn(v-if="isEditMode" small fab @click="cancelEdit")
          v-icon(color="red") fa-times
</template>

<script>
export default {
  name: "coursePage",
  components: {
    "list-item": () => import("./Simple/List.vue"),
    "rich-content": () => import("./Simple/RichContent.vue"),
    "course-sidebar": () => import("./Compound/CourseSidebar.vue")
  },
  props: {
    search: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      activeTab: 0,
      showFab: false,
      loadingCourse: false
    };
  },
  methods: {
    saveEdit() {
      this.$store.dispatch("toggleEditMode");
    },
    cancelEdit() {
      this.$store.commit("toggleEditMode");
      this.$router.go();
    },
    getTitle() {
      return this.course.title ? this.course.title : "";
    },
    loadCourse() {
      // TODO add some animation
      console.log("Search object: " + JSON.stringify(this.search));
      this.loadingCourse = true;
      let self = this;
      if (this.search)
        this.$store
          .dispatch("queryCourse", this.search)
          .catch(function(error) {
            console.log(error);
          })
          .then(function() {
            self.loadingCourse = false;
          });
    }
  },
  computed: {
    isEditMode: function() {
      return this.$store.getters.isEditMode;
    }
  },
  created() {
    if (this.search && Object.keys(this.$store.getters.course).length == 0)
      this.loadCourse();
  }
};
</script>

<style lang="less">
#fabContainer {
  position: fixed;
  bottom: 30px;
  left: 30px;
}
</style>
