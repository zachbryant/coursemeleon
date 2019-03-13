<template>
    <div>
        <v-container grid-list-xl></v-container>
        <!-- below just gets the first item-->
        
        <v-container grid-list-xl></v-container>
    </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: "Title",
  data() {
      return {
          posts: [],
          error: '',
          text: ''
      }
  },
  async created() { //runs automatically when component created
    try {
        this.posts = await PostService.getPosts();
    } catch(err) {
        this.error = err.message;
    }
  },
  methods: {
      async createPost() {
          await PostService.insertPost(this.text);
          this.posts = await PostService.getPosts();
      },
      async deletePost(id) {
          await PostService.deletePost(id);
          this.posts = await PostService.getPosts();
      }
  }
};
</script>
