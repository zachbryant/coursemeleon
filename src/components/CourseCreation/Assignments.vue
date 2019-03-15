<template lang="pug">
        div
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 Assignments
            
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(xs3)
                    h3 Assignment
                v-flex(xs3)
                    h3 Due Date
                v-flex(xs3)
                    h3 Link
        
            v-layout(align-start justify-start row wrap fill-height v-for="iter in iterations" :key="index")
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline placeholder="")
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline placeholder="")
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline placeholder="")

            v-btn(round color="primary" @click="onClickRemove") Remove Assignment
            v-btn(round color="primary" @click="onClickAdd") Add Assignment

</template>



<script>

export default {
    name: 'assignments',
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
