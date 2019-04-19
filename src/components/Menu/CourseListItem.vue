<template lang="pug">
  v-layout(row align-center justify-start fill-height @click.stop="openCourse($event)")
    v-list-tile-action
      v-icon(v-if="!noicon" @click.stop="flipSaved" :color="getColor()") bookmark
      v-list-tile-title(v-else) {{ course.abbr }}
    v-list-tile-content
      v-list-tile-title {{ course.title }}
</template>

<script>
export default {
  name: "course-list-item",
  props: {
    course: Object,
    noicon: String
  },
  data() {
    return {
      isSaved: this.course.saved
    };
  },
  methods: {
    getColor() {
      return this.isSaved ? "primary" : "grey lighten-3";
    },
    flipSaved() {
      this.isSaved = !this.isSaved;
      //save this change
    },
    openCourse(event) {
      console.log(event);
      this.$router.push({
        path: "/",
        query: {
          course: this.course.abbr,
          id: this.course.id,
          term: this.course.term
        }
      });
    }
  }
};
</script>

<style scoped lang="less"></style>
