<template lang="pug">
        div
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(xs3)
                    v-text-field(v-model="message" single-line outline)

            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg6)
                    v-textarea(v-model="message" outline)

</template>



<script>
export default {
    name: 'genericcustom'
}
</script>



<style>
</style>