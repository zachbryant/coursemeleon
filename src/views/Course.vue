<template>
  <div>
    <Title />
    <Calendar />
    <Announcements />
    <Contact />
    <Info />
    <Resources />
    <Grade />
  </div>
</template>

<script>
import {
  Announcements,
  Calendar,
  Contact,
  Grade,
  Info,
  Resources,
  Title
} from "@/components/componentImports";
import CourseService from "@/services/CourseService";

export default {
  name: "course",
  components: {
    Grade,
    Title,
    Calendar,
    Announcements,
    Contact,
    Info,
    Resources
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
    async ifShow() {
      this.courses = await CourseService.getPosts();
      console.log(this.courses[1].if_show);
      if (this.courses[1].if_show) {
        console.log("show true");
        return true;
      } else {
        console.log("show false");
        return false;
      }
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less"></style>
