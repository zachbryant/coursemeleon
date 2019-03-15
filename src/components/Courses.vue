<template>
    <div>
        <v-container grid-list-xl></v-container>

        <h1>Courses</h1>

        <div class="main-container">
            <h1>Create Course</h1>
            <!-- CREATE POST-->
            <div class="create-post">
                <label id="courseID">Enter Course ID</label>
                <input type="text" id="courseID" v-model="courseID" placeholder="Course ID"><br>
                <label id="courseTitle">Enter Course Title</label>
                <input type="text" id="courseTitle" v-model="courseTitle" placeholder="Course Title"><br>
                <label id="courseTerm">Enter Course Term</label>
                <input type="text" id="couseTerm" v-model="couseTerm" placeholder="Course Term"><br>
                <label id="termStart">Enter Term Start Date</label>
                <input type="text" id="termStart" v-model="termStart" placeholder="Term start date"><br>
                <button v-on:click="createPost">Post!</button>
            </div>
            <div class="course">
                <button v-on:click="getPost">Get Post</button>
            </div>
             <div class ="post-container">
                <div class="post"
                    v-for="(post, index) in courses"
                    v-bind:item="post"
                    v-bind:index="index"
                    v-bind:key="post._id"
                    v-on:dblclick="deletePost(post._id)"
                >
                    <p class="text">{{ post }}</p>
                </div>
            </div>

          <div class="modify-post">
             <label id="objID">Enter object ID of the object you want to modify</label>
              <input type="text" id="objID" v-model="objID" placeholder=" object ID"><br>
              <label id="at">Enter which attribute you want modify</label>
              <input type="text" id="at" v-model="at" placeholder=" attribute"><br>
              <label id="change">What is the new value of the attribute</label>
              <input type="text" id="change" v-model="change" placeholder=" change"><br>
               <button v-on:click="modifyPost">Modify Post</button>
                
          </div>

            <hr>
        </div>

        <v-container grid-list-xl></v-container>
    </div>
</template>

<script>

import CourseService from '../CourseService';
export default {
  name: "Courses",
  data() {
      return {
          courses: [],
          error: '',
          text: '',
          courseID: '',
          courseTitle: '',
          couseTerm: '',
          termStart: '',
          objID: '',
          at: '',
          change: ''

      }
  },
  async created() { //runs automatically when component created
    try {
        this.posts = await CourseService.getPosts();
    } catch(err) {
        this.error = err.message;
    }
  },
  methods: {
      async createPost() {
          const t = this.courseID + "," + this.courseTitle + "," + this.couseTerm + "," + this.termStart;
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
         const t = this.objID + "," + this.at + "," + this.change;
          await CourseService.modifyPost(t);
          this.courses = await CourseService.getPosts();
      }
  }
};
</script>

<style scope>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: 3bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style> 