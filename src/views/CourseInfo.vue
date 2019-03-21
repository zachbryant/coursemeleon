<template lang="pug">
  div
    v-layout(align-start justify-start row wrap fill-height)
        v-flex(lg12)
            h2 Course
    v-layout(align-start justify-start row wrap fill-height)
        v-flex(lg12)
            h2 Course Name
    v-layout(align-start justify-start column wrap fill-height)
      v-flex(xs3)
        h3 Course Information
        v-layout(align-start justify-start row wrap fill-height)
          p Course Info
      v-flex(xs3)
        h3 Lecture Information
        v-layout(align-start justify-start row wrap fill-height)
          p Lecture Info Text
      v-flex(xs3)
        h3 Assignments
        v-layout(align-start justify-start row wrap fill-height)
          p Assignment Description
      v-flex(xs3)
        h3 Office Hours
        v-layout(align-start justify-start row wrap fill-height)
          p Office Hours Text
      v-flex(xs3)
        h3 Custom Title
        v-layout(align-start justify-start row wrap fill-height)
          p Custom Title Text
</template>

<script>
import CourseInfo from "@/components/CourseInfo.vue";

export default {
  name: "CourseInfoPage",
  data() {
    return{};
  },

}
</script>
