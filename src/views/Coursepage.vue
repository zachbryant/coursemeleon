<template>
  <div>
    <Title/>
    <Calendar/>
    <Announcements/>
    <Contact/>
    <Info/>
    <Resources/>
  </div>
</template>

<script>
import Courses from "@/components/Courses.vue";
import Title from "@/components/Title.vue";
import Null from "@/components/Null.vue";
import CourseService from "../CourseService";
import Calendar from "@/components/Calendar.vue";
import Grade from "@/components/Grade.vue";
import Announcements from "@/components/Announcements.vue";
import Contact from "@/components/Contact.vue";
import Info from "@/components/Info.vue";
import Resources from "@/components/Resources.vue";

export default {
  name: "coursepage",
  components: {
    Courses,
    Grade,
    Title,
    Calendar,
    Null,
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
      this.$vuetify.theme.primary = courses[courses.length - 1].color;
      this.$vuetify.theme.secondary = courses[courses.length - 1].color2;
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


