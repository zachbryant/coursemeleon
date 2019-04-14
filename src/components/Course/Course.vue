<template lang="pug">
  v-container(grid-list-xs fluid align-content-center fill-height pa-0 ma-0)
    v-layout(row align-center justify-center justify-text fill-width )
      v-flex#sidebar(column align-start justify-start xs3 lg2 fill-height)
        //-Mitch's work
        h3 Sidebar
      v-flex#content(column align-center justify-center xs9 grow fill-height)
        v-progress-circular(v-if="loadingCourse"
                            indeterminate
                            color="primary")
        list-item(v-else :data="item")
    v-speed-dial(v-model="showFab"
            bottom right
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
    "rich-content": () => import("./Simple/RichContent.vue")
  },
  props: {
    search: {
      type: Object,
      required: false
    },
    course: {
      type: Object,
      required: false,
      default: function() {
        return this.fakeCourse();
      }
    }
  },
  data() {
    return {
      activeTab: 0,
      showFab: false,
      loadingCourse: false,
      dItem: this.course
    };
  },
  methods: {
    saveEdit() {
      this.$store.commit("toggleEditMode", this.item);
    },
    cancelEdit() {
      this.$store.commit("toggleEditMode", null);
    },
    getTitle() {
      return this.item.title ? this.item.title : "";
    },
    getActiveTab() {
      return this.item.tabs ? this.item.tabs[this.activeTab] : "";
    },
    loadCourse() {
      // TODO add some animation
      console.log("Search object: " + JSON.stringify(this.search));
      this.loadingCourse = true;
      let self = this;
      if (this.search)
        this.$store
          .dispatch("queryCourse", this.search)
          .then(function() {
            self.dItem = self.$store.getters.getApiResult;
          })
          .catch(function(error) {
            console.log(error);
          })
          .then(function() {
            self.loadingCourse = false;
          });
    }
  },
  computed: {
    item: function() {
      // * prop was passed in, don't load
      if (this.dItem && Object.keys(this.dItem).length) return this.dItem;
      else {
        this.loadCourse();
        return this.dItem;
      }
    },
    isEditMode: function() {
      return this.$store.getters.isEditMode;
    }
  },
  watch: {}
};
</script>

<style lang="less"></style>
