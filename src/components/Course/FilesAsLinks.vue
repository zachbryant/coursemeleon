<!-- Using Express, Axios, Multer and dropzone, communicate with backend

    Files edited: Router.js, course.vue

    1. Once speed-dial button in course.vue is clicked, it should
    communicate here. Make a file upload prompt appear
    2. If file is selected, upload file to backend and display link to file
      2a. Maybe have a form user can click on to display uploaded material
    3. If cancel then delete prompt and return to whatever or something fuck I don't know
-->


<template lang="pug">
  <div id="FilesAsLinks">
      <vue-dropzone 
      ref="dropzone" 
      id="drop1" 
      :options="dropOptions" @vdropzone-complete="afterComplete"
      ></vue-dropzone>
      <button @click="removeAllFiles">Remove All Files</button>
  </div>
</template>

<!--URL: endpoint from http service, must return a valid response for POST call",
-->

<script>
import vueDropzone from "vue2-dropzone";
import express from 'express';

const app = express();

var path = require('path'),
    multer = require('multer'),
    bodyParser = require('body-parser'),
    upload = multer( { dest: 'folder here/' } )

app.use(bodyParser.json());
app.use(bodyParser.urelencoded({extended: true}));

export default {
  data: () => ({
    dropOptions: {
      url: "localhost:5000",
      addRemoveLinks: true
    },
    filename: function (req, file, callback){
      callback(null, file.originalname + path.extname(file.originalname));
    }
  }),
  methods: {
    removeAllFiles(){
      this.$refs.dropZone.removeAllFiles();
    },
    afterComplete(file){
      console.log(file);
    }
  },
  components: {
    vueDropzone
  }
};
app.listen(3857, () => {
  console.log('app is listening on port 3857 someone pls tell me this is working')
})
</script>

<style lang="less">
//- Me little brain retard
</style>
