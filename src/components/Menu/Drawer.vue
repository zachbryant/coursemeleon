<template lang="pug">
  v-navigation-drawer(right 
      :clipped="clipped"
      clipped
      :fixed="fixed"
      :permanent="permanent"
      :mini-variant="mini"
      v-model="open" 
      absolute 
      app
      pa-4)
    v-list()
      v-list-tile(v-if="!isLoggedIn")
        v-list-tile-action
          v-icon sign_in
        v-list-tile-content
          v-list-tile-title
            router-link(to="/login") Login
      v-list-tile(v-if="!permanent" @click="makeDrawerPermanent")
        v-list-tile-action
          v-icon chevron_right
        v-list-tile-content 
          v-list-tile-title Static Drawer
      v-list-tile(@click="toggleMiniDrawer")
        v-list-tile-action
          v-icon aspect_ratio
        v-list-tile-content
          v-list-tile-title Mini Drawer

        v-divider

</template>

<script>
export default {
  name: "hamburger",
  props: {
    toggleHamburger: Boolean
  },
  data() {
    return {
      // sets the open status of the drawer
      open: false,
      // sets if the drawer is shown above (false) or below (true) the toolbar
      clipped: true,
      // sets if the drawer is CSS positioned as 'fixed'
      fixed: true,
      // sets if the drawer remains visible all the time (true) or not (false)
      permanent: false,
      // sets the drawer to the mini variant, showing only icons, of itself (true)
      // or showing the full drawer (false)
      mini: false,
      menuOptions: [
        {
          title: "Create Course",
          path: "/create",
          icon: "plus"
        },
        {
          title: "About",
          path: "/about",
          icon: "info"
        },
        {
          title: "Help",
          path: "/help",
          icon: "question-circle"
        }
      ],
      courses: [],
      recent: [],
      isLoggedIn: this.$store.getters.isLoggedIn
    };
  },
  methods: {
    // changes the drawer to permanent
    makeDrawerPermanent() {
      this.permanent = true;
      // set the clipped state of the drawer and toolbar
      this.clipped = false;
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer() {
      this.mini = !this.mini;
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer() {
      if (this.permanent) {
        this.permanent = !this.permanent;
        // set the clipped state of the drawer and toolbar
        this.clipped = true;
      } else {
        // normal drawer
        this.open = !this.open;
      }
    }
  },
  computed: {}
};
</script>

<style lang="less">
@import (reference) "../../App.less";
.v-navigation-drawer__border {
  background-color: rgba(174, 213, 129, 0.5) !important;
}
</style>
