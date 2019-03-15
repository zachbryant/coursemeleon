<template lang="pug">
  div(style="text-align:start;")

    v-container(grid-list-md)
        v-layout(align-start justify-start row wrap fill-height)
                v-flex(xs3)
                    h1 Create Your Course

        br
        br
        
        courseinformation

        br
        br
        
        generic(section_title="Announcements")

        br
        br

        generic(section_title="General Information")

        br
        br
        
        assignments

        br
        br
        br

        lectureinformation

        br
        br

        officehours

        br
        br

        genericcustom(v-for="iter in iterations" :key="index")

        br
        br

        v-btn(round color="primary" @click="onClickRemove") Remove Section
        v-btn(round color="primary" @click="onClickAdd") Add Section
        
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
            iterations: []
        };
    },
    methods: {
        onClickAdd() {
            this.iterations.push("")
        },
        onClickRemove() {
            this.iterations.pop()
        }
    }
}



</script>
