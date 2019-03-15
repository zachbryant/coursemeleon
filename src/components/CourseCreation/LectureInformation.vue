<template lang="pug">
        div
            // Lecture Information
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 Lecture Information
            
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(xs1)
                    h3 Section
                v-flex(xs3)
                    h3 Time
                v-flex(xs3)
                    h3 Location

            v-layout(align-start justify-start row wrap fill-height v-for="iter in iterations" :key="index")
                v-flex(xs1)
                    v-text-field(v-model="message" single-line outline)
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)
            
            v-btn(round color="primary" @click="onClickRemove") Remove Lecture
            v-btn(round color="primary" @click="onClickAdd") Add Lecture

</template>



<script>

export default {
    name: 'lectureinformation',
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