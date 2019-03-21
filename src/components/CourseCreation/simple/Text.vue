<template lang="pug">
    div(v-switch="getType()")
        h5(v-case="'h5'" :style="style") {{ text }}
        h4(v-case="'h4'" :style="style") {{ text }}
        h3(v-case="'h3'" :style="style") {{ text }}
        h2(v-case="'h2'" :style="style") {{ text }}
        h1(v-case="'h1'" :style="style") {{ text }}
        p(v-case="'p'" :style="style") {{ text }}
        span(v-default :style="style") {{ text }}
</template>

<script>
import SimpleCourseElement from "@/components/CourseCreation/simple/SimpleCourseElement.vue";

export default {
    name: "textItem",
    extends: SimpleCourseElement,
    data() {
        return {
            text: this.data.data,
            style: this.data.style || ""
        }
    },
    methods: {
    }
}
</script>

<style scoped lang="less">
div {
    display: inline;
}
</style>

