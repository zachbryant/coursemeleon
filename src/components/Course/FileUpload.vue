<!-- Using Axios and Dropzone, communicate with backend

    Files edited: Course.vue, Help.vue (Rujula wants to test file upload functionality here)

    1. Once speed-dial button in course.vue is clicked, it should
    communicate here. Make a file upload prompt appear
    2. If file is selected, upload file to backend and display link to file
      2a. Maybe have a form user can click on to display uploaded material
    3. If cancel then delete prompt and return to whatever or something fuck I don't know
-->

<template lang="pug">
  div
    vue-dropzone#file(
      ref="dropzone"
      @vdropzone-file-added="fileAdded"
      @vdropzone-success="success"
      @vdropzone-error="error"
      @vdropzone-removed-file="removed"
      @vdropzone-success-multiple="successMultiple"
      @vdropzone-mounted="dropzoneMounted"
      :options="dropzoneOptions" 
      @vdropzone-complete="afterComplete")
    button(@click="removeAllFiles") Remove All Files
</template>

<!--URL: endpoint from http service, must return a valid response for POST call",
-->

<!-- TODO: POST method that can communicate with backend, 
            Send formdata of file 
            Dropzone has a function that can make a thumbnail/url from a file retrieved from the backend
-->
<script>
import vueDropzone from "vue2-dropzone";

export default {
  name: "file-upload",
  data: () => ({
    dropzoneOptions: {
      url: "localhost:5000/api/file",
      method: "put",
      parallelUploads: 2,
      maxFilesize: 15, //MB
      thumbnailWidth: 150,
      addRemoveLinks: true
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname + path.extname(file.originalname));
    }
  }),
  methods: {
    removeAllFiles() {
      this.$refs.dropzone.removeAllFiles();
      console.log("Removed all files");
    },
    afterComplete(file) {
      console.log("After Complete");
      console.log(file);
    },
    fileAdded(file) {
      console.log("File Added");
      console.log(file);
      console.log(file.dataURL);
    },
    success(file) {
      console.log("File Success");
      console.log(file);
    },
    error(file) {
      console.log("File Error");
      console.log(file);
    },
    removed(file) {
      console.log("File Removed");
      console.logf(file);
    },
    successMultiple(Files) {
      console.log("Files Multiple");
      console.log(Files);
    },
    dropzoneMounted() {}
  },
  components: {
    vueDropzone
  }
};
</script>

<style lang="less"></style>
