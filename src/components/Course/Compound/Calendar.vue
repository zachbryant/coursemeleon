<template>
  <div>
    <v-container grid-list-xl></v-container>
    <h1>Calendar</h1>
    <!--<p>{{ courses[courses.length-1].cal_google }}</p>-->
    <iframe
      v-bind:src="courses[courses.length - 1].cal_google"
      style="border: 0"
      width="65%"
      height="600"
      frameborder="0"
      scrolling="no"
    ></iframe>
    <br />
    <v-container grid-list-xl>
      <div class="links">
        <v-btn
          id="linkItem"
          color="blue-grey"
          class="white--text"
          v-bind:href="courses[courses.length - 1].cal_ical"
        >
          Ical
          <v-icon right dark>cloud_download</v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container grid-list-xl></v-container>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService";

export default {
  name: "Calendar",
  data() {
    return {
      courses: [],
      cal:
        "https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FNew_York",
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

<style scoped lang="less">
.links {
  width: 65%;
  text-align: right;
  margin: auto;
  /*white-space: nowrap;*/
}

#linkItem {
  float: right;
}
</style>
