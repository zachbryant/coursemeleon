<template>
  <div>
    <v-container grid-list-xl></v-container>
    <h1>Explore</h1>
    
    <Calendar/>
    <PostComponent/>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import PostComponent from "@/components/PostComponent.vue";
import Title from "@/components/Title.vue";

export default {
 name: "explore",
 components: {
   Calendar,
   PostComponent,
   Title
 }
};
</script>

<style lang="less"></style>
