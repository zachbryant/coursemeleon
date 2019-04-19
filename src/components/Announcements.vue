<template>
    <div>
        <v-container grid-list-xl></v-container>
        <!-- below just gets the newest item-->
        <h1>Announcements</h1>
        <v-container grid-list-xl style="border-style: dashed; border-color: #b7b7b7; border-width: 2px;">
             <!--<h3>{{ courses[this.myCourseIndex].announcements }}</h3>-->
             <h3>{{ courses[msg].announcements }}</h3>
        </v-container>
        <v-container grid-list-xl></v-container>
        
    </div>
</template>

<script>
import CourseService from '../services/CourseService';
import store from "../store";

export default {
    
    name: "Announcements",
    
    data() {
        return {
            courses: [],
            error: '',
            text: '',
            //myCourseIndex: store.state.courseIndex
        }
    },
    props: {
        msg: String
        
    },
    computed: {
        courseIndex: function() {
            console.log("course index state: " + store.state.courseIndex);
            return store.state.courseIndex;
            
        },
        getCourseIndex () {
            return this.$store.getters.getCourseIndex;
        }
    },
    async created() { //runs automatically when component created
        try {
            console.log("yeet")
            this.courses = await CourseService.getPosts(); //populate courses array
            //var tt=stringify(msg);
            console.log("VVVVVV"+ this.courses[this.msg].color);
        } catch(err) {
            this.error = err.message;
        }
    },
     push() {
      console.log("hell")   
      //document.getElementById("myHeader").value= "hello"
      
    }
    
};
//console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKK" + courses[msg].color);
//this.$vuetify.theme.primary = courses[msg].color;
</script>