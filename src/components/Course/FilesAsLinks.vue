<!-- Using Axios and Dropzone, communicate with backend

    Files edited: Course.vue

    1. Once speed-dial button in course.vue is clicked, it should
    communicate here. Make a file upload prompt appear
    2. If file is selected, upload file to backend and display link to file
      2a. Maybe have a form user can click on to display uploaded material
    3. If cancel then delete prompt and return to whatever or something fuck I don't know
-->


<template lang="pug">
  div#FilesAsLinks
      vue-dropzone#drop1(
        ref="dropzone"
        @vdropzone-file-added="fileAdded"
        @vdropzone-success="success"
        @vdropzone-error="error"
        @vdropzone-removed-file="removed"
        @vdropzone-sending="sending"
        @vdropzone-success-multiple="successMultiple"
        @vdropzone-sending-multiple="sendingMultiple"
        @vdropzone-total-upload-progress="progress"
        @vdropzone-mounted="mounted"
        @vdropzone-drop="drop"
        @vdropzone-drag-start="start"
        @vdropzone-drag-over="over"
        @vdropzone-drag-leave="leave"
        @vdropzone-duplicate-file="duplicate"
        :options="dropOptions" 
        @vdropzone-complete="afterComplete")
      button(@click="removeAllFiles" Remove All Files)
</template>

<!--URL: endpoint from http service, must return a valid response for POST call",
-->

<!-- TODO: POST method that can communicate with backend, 
            Send formdata of file 
            Dropzone has a function that can make a thumbnail/url from a file retrieved from the backend
-->
<script>
import vueDropzone from "vue2-dropzone";
import express from 'express';

export default {
  data: () => ({
    dropzoneOptions: {
      url: "localhost:8080",
      maxFilesize: 5, //MB
      thumbnailWidth: 150,
      addRemoveLinks: true
    },
    filename: function (req, file, callback){
      callback(null, file.originalname + path.extname(file.originalname));
    }
  }),
  methods: {
    removeAllFiles(){
      this.$refs.dropZone.removeAllFiles();
      console.log("Removed all files")
    },
    afterComplete(file){
      console.log("After Complete");
      console.log(file);
    },
    duplicate(file){
      console.lg("Duplicate File");
      console.log(file);
    },
    fileAdded(file){
      console.log("File Added");
      console.log(file);
      console.log(file.dataURL);
    },
    success(file){
      console.log("File Success");
      console.log(file);
    },
    error(file){
      console.log("File Error");
      console.log(file);
    },
    removed(file){
      console.log("File Removed");
      console.logf(file);
    },
    sending(file){
      console.log("File Sending");
      console.log(file);
    },
    successMultiple(Files){
      console.log("Files Multiple");
      console.log(Files);
    },
    sendingMultiple(Files){
      console.log("Files Sending Multiple");
      console.log(Files);
    }
  },
  components: {
    vueDropzone
  }
};
app.listen(8080, () => {
  console.log('app is listening on port 8080 someone pls tell me this is working')
})
</script>

<style lang="less">
</style>
