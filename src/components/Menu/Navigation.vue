<template lang="pug">
  v-toolbar#toolbar(app dark fixed clipped-right flat align-center px-0)
    v-layout(row align-center)
      v-flex(xs2 md4 justify-content-start)
        router-link(to="/")
          img(class="logo" alt="logo" src="@/assets/logos/logo_white.svg")
          h3#title(class="hidden-sm-and-down") Coursemeleon
      v-flex(xs6)
        v-autocomplete(
          v-model="selection"
          :items="names"
          :loading="isLoading"
          :search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          return-object
          clearable
          item-text="text"
          item-value="course"
          placeholder="Search"
          prepend-icon="mdi-database-search")
        v-divider
      v-flex(xs2)
        v-btn(flat @click.stop="$emit('toggleHamburgerEvent')")
          v-icon fa-bars
</template>

<script>
//import CourseService from "../../services/CourseService";
//import store from "../../store";

export default {
  name: "navigation",
  props: {
    msg: String
  },
  components: {},
  data() {
    return {
      selection: null,
      isLoading: false,
      courses: [],
      search: null
    };
  },
  computed: {
    names() {
      return this.courses.map(course => {
        var text = course.course_name + " (" + course.term + ")";
        return Object.assign({}, course, { text });
      });
    }
  },
  methods: {},
  watch: {
    selection(value, old) {
      if (value) {
        let self = this;
        this.$router.push({ name: "home", query: { cid: value.cid } });
        this.$store.commit("setActiveCourse", value);
        let color = value.color || "#AED581";
        this.$vuetify.theme.primary = color;
        this.$vuetify.theme.secondary = color;
        this.$vuetify.theme.accent = color;
        this.$store
          .dispatch("getCourseAccess")
          .then(resp => {
            self.$store.commit("setActivePermission", resp.data.level);
            self.selection = null;
          })
          .catch(err => {
            console.log(err);
          });
        //this.$router.go();
      }
    },
    search(queryString) {
      let self = this;
      if (queryString && queryString.length > 1) {
        this.isLoading = true;
        this.$store
          .dispatch("queryCoursesByRegex", { course_name: queryString })
          .then(resp => {
            self.courses = resp.courses;
          })
          .catch(err => {
            console.log(err);
          });
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
@import (reference) "../../App.less";

#toolbar {
  background-color: @primary;
}
#title {
  color: white !important;
  display: inline;
  padding-left: 10px;
}
.header {
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.11);
  width: 100%;
}
.header h4 {
  color: white !important;
  text-transform: lowercase;
}

.logo {
  margin-bottom: -25px;
  padding-bottom: 20px;
  height: calc(35px + 3vh);
}
</style>
