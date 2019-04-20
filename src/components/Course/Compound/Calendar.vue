<template lang="pug">
  v-layout(align-center justify-center fill-width)
    v-layout(v-if="!isEditMode" column align-center justify-center fill-width)
      iframe(:src="cal_google"
        style="border: 0"
        width="65%"
        height="600"
        frameborder="0"
        scrolling="no")
      v-btn(v-if="!!cal_ical" color="blue-grey"
          class="white--text"
          :href="cal_ical") Download iCal
          v-icon(right dark) cloud_download
    v-layout(v-else column align-center justify-center fill-width)
      v-text-field(v-model="cal_google" prepend-icon="fa-calendar" box class="fill-width" validate-on-blur label="Google Calendar URL")
      v-text-field(v-model="cal_ical" prepend-icon="fa-download" box class="fill-width" validate-on-blur label="iCal Download URL")
</template>

<script>
import { BaseElement } from "@/components/componentImports";
export default {
  name: "calendar",
  extends: BaseElement,
  data() {
    return {};
  },
  props: {},
  methods: {},
  computed: {
    cal_google: {
      get() {
        return this.$store.getters.courseTab.elements[this.indexInTab].data
          .cal_google;
      },
      set(value) {
        let self = this;
        this.$store.commit("updateCourseTabElement", {
          index: this.indexInTab,
          data: {
            cal_google: value,
            cal_ical: self.cal_ical
          }
        });
      }
    },
    cal_ical: {
      get() {
        return this.$store.getters.courseTab.elements[this.indexInTab].data
          .cal_ical;
      },
      set(value) {
        let self = this;
        this.$store.commit("updateCourseTabElement", {
          index: this.indexInTab,
          data: {
            cal_google: self.cal_google,
            cal_ical: value
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less"></style>
