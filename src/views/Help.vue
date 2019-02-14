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
          <v-card id="instructBox">
            <p>
              Are you a professor without an account? Head on over to the /sign up/ page and get one set up!
              An account will allow you- and only you- to create and edit your personal course webpage.
            </p>
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
          <v-card id="instructBox">
            <p>
              Got your account set up? Great! Now it's time for the fun part- creating your website! Go to the 
              /Create/ page and hit 'Create'. The dialogue boxes will walk you through inputting you class information- 
              remember, this is your website, so feel free to include/ommit what you want!
            </p>
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
          <v-card id="instructBox">
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

<style>
#instructBox {
  outline: 2px dashed rgb(158, 158, 158);
  box-shadow: 1px 1px 4px 0 rgba(255, 255, 255, 0.103);
  padding: 10px;
}

#instructBox p {
  font-family: "Roboto", sans-serif;
  font-size: large;
  font-weight: 300;
}
</style>