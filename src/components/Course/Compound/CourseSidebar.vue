<template lang="pug">
  v-layout(column align-center justify-start fill-height fill-width)
    v-card(width="100%")
      draggable(v-model="tabs" class="fill-width")
        transition-group(class="fill-width" type="transition" name="flip-list")
          v-layout(row v-for="(tab, index) in tabs" 
              :key="tab.id" 
              fill-width
              justify-space-between 
              align-center
              @mouseover="hoverOver(index)"
              @mouseleave="hoverOver(-1)"
              @click="isEditMode && select(index)")
            v-flex(xs2 mr-2)
              v-btn(flat icon color="primary")
                //-v-icon(v-if="isEditMode") fa-grip-vertical
                v-icon(v-if="index == tabIndex && !isEditMode" size="22px") fa-asterisk
            v-flex(xs10)
              h5(v-if="!isEditMode" @click="select(index)" :style="getColor(index)") {{ tab.title }}
              v-text-field(v-else v-model="tab.title" single-line validate-on-blur)
            v-flex(v-if="isEditMode")
              v-btn(flat icon color="red" @click="removeTab(index)" :disabled="!isEditMode")
                v-icon(v-show="canShowMenu(index)") fa-times
      v-btn(v-if="isEditMode" flat icon block color="primary")
        v-icon(@click="insertTab(tabs.length)") fa-plus
</template>

<script>
import EditSeparator from "../Compound/EditSeparator.vue";
import draggable from "vuedraggable";

export default {
  name: "course-sidebar",
  props: {},
  components: {
    "edit-sep": EditSeparator,
    draggable
  },
  data() {
    return {
      hoverIndex: -1
    };
  },
  methods: {
    hoverOver: function(index) {
      this.hoverIndex = index;
    },
    canShowMenu: function(index) {
      return this.isEditMode && this.hoverIndex == index;
    },
    insertTab(index) {
      this.$store.commit("insertCourseTab", index);
    },
    removeTab(index) {
      this.$store.commit("removeCourseTab", index);
    },
    getColor(index) {
      if (this.tabIndex == index)
        return "color: #AED581 !important; font-weight: bold !important;";
      return "";
    },
    select(index) {
      this.$store.commit("setTabIndex", index);
    }
  },
  computed: {
    isEditMode() {
      return this.$store.getters.isEditMode;
    },
    tabIndex() {
      return this.$store.getters.getTabIndex;
    },
    tabs: {
      get: function() {
        return this.$store.getters.course.tabs;
      },
      set: function(value) {
        this.$store.commit("updateCourseTabs", value);
      }
    }
  }
};
</script>

<style lang="less"></style>
