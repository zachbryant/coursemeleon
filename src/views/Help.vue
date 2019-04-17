<template>
 <div class="help">
    <div>
        <grade/>
    </div>
  
    <v-container grid-list-xl>
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

   <v-container id="instructBox" grid-list-xl>
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

 <v-container id="Box" grid-list-xl>
     <v-layout row wrap align-center>
     <v-flex xs11>
         <h2>Contact Us</h2>
     </v-flex>
      </v-layout>

   <v-layout row wrap align-center>
     <v-flex xs3>
         <span style="color: rgb(255,255,255);">
             <i class="fas fa-building fa-6x"></i>
           </span>
     </v-flex>
     <v-flex xs3>
         <h1>Lawson</h1>
     </v-flex>
     <v-flex xs4>
          <v-text-field
       color="white"
       label="Name"
      
     ></v-text-field>
     </v-flex>
      </v-layout>

   <v-layout row wrap align-center>
     <v-flex fill-height d-flex xs3>
       <span style="color: rgb(255,255,255);">
             <i class="fas fa-phone fa-6x"></i>
           </span>
     </v-flex>
     <v-flex xs3>
         <h1>513-791-2937</h1>
     </v-flex>
     <v-flex xs4>
         <v-text-field
       color="white"
       label="Email"
     ></v-text-field>
     </v-flex>
      </v-layout>


    <v-layout row wrap align-center>
     <v-flex fill-height d-flex xs3>
         <span style="color: rgb(255,255,255);">
             <i class="fas fa-envelope-open-text fa-6x"></i>
           </span>
     </v-flex>
     <v-flex xs3>
         <h1>bendy@purdue.edu</h1>
     </v-flex>
     <v-flex xs4>
         <v-text-field
       color="white"
       label="Message"
     ></v-text-field>
     </v-flex>
      </v-layout>

     <v-flex xs>
      <button type="button">Submit</button>
     </v-flex>

   </v-container>

 </div>
</template>




<script>
import Navigation from "@/components/Navigation.vue";
import Grade from "@/components/Grade.vue";
export default {
 name: "help",
 components: {
   Navigation,
   Grade
 }
};
</script>

<style>
#Box h1{
 color: white;
 font-size: 25px;
}
#Box h2{
 font-size: 45px;
 color: white
}
#imageBox {
 box-shadow: 1px 1px 4px 0 rgba(255, 255, 255, 0.103);
 padding: 10px;
 background-color: transparent;
}

#instructBox {
 outline: 2px  rgb(158, 158, 158);
 box-shadow: 1px 1px 4px 0 rgba(255, 255, 255, 0.103);
 padding: 10px;
 background-color: transparent;
}
#Box {
 background-color: rgb(183, 204, 146);
}
#NameBox {
 font-family: "Roboto", sans-serif;
 font-size: small;
 color:white;
 outline: 2px  rgb(158, 158, 158);
 box-shadow: 1px 1px 4px 0 rgba(255, 255, 255, 0.103);
 padding: 10px;
 background-color: lightgrey;
}

#instructBox p {
 font-family: "Roboto", sans-serif;
 font-size: large;
 font-weight: 300;
}

#Box button{
 margin-right: 0px;
 font-family: 'Nunito', Helvetica, Arial, sans-serif;
 font-size: 40px;
 border: 0ch;
 right:100px;
 color:#AED581;
 background: #FFFFFF;
 border-radius: 8px;
 font-weight: normal;
 margin-top: 60px;
 justify-content: flex-start;
 max-width: 600px;
 width: 100%;
}
</style>

