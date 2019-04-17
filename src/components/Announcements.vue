<template>
    <div>
        <v-container grid-list-xl></v-container>
        <!-- below just gets the newest item-->
        <h1>Announcements</h1>
        <v-container grid-list-xl style="border-style: dashed; border-color: #b7b7b7; border-width: 2px;">
             <!--<h3>{{ courses[this.myCourseIndex].announcements }}</h3>-->
            <p>{{courseIndex}}</p>
            <button @click="push">press</button>
        </v-container>
        <v-container grid-list-xl></v-container>
        
    </div>
</template>

<script>
import CourseService from '../CourseService';
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
    computed: {
        courseIndex: function() {
            console.log("course index state: " + store.state.courseIndex);
            return store.state.courseIndex;
        }
    },
    async created() { //runs automatically when component created
        try {
            console.log("yeet")
            this.courses = await CourseService.getPosts(); //populate courses array
            // this fucking line of code written by the pussy
            //this.myCourseIndex = $store.getters.getCourseIndex;
            //this.myCourseIndex = $store.state.courseIndex;
            
            //console.log("course index state: " + courseIndex);
            //console.log("zach"+ this.myCourseIndex);
        } catch(err) {
            this.error = err.message;
        }
    },
     push() {
      console.log("hell")   
      var i;
      var s;  
      for(i=0;i<courses.length;i++){
          
      }
    }
};
</script>