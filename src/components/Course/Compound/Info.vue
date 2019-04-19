<template>
  <div>
    <v-container grid-list-xl></v-container>
    <!-- below just gets the newest item-->
    <h1>General Course Info</h1>
    <v-container
      grid-list-xl
      style="border-style: dashed; border-color: #b7b7b7; border-width: 2px;"
    >
      <h3>{{ courses[msg].course_info }}</h3>
    </v-container>
    <v-container grid-list-xl></v-container>
  </div>
</template>

<script>
import { CourseService } from "@/components/componentImports";

export default {
  name: "Info",
  data() {
    return {
      courses: [],
      error: "",
      text: ""
    };
  },
  props: {
    msg: String
  },
  async created() {
    //runs automatically when component created
    try {
      this.courses = await CourseService.getPosts(); //populate courses array
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>
