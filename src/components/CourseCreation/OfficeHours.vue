<template lang="pug">
        div
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(xs1)
                    v-text-field(v-model="message" single-line outline)
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)  
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)

</template>



<script>
export default {
    name: 'officehours'
}
</script>



<style>
</style>