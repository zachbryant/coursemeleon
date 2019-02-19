<template>
  <div class="help">
    <v-container grid-list-xl>
      <v-card color="green lighten-2" dark>
        <h1>This is a help page!</h1>
      </v-card>
    </v-container>

    <v-container grid-list-xl>
      <v-layout row wrap align-center>
        <v-flex xs3>
          <v-card id="imageBox">
            <span style="color: rgb(183, 204, 146);">
              <i class="fas fa-user-check fa-10x"></i>
            </span>
          </v-card>
        </v-flex>
        <v-flex xs9>
          <v-card id="instructBox">
            <p>
              Are you a professor without an account? Head on over to the /sign
              up/ page and get one set up! An account will allow you- and only
              you- to create and edit your personal course webpage.
            </p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-xl>
      <v-layout row wrap align-center>
        <v-flex xs3>
          <v-card id="imageBox">
            <span style="color: rgb(183, 204, 146);">
              <i class="fas fa-pencil-ruler fa-10x"></i>
            </span>
          </v-card>
        </v-flex>
        <v-flex xs9>
          <v-card id="instructBox">
            <p>
              Got your account set up? Great! Now it's time for the fun part-
              creating your website! Go to the /Create/ page and hit 'Create'.
              The dialogue boxes will walk you through inputting you class
              information- remember, this is your website, so feel free to
              include/ommit what you want!
            </p>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-xl>
      <v-layout row wrap align-center>
        <v-flex xs3>
          <v-card id="imageBox">
            <span style="color: rgb(183, 204, 146);">
              <i class="fas fa-users fa-10x"></i>
            </span>
          </v-card>
        </v-flex>
        <v-flex xs9>
          <v-card id="instructBox">
            <p>
              When you've input all the information you want, it's time to make
              your final course page! After you hit the 'publish' button, you'll
              recieve a link to your final website. Now's the time to send that
              link to all of your students so they can gain access to their new
              go-to site for all the newest course information!
            </p>
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
#imageBox {
  box-shadow: 1px 1px 4px 0 rgba(255, 255, 255, 0.103);
  padding: 10px;
  background-color: transparent;
}

#instructBox {
  outline: 2px dashed rgb(158, 158, 158);
  box-shadow: 1px 1px 4px 0 rgba(255, 255, 255, 0.103);
  padding: 10px;
  background-color: transparent;
}

#instructBox p {
  font-family: "Roboto", sans-serif;
  font-size: large;
  font-weight: 300;
}
</style>
