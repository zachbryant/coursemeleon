<template lang="pug">
  div(style="text-align:start;")

    v-container(grid-list-md)
        // PAGE TITLE
        v-layout(align-start justify-start row wrap fill-height)
                v-flex(xs3)
                    h1 Create Your Course

        br
        br
        
        // COURSE INFORMATTION
        courseinformation

        br
        br
        
        // ANNOUNCEMENTS
        generic(section_title="Announcements")

        br
        br

        // GENERAL INFORMATION
        generic(section_title="General Information")

        br
        br
        
        // ASSIGNMENTS
        v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 Assignments
        
        // Headings
        v-layout(align-start justify-start row wrap fill-height)
            v-flex(xs3)
                h3 Assignment
            v-flex(xs3)
                h3 Due Date
            v-flex(xs3)
                h3 Link

        // Rendering assignments component based on size of assNum
        assignments(v-for="iter in assNum")

        // Add and remove buttons correspond to push and pop calls off assNum
        v-layout(align-start justify-start row wrap fill-height)
            v-btn(small round color="primary" @click="onClickRemove('assignment')") Remove Assignment
            v-btn(small round color="primary" @click="onClickAdd('assignment')") Add Assignment

        br
        br

        // LECTURES
        v-layout(align-start justify-start row wrap fill-height)
            v-flex(lg12)
                h2 Lecture Information
        
        v-layout(align-start justify-start row wrap fill-height)
            v-flex(xs1)
                h3 Section
            v-flex(xs3)
                h3 Time
            v-flex(xs3)
                h3 Location

        lectureinformation(v-for="iter in lectureNum")

        v-layout(align-start justify-start row wrap fill-height)
            v-btn(small round color="primary" @click="onClickRemove('lecture')") Remove Lecture
            v-btn(small round color="primary" @click="onClickAdd('lecture')") Add Lecture



        br
        br

        // OFFICE HOURS
        v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 Office Hours
            
        v-layout(align-start justify-start row wrap fill-height)
            v-flex(xs1)
                h3 Day
            v-flex(xs3)
                h3 Time
            v-flex(xs3)
                h3 Location
            v-flex(xs3)
                h3 Instructor
         
        officehours(v-for="iter in officehoursNum")

        v-layout(align-start justify-start row wrap fill-height)
            v-btn(small round color="primary" @click="onClickRemove('officehours')") Remove Office Hour
            v-btn(small round color="primary" @click="onClickAdd('officehours')") Add Office Hour

        br
        br


        // CUSTOM SECTIONS
        v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 Custom Sections

        genericcustom(v-for="iter in custNum")
        
        v-layout(align-start justify-start row wrap fill-height)
            v-btn(small round color="primary" @click="onClickRemove('custom')") Remove Section
            v-btn(small round color="primary" @click="onClickAdd('custom')") Add Section

        br
        br

        // PUBLISH BUTTONS
        v-layout(align-start justify-start row wrap fill-height)
                v-btn(large color="primary", @click="publish") PUBLISH
        
        
</template>




<script>

import generic from "@/components/CourseCreation/Generic.vue";
import courseinformation from "@/components/CourseCreation/CourseInformation.vue";
import assignments from "@/components/CourseCreation/Assignments.vue";
import officehours from "@/components/CourseCreation/OfficeHours.vue";
import lectureinformation from "@/components/CourseCreation/LectureInformation.vue";
import genericcustom from "@/components/CourseCreation/GenericCustom.vue";

export default {
    name: 'app',
    components: {
        generic,
        courseinformation,
        assignments,
        officehours,
        lectureinformation,
        genericcustom
    },
    data() {
        return {
            assNum: [],
            custNum: [],
            lectureNum: [],
            officehoursNum: []
        };
    },
    methods: {
        onClickAdd(addstring) {
            if(addstring == "assignment") {
                this.assNum.push("")
            } else if(addstring == "custom") {
                this.custNum.push("")
            } else if(addstring == "lecture") {
                this.lectureNum.push("")
            } else if(addstring == "officehours") {
                this.officehoursNum.push("")
            }
        },
        onClickRemove(addstring) {
            if(addstring == "assignment") {
                this.assNum.pop()
            } else if(addstring == "custom") {
                this.custNum.pop()
            } else if(addstring == "lecture") {
                this.lectureNum.pop()
            } else if(addstring == "officehours") {
                this.officehoursNum.pop()
            }
        },
        publish() {
            // TO BACKEND
        }
    }
}



</script>
