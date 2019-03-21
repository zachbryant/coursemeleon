<template>
    <div>
        <v-container grid-list-xl></v-container>
        <!-- below just gets the newest item-->
        <h1>Announcements</h1>
        <v-container grid-list-xl style="border-style: dashed; border-color: #b7b7b7; border-width: 2px;">
            <h3>{{ courses[courses.length-1].announcements }}</h3>
        </v-container>
        <v-container grid-list-xl></v-container>
    </div>
</template>

<script>
import CourseService from '../CourseService';

export default {
    name: "Announcements",
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