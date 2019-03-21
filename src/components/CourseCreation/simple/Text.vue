<template lang="pug">
    p Type is {{getType()}}
</template>

<script>
import SimpleCourseElement from "@/components/CourseCreation/simple/SimpleCourseElement.vue";

export default {
    name: "textItem",
    extends: SimpleCourseElement,
    data() {
        return {
            
        }
    },
    methods: {
    }
}
</script>

<style lang="less">

</style>

