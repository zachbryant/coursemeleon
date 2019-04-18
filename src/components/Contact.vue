<template>
    <div>
        <v-container grid-list-xl></v-container>
        <!-- below just gets the newest item-->
        <h1>Contact Me</h1>
        <v-container grid-list-xl>
            <v-container grid-list-xl style="border-style: dashed; border-color: #b7b7b7; border-width: 2px;">
                <v-layout row wrap align-center>
                <v-flex xs6>
                    <v-card id="imageBox">
                        <span style="color: rgb(183, 204, 146);">
                            <i class="fas fa-envelope-open-text fa-6x"></i>
                        </span>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                    <p>Email: {{ courses[msg].contact_info }}</p>
                </v-flex>
                </v-layout>
            </v-container>
        </v-container>
        <v-container grid-list-xl></v-container>
    </div>
</template>

<script>
import CourseService from '../CourseService';

export default {
    name: "Contact",
    data() {
        return {
            courses: [],
            error: '',
            text: '',
        }
    },
    props: {
        msg: String
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

<style>
#imageBox {
 box-shadow: 1px 1px 4px 0 rgba(255, 255, 255, 0.103);
 padding: 10px;
 background-color: transparent;
}
</style>