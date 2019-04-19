<template>
  <div>
    <v-container grid-list-xl></v-container>
    <!-- below just gets the newest item-->
    <h1>{{ courses[msg].course_name }}</h1>
    <v-container grid-list-xl>
      <v-layout row wrap align-center>
        <v-flex xs6>
          <p>Term: {{ courses[courses.length - 1].term }}</p>
        </v-flex>
        <v-flex xs6>
          <p>Start date: {{ courses[courses.length - 1].term_start }}</p>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-xl></v-container>
  </div>
</template>

<script>
import { CourseService } from "@/components/componentImports";

export default {
  name: "Title",
  props: {
    msg: String
  },
  data() {
    return {
      courses: [],
      error: "",
      text: ""
    };
  },
  async created() {
    //runs automatically when component created
    try {
      this.courses = await CourseService.getPosts(); //populate courses array
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      const t =
        this.courseID +
        "," +
        this.courseTitle +
        "," +
        this.couseTerm +
        "," +
        this.termStart;
      await CourseService.insertPost(t);
      //this.courses = await CourseService.getPosts();
    },
    async getPost() {
      //console.log("hello");
      this.courses = await CourseService.getPosts();
    },

    async deletePost(id) {
      await CourseService.deletePost(id);
      this.courses = await CourseService.getPosts();
    },
    async modifyPost() {
      //id=this.objID;
      const id = this.objID;
      this.courses = await CourseService.modifyPost(id);
    }
  }
};
</script>
