<template lang="pug">
    v-flex(v-switch="getType()")
        h5(v-case="'h5'") {{ text }}
        h4(v-case="'h4'") {{ text }}
        h3(v-case="'h3'") {{ text }}
        h2(v-case="'h2'") {{ text }}
        h1(v-case="'h1'") {{ text }}
        p(v-case="'p'") {{ text }}
        span(v-default) {{ text }}

</template>

<script>
import SimpleCourseElement from "@/components/CourseCreation/simple/SimpleCourseElement.vue";

export default {
    name: "textItem",
    extends: SimpleCourseElement,
    data() {
        return {
            text: this.data.data
        }
    },
    methods: {
    }
}
</script>

<style lang="less">

</style>

