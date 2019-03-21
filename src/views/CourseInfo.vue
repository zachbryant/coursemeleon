<template lang="pug">
        div
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 Course
            v-layout(align-start justify-start row wrap fill-height)
                v-flex(lg12)
                    h2 Course Name
            v-layout(align-start justify-start column wrap fill-height)
              v-flex(xs3)
                h3 Course Information
                v-layout(align-start justify-start row wrap fill-height)
                  p Henlo
              v-flex(xs3)
                h3 Lecture Information
                v-layout(align-start justify-start row wrap fill-height)
                  p Help
              v-flex(xs3)
                h3 Assignments
                v-layout(align-start justify-start row wrap fill-height)
                  p No homework please
              v-flex(xs3)
                h3 Office Hours
                v-layout(align-start justify-start row wrap fill-height)
                  p all day every day
              v-flex(xs3)
                h3 Custom
                v-layout(align-start justify-start row wrap fill-height)
                  p Custom
</template>