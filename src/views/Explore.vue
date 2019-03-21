<template>
  <div>
    <v-container grid-list-xl></v-container>
    <h1>Create Course</h1>
    <Courses></Courses>
    <!-- <PostComponent/> -->
    <br>
    <br>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
//import PostComponent from "@/components/PostComponent.vue";
import Courses from "@/components/Courses.vue";

export default {
  name: "explore",
  components: {
    Calendar,
    Courses
    //PostComponent
  }
};
</script>

<style lang="less"></style>
