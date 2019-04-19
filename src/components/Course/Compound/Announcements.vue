<template lang="pug">
  v-layout(column align-center justify-start fill-width)
    v-flex(xs12)
      h3 Announcements
    v-layout(column v-if="isEditMode && !all" fill-width)
      v-btn(flat block color="primary")
          v-icon(@click="insertAnnouncement(0)") fa-plus
      draggable(v-model="announcements" class="fill-width")
        transition-group(class="fill-width" type="transition" name="flip-list" draggable=".draggable-announcement")
          v-layout(row v-for="(announcement, index) in announcements" 
              :key="announcement.id" 
              class="draggable-announcement"
              fill-width
              justify-space-between 
              align-center
              @mouseover="hoverOver(index)"
              @mouseleave="hoverOver(-1)")
            v-flex(xs11)
              h5(v-if="!isEditMode") {{ announcement.text }}
              v-textarea(v-else v-model="announcement.text" box auto-grow hint="What are you announcing?")
            v-flex(xs1 v-if="isEditMode")
              v-btn(flat icon color="red" @click="removeAnnouncement(index)" :disabled="!isEditMode")
                v-icon(v-show="canShowMenu(index)") fa-times
    v-layout(v-else column fill-width justify-start)
      v-layout(row v-for="(announcement, index) in announcements" 
                :key="announcement.id" 
                fill-width
                justify-start 
                align-center)
        v-flex(xs1)
          span(class="light italic time-ago") {{ getDateString(announcement) }}
        v-flex(xs11)
          h5(class="ml-5") {{ announcement.text }}

</template>

<script>
import { BaseElement } from "@/components/componentImports";
import store from "@/store";
import draggable from "vuedraggable";
import { format, distanceInWordsToNow } from "date-fns";

export default {
  name: "Announcements",
  extends: BaseElement,
  components: {
    draggable
  },
  data() {
    return {
      courses: [],
      hoverIndex: -1
    };
  },
  props: {
    all: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    getDateString(announcement) {
      var date = announcement.date;
      if (!date) date = new Date();
      console.log("Date");
      console.log(date);
      var rel = distanceInWordsToNow(new Date(date)) + " ago";
      rel = rel.replace("less than", "<");
      return rel;
    },
    hoverOver: function(index) {
      this.hoverIndex = index;
    },
    canShowMenu: function(index) {
      return this.isEditMode && this.hoverIndex == index;
    },
    insertAnnouncement(index) {
      this.$store.commit("insertCourseAnnouncement", index);
    },
    removeAnnouncement(index) {
      this.$store.commit("removeCourseAnnouncement", index);
    }
  },
  created() {
    if (this.announcements.length == 0) this.insertAnnouncement(0);
  },
  computed: {
    announcements: {
      get: function() {
        if (this.all) return [];
        return this.$store.getters.course.announcements;
      },
      set: function(value) {
        // Ignore if all - just for display
        if (!this.all) this.$store.commit("updateCourseAnnouncements", value);
      }
    },
    courseIndex: function() {
      console.log("course index state: " + store.state.courseIndex);
      return store.state.courseIndex;
    },
    getCourseIndex() {
      return this.$store.getters.getCourseIndex;
    }
  }
};
</script>

<style lang="less">
@import (reference) "../../../App.less";

span.time-ago {
  color: @primary !important;
  font-weight: @semibold;
}
</style>
