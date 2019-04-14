<template lang="pug">
  div
    v-container(grid-list-md)
      // COURSE INFO - ID & Name
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 Course Information
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          h3 Course ID
        v-flex(xs3)
          h3 Course Name
        
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          v-text-field(v-model="courseID" single-line outline id="courseID")
        v-flex(xs3)
          v-text-field(v-model="courseTitle" single-line outline id="courseTitle")
        
      // DATES - Course Term & Start Date
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 Course Term
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          h3 Term
        v-flex(xs3)
          h3 Start Date
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          v-text-field(v-model="courseTerm" single-line outline id="courseTerm")
        v-flex(xs3)
          v-text-field(v-model="termStart" single-line outline id="termStart")
      
      // ANNOUNCEMENTS
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 Announcements
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          v-textarea(v-model="announcements" outline id="announcements")
      
      // GENERAL INFORMATION
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 General Course Information
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          v-textarea(v-model="generalText" outline id="generalText")

      // EMAIL
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 Contact Information
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          v-textarea(v-model="contactInfo" outline id="contactInfo")

      // RESOURCE LINKS
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg3)
          h2 Links
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          v-text-field(v-model="resourceLink" single-line outline id="resourceLink")

      // GRADES
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg3)
          h2 Grades
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          v-text-field(v-model="grades" single-line outline id="grades")
      // Design
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 Do you want this page to be private 
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          h3 (yes/no)
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          v-text-field(v-model="pri" single-line outline id="pri")
      // CALENDAR
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 Calendar
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          h3 Google Calendar Link
        v-flex(xs3)
          h3 iCal Link
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          v-text-field(v-model="googleCal" single-line outline id="googleCal" placeholder="optional")
        v-flex(xs3)
          v-text-field(v-model="iCal" single-line outline id="iCal" placeholder="optional")


      // Design
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 Page Color
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          h3 Primary Color 
        v-flex(xs3)
          h3 Secondary Color 
        v-flex(xs3)
          h3 Font
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          v-text-field(v-model="color" single-line outline id="color")
        v-flex(xs3)
          v-text-field(v-model="color2" single-line outline id="color2")
        v-flex(xs3)
          v-text-field(v-model="font" single-line outline id="font")   
          

      // PUBLISH 
      v-layout(align-center justify-start row wrap fill-height)
        v-btn(large color="primary", @click="createPost") PUBLISH

      // Modify
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 Modify Name
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          h3 Object ID
        v-flex(xs3)
          h3 New Name
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          v-text-field(v-model="objIDM" single-line outline id="objIDM")
        v-flex(xs3)
          v-text-field(v-model="newName" single-line outline id="newName")
          
      v-layout(align-center justify-start row wrap fill-height)
        v-btn(large color="primary", @click="modifyPost") Modify
    
      //Add Anoucement
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(lg6)
          h2 Add Announcements
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          h3 Object ID
        v-flex(xs3)
          h3 New Announcement
      
      v-layout(align-center justify-start row wrap fill-height)
        v-flex(xs3)
          v-text-field(v-model="objIDMA" single-line outline id="objIDM")
        v-flex(xs3)
          v-text-field(v-model="newAnn" single-line outline id="newName")
          
      v-layout(align-center justify-start row wrap fill-height)
        v-btn(large color="primary", @click="modifyPostA") Add Announcement
    
    

</template>



<script>
import CourseService from "../CourseService";
export default {
  name: "Courses",
  data() {
    return {
      courses: [],
      error: "",
      text: "",
      courseID: "",
      courseTitle: "",
      courseTerm: "",
      termStart: "",
      googleCal: "",
      iCal: "",
      color: "",
      color2: "",
      font: "",
      pri: "",
      grades: "",
      announcements: "",
      resourceLink: "",
      contactInfo: "",
      generalText: "",
      objID: "",
      at: "",
      change: "",
      objIDM: "",
      newName: "",
      objIDMA: "",
      newAnn: ""
    };
  },
  async created() {
    //runs automatically when component created
    try {
      this.posts = await CourseService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      const t =
        this.courseID +
        "cmsplit" +
        this.courseTitle +
        "cmsplit" +
        this.courseTerm +
        "cmsplit" +
        this.termStart +
        "cmsplit" +
        this.googleCal +
        "cmsplit" +
        this.iCal +
        "cmsplit" +
        this.grades +
        "cmsplit" +
        this.announcements +
        "cmsplit" +
        this.resourceLink +
        "cmsplit" +
        this.color +
        "cmsplit" +
        this.color2 +
        "cmsplit" +
        this.font +
        "cmsplit" +
        this.pri +
        "cmsplit" +
        this.contactInfo +
        "cmsplit" +
        this.generalText;

      console.log(t);
      await CourseService.insertPost(t);
      //this.courses = await CourseService.getPosts();
    },
    async getPost() {
      //console.log("hello");
      this.courses = await CourseService.getPosts();
      //var horses = await CourseService.getPosts();
      //var camels = JSON.stringify(horses).split("}");
      //console.log(camels)
    },

    async deletePost(id) {
      await CourseService.deletePost(id);
      this.courses = await CourseService.getPosts();
    },
    async modifyPost() {
      const par = this.objIDM + "cmsplit" + this.newName;
      //console.log(par)
      this.courses = await CourseService.modifyPost(par);
    },
    async modifyPostA() {
      const par = this.objIDMA + "dipShit" + this.newAnn;
      console.log(par);
      this.courses = await CourseService.modifyPost(par);
    }
  }
};
</script>

<style scoped>
</style> 