<template lang="pug">
        div
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h1 Course Information
                // Headers
                v-flex(xs3)
                    h3 Course ID
                v-flex(xs3)
                    h3 Course Name
            
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(xs3)
                    v-text-field(v-model="message" placeholder="test")
                v-flex(xs3)
                    v-text-field(v-model="message" placeholder="test")

</template>



<script>

export default {
    name: 'courseinformation'
}
