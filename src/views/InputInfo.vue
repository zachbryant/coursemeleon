<template lang="pug">
  div(style="text-align:start;")
    h1 Input Your Information

    v-container(grid-list-md)

        courseinformation
        
        generic(section_title="Announcements")

        generic(section_title="General Information")
        
        assignments

        lectureinformation

        officehours

        <button v-on:click="say('Submitted')">Publish</button>
        
</template>

<script>

import generic from "@/components/CourseCreation/Generic.vue";
import courseinformation from "@/components/CourseCreation/CourseInformation.vue";
import assignments from "@/components/CourseCreation/Assignments.vue"
import officehours from "@/components/CourseCreation/OfficeHours.vue"
import lectureinformation from "@/components/CourseCreation/LectureInformation.vue"

export default {
    name: 'app',
    components: {
        generic,
        courseinformation,
        assignments,
        officehours,
        lectureinformation
    },
    methods: {
        say: function (message) {
            alert(message)
        }
    }
}

</script>

<style lang="less">
button {
  padding: 10px 20px;
  border: 1px solid #ddd;
  color: #333;
  background-color:#fff;
  border-radius: 4px;
  font-size: 14px;
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  font-size: 40px;
  border: 0ch;
  margin:auto;
  display: block	;
  color:#AED581;
  background: #FFFFFF;
  border-radius: 8px;
  font-weight: normal;
  margin-top: 60px;
  cursor: pointer;
}
</style>