<template>
    <div>
        <v-container grid-list-xl></v-container>
        <!-- below just gets the newest item-->
        <h1>Announcements</h1>
        <v-container grid-list-xl style="border-style: dashed; border-color: #b7b7b7; border-width: 2px;">
            <h3>{{ courses[myCourseIndex].announcements }}</h3>
            <button @click="push">press</button>
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
            myCourseIndex: ''
        }
    },
    async created() { //runs automatically when component created
        try {
            console.log("yeet")
            this.courses = await CourseService.getPosts(); //populate courses array
            console.log("crap")
            // this fucking line of code written by the pussy
            this.myCourseIndex = $store.getters.getCourseIndex;
            
            console.log("bitchass")
            console.log("zach"+ this.myCourseIndex);
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