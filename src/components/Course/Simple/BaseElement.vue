<template lang="pug"></template>

<script>
export default {
  name: "base-item",
  props: {
    data: {
      type: Object,
      required: false,
      default: function() {
        return {
          elements: []
        };
      }
    },
    index: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      ddata: this.data
    };
  },
  methods: {
    removeElement(index) {
      this.$store.commit("removeCourseElement", index);
    },
    insertElement(index, type) {
      console.log(type);
      let data = null;
      if (type == "calendar") {
        data = {};
        data.cal_google = "";
        data.cal_ical = "";
      }
      this.$store.commit("insertCourseElement", { index, type, data });
    }
  },
  computed: {
    /*elements() {
      return this.ddata.elements;
    },*/
    type() {
      return this.ddata.instanceName;
    },
    ownData() {
      return this.$store.getters.courseTab.elements[this.indexInTab];
    },
    isEditMode() {
      return this.$store.getters.isEditMode;
    },
    tabIndex() {
      return this.$store.getters.getTabIndex;
    },
    indexInTab() {
      return this.index;
    },
    content: {
      get() {
        return this.$store.getters.courseTab.elements[this.indexInTab].data;
      },
      set(value) {
        this.$store.commit("updateCourseTabElement", {
          index: this.indexInTab,
          data: value
        });
      }
    }
  }
};
</script>

<style lang="less"></style>
