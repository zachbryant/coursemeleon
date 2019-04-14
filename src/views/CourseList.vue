<template>
    <div class = "courselist">
        <v-container grid-list-xl></v-container>
        <h1>Course List</h1>

        <div class ="posts-container">
        <div class="post"
          v-for="(post, index) in courses"
          v-bind:item="post"
          v-bind:index="index"
          v-bind:key="post._id"
        >
          <p class="title">{{ post.course_name }}</p>
          <p class="text">{{ post._id }}</p>
          
        </div>
      </div>

    </div>
</template>

<script>
import CourseService from '../CourseService';

export default {
    name: "CourseList",
    components: {

    },
    data() {
        return {
            courses: [],
            error: '',
            text: '',
        }
    },
    async created() { //runs automatically when component created
        try {
            this.courses = await CourseService.getPosts(); //populate courses array
        } catch(err) {
            this.error = err.message;
        }
    }
};
</script>

<style lang="less">
@import (reference) "../App.less";

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
  border: 1px solid #b7cc92;
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
p.title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
  color: #7c9454;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
  color: #b7cc92;
}
</style>