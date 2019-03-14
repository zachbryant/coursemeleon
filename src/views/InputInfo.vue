<template lang="pug">
  div(style="text-align:start;")
    h1 Input Your Information

    v-container(grid-list-md)
        // Announcements
        v-layout(align-start justify-start row wrap fill-height)
            v-flex(lg12)
                h1 Announcements

        v-layout(align-start justify-start row wrap fill-height)
            v-flex(xs3)
                v-textarea(v-model="message" placeholder="edit me")
        
        // General Information
        v-layout(align-start justify-start row wrap fill-height)
            v-flex(lg12)
                h1 General Information

        v-layout(align-start justify-start row wrap fill-height)
            v-flex(xs3)
                v-textarea(v-model="message" placeholder="edit me")
        
        // Assignments
        v-layout(align-start justify-start row wrap fill-height)
            v-flex(lg12)
                h1 Assignments
            // Headers
            v-flex(xs3)
                h3 Assignment
            v-flex(xs3)
                h3 Due Date
            v-flex(xs3)
                h3 Link
        
        v-layout(align-start justify-start row wrap fill-height v-for="i in 3")
            v-flex(xs3)
                v-text-field(v-model="message" placeholder="test")
            v-flex(xs3)
                v-text-field(v-model="message" placeholder="test")
            v-flex(xs3)
                v-text-field(v-model="message" placeholder="test")
        
        
        // Lecture Information
        v-layout(align-start justify-start row wrap fill-height)
            v-flex(lg12)
                h1 Lecture Information
            // Headers
            v-flex(xs1)
                h3 Section
            v-flex(xs3)
                h3 Section
            v-flex(xs3)
                h3 Location

        v-layout(align-start justify-start row wrap fill-height v-for="i in 3")
            v-flex(xs1)
                v-text-field(v-model="message" placeholder="test")
            v-flex(xs3)
                v-text-field(v-model="message" placeholder="test")
            v-flex(xs3)
                v-text-field(v-model="message" placeholder="test")
        
        // Office Hours Information
        v-layout(align-start justify-start row wrap fill-height)
            v-flex(lg12)
                h1 Office Hours
            // Headers
            v-flex(xs1)
                h3 Day
            v-flex(xs3)
                h3 Time
            v-flex(xs3)
                h3 Location
            v-flex(xs3)
                h3 Instructor
         
        v-layout(align-start justify-start row wrap fill-height v-for="i in 3")
            v-flex(xs1)
                v-text-field(v-model="message" placeholder="test")
            v-flex(xs3)
                v-text-field(v-model="message" placeholder="test")
            v-flex(xs3)
                v-text-field(v-model="message" placeholder="test")  
            v-flex(xs3)
                v-text-field(v-model="message" placeholder="test")      

     


     

    
</template>




<script>




</script>
