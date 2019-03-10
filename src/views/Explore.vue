<template>
  <div>
    <v-container grid-list-xl></v-container>
    <h1>Explore</h1>
    
    <PostComponent/>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar.vue";
import PostComponent from "@/components/PostComponent.vue";

export default {
 name: "explore",
 components: {
   Calendar,
   PostComponent
 }
};
</script>

<style lang="less"></style>
