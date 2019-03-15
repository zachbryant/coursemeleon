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
    }
}



</script>
