<template lang="pug">
    div
        v-container(grid-list-xl)
        img(alt)="Coursemeleon logo" (src)="@/assets/logos/logo.svg"
        h1 {{ ProfessorName }}
        p {{ Description }}
</template>

<script>
export default {
    name: "InstructorInfo",
    data() {
        return{};
    },
    props: {
        ProfessorName: String,
        Description: String
    }
}
</script>