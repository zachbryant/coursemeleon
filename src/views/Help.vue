<template>
  <div class="help">
    <v-container grid-list-xl>
      <v-card dark color="primary">
        <h1>This is a help page!</h1> 
      </v-card>
    </v-container>
    
    <v-layout row wrap>
      <v-flex xs6>
        <v-card dark color="primary">
          <h3>column 1</h3>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card dark color="primary">
          <h3>column 2</h3>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "help",
  components: {
    Navigation
  }
};
</script>

