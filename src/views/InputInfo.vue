<template lang="pug">
  div(style="text-align:start;")
    h1 Input Your Information

    <v-container grid-list-xl>
     <v-layout align-start justify-start row fill-height>
        <v-flex xs3>
            h1 Announcements
        </v-flex>
     </v-layout>
     
     <v-layout align-start justify-start row fill-height>
        <v-flex xs3>
            <textarea v-model="message" placeholder="edit me" ></textarea>
        </v-flex>
     </v-layout>

     

    </v-container>
    
</template>




<script>




</script>
