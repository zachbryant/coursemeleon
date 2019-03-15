<template lang="pug">
        div
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
</template>



<script>

export default {
    name: 'assignments'
}

</script>
