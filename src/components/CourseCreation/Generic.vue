<template lang="pug">
        div
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 {{section_title}}

            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg6)
                    v-textarea(v-model="message" outline)

</template>



<script>
export default {
    name: 'generic',
    props: {
        section_title: String
    }
}
</script>