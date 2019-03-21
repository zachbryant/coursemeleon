<template lang="pug">
        div
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 {{ Course }} 
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 {{ CourseName }}
            v-layout(align-start justify-start column wrap fill-height)
              v-flex(xs3)
                h3 Course Information
                v-layout(align-start justify-start row wrap fill-height)
                  p {{ CourseInfoText }}
              v-flex(xs3)
                h3 Lecture Information
                v-layout(align-start justify-start row wrap fill-height)
                  p {{ LectureInfoText }}
              v-flex(xs3)
                h3 Assignments
                v-layout(align-start justify-start row wrap fill-height)
                  p {{ Assignments }}
              v-flex(xs3)
                h3 Office Hours
                v-layout(align-start justify-start row wrap fill-height)
                  p {{ OfficeHours }}
              v-flex(xs3)
                h3 {{ CustomTitle }}
                v-layout(align-start justify-start row wrap fill-height)
                  p {{ CustomText }}
</template>

<script>
export default {
    name: "CourseInfo",
    data() {
        return{};
    },
    props: {
        Course: String,
        CourseName: String,
        CourseInfoText: String,
        LectureInfoText: String,
        Assignments: String,
        OfficeHours: String,
        CustomTitle: String,
        CustomText: String
    }
}
</script>


