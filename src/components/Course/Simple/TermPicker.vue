<template lang="pug">
  v-layout(v-if="isEditMode" fill-width justify-center align-center)
    h4 Start Date
    v-date-picker(v-model="date" @input="setDate" no-title scrollable)
  h4(v-else) {{getDateText()}}
</template>

<script>
import { BaseElement } from "@/components/componentImports";
import { format, subDays } from 'date-fns';

export default {
  name: "term-picker",
  extends: BaseElement,
  components: {},
  data() {
    return {
      summerStartMonth: 6,
      springStartMonth: 1,
      fallStartMonth: 8
    };
  },
  methods: {
    onDateChange(date) {
      console.log(this.date);
    },
    getDateText() {
      var text = "No dates set yet";
      if (this.date) {
        text = "From " + this.date;
      }
      return text;
    },
    setDate(date) {
      this.date = date; 
    }
  },
  computed: {
    term() {
      let date = this.date;
      if (date) {
        let start = new Date(date);
        let year = start.getFullYear().toString().substr(-2);
        var term = "";
        let month = start.getMonth() + 1;
        if (month < this.summerStartMonth) {
          term = "spring";
        }
        else if (month < this.fallStartMonth) {
          term = "summer";
        }
        else {
          term = "fall"
        }
        term += year;
        return term;
      }
    },
    date: {
      get() {
        return this.$store.getters.courseTab.elements[this.indexInTab].data
          .date;
      },
      set(value) {
        this.$store.commit("updateCourseTabElement", {
          index: this.indexInTab,
          data: {
            date: value
          }
        });
        this.$store.commit("setCourseDates", value, this.term);
      }
    }
  }
};
</script>

<style scoped lang="less">
div {
  display: inline;
  //width: 100%;
}
</style>
