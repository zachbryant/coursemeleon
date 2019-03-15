<template lang="pug">
        div
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

export default {
    name: 'officehours'
}


</script>



<style>

</style>