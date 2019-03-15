<template lang="pug">
        div
            // Office Hours Information
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
         
            v-layout(align-start justify-start row wrap fill-height v-for="iter in iterations" :key="index")
                v-flex(xs1)
                    v-text-field(v-model="message" single-line outline)
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)  
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)     
            
            v-btn(round color="primary" @click="onClickRemove") Remove Office Hour
            v-btn(round color="primary" @click="onClickAdd") Add Office Hour

</template>



<script>

export default {
    name: 'officehours',
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



<style>

</style>