<template>
    <div>
        <Title/>
        <Calendar/>
        <h1 v-if="ifShow()">yay</h1>
        <h1 v-else>fuck</h1>
    </div>
</template>

<script>
import Courses from "@/components/Courses.vue";
import Title from "@/components/Title.vue";
import Null from "@/components/Null.vue";
import CourseService from '../CourseService';
import Calendar from "@/components/Calendar.vue";

export default {
    name: "coursepage",
    components: {
        Courses,
        Title,
        Calendar,
        Null
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
    },
    methods: {
        async ifShow() {
            this.courses = await CourseService.getPosts();
            console.log(this.courses[1].if_show);
            if(this.courses[1].if_show) {
                console.log("show true");
                return true;
            }
            else {
                console.log("show false");
                return false;
            }
        }
    },
    props: {
        show: {
            type: Boolean, 
            default: false,
        },
    },
    

};
</script>

<style lang="less"></style>
