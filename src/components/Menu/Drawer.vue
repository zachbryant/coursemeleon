<template lang="pug">
  v-navigation-drawer(right 
      :clipped="drawer.clipped"
      clipped
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open" 
      absolute 
      app)
    h2(v-if="!drawer.mini && isLoggedIn") Hello!
    v-subheader Site Navigation
    v-list
      v-list-tile(v-if="!isLoggedIn" to="/login")
        v-list-tile-action
          v-icon account_circle
        v-list-tile-content
          v-list-tile-title Log in
      v-list-tile(v-else @click.stop="logout")
        v-list-tile-action
          v-icon power_settings_new
        v-list-tile-content
          v-list-tile-title Log out
      v-list-tile(v-for="option in menuOptions" :to="option.path" :key="option.title")
        v-list-tile-action
          v-icon {{ option.icon }}
        v-list-tile-content
          v-list-tile-title {{ option.title }}
      v-divider
      v-subheader Courses
      template(v-if="!drawer.mini")
        v-list-group(v-for="group in courseGroups" :key="group.title" v-model="group.active" no-action)
          template(v-slot:activator)
            v-list-tile()
              v-list-tile-content
                v-list-tile-title {{ group.title }}
          v-list-tile(v-for="course in group.courses")
            course-list-item(class="unpad" :course="course")
      template(v-else)
        v-list-tile(v-for="course in courseGroups[0].courses")
            course-list-item(class="unpad" :course="course" noicon="true")
      v-divider
      v-subheader Drawer Settings
      v-list-tile(v-if="!drawer.permanent" @click="makeDrawerPermanent")
        v-list-tile-action
          v-icon last_page
        v-list-tile-content 
          v-list-tile-title Pinned Drawer
      v-list-tile(@click="toggleMiniDrawer")
        v-list-tile-action
          v-icon aspect_ratio
        v-list-tile-content
          v-list-tile-title Mini Drawer
      v-divider

</template>

<script>
import { CourseListItem } from "@/components/componentImports";

export default {
  name: "hamburger",
  components: {
    CourseListItem
  },
  props: {
    toggleHamburger: Boolean
  },
  data() {
    return {
    };
  },
  methods: {
    // changes the drawer to permanent
    makeDrawerPermanent() {
      this.$store.commit("makeNavDrawerPermanent");
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer() {
      this.$store.commit("toggleMiniNavDrawer");
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer() {
      this.$store.commit("toggleNavDrawer");
    },
    logout() {
      let self = this;
      this.$store.dispatch("logout").then(function() {
        self.$router.go();
      });
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    courseGroups() {
      var groups = [];
      groups.push({
          active: false,
          title: "My Courses",
          courses: this.$store.getters.getUserCourses
        });
      groups.push({
          active: false,
          title: "Recently Viewed",
          courses: this.$store.getters.getViewedCourses
      });
      return groups;
    },
    menuOptions: function() {
      var opts = [
        {
          title: "Home",
          path: "/",
          icon: "home"
        },
        {
          title: "About",
          path: "/about",
          icon: "info"
        },
        {
          title: "Help",
          path: "/help",
          icon: "help"
        }
      ];
      if (this.isLoggedIn)
        opts.unshift({
          title: "Create Course",
          skip: this.isLoggedIn,
          path: "/create",
          icon: "add_circle"
        });
      return opts;
    },
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    // open, clipped, fixed, permanent, mini (See store.js)
    drawer: function() {
      return this.$store.getters.navDrawerState;
    }
  }
};
</script>

<style lang="less">
@import (reference) "../../App.less";

.v-subheader {
  padding-left: 20px;
  padding-top: 20px;
  .justify-text();
  font-weight: bold;
  color: @primary !important;
}
</style>
