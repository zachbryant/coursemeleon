<template lang="pug">
        div
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 Course Information
            
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(xs3)
                    h3 Course ID
                v-flex(xs3)
                    h3 Course Name
            
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)

</template>



<script>

export default {
    name: 'courseinformation'
}
