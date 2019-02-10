<template>
  <div class="help">
    <v-container grid-list-xl>
      <v-card color="green lighten-2" dark>
        <h1>This is a help page!</h1> 
      </v-card>
    </v-container>

    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs3>
          <v-card color="green lighten-2" dark>
            <h3>Graphic</h3>
          </v-card>
        </v-flex>
        <v-flex xs9>
          <v-card color="green lighten-2" dark>
            <h3>Step 1</h3>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs3>
          <v-card color="green lighten-2" dark>
            <h3>Graphic</h3>
          </v-card>
        </v-flex>
        <v-flex xs9>
          <v-card color="green lighten-2" dark>
            <h3>Step 2</h3>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs3>
          <v-card color="green lighten-2" dark>
            <h3>Graphic</h3>
          </v-card>
        </v-flex>
        <v-flex xs9>
          <v-card color="green lighten-2" dark>
            <h3>Step 3</h3>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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

