<template>
  <div>
    <v-container grid-list-xl></v-container>
    <h1>Explore</h1>
    <Calendar/>
  </div>
</template>

<script>
import Calendar from "@/components/Calendar.vue";

export default {
 name: "explore",
 components: {
   Calendar
 }
};
</script>

<style lang="less"></style>
