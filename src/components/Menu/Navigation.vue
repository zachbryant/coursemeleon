<template lang="pug">
  v-toolbar#toolbar(app dark fixed clipped-right flat align-center px-0)
    v-layout(row align-center)
      v-flex(xs2 md4 justify-content-start)
        router-link(to="/")
          img(class="logo" alt="logo" src="@/assets/logos/logo_white.svg")
          h3#title(class="hidden-sm-and-down") Coursemeleon
      v-flex(xs6)
        v-autocomplete(
          v-model="model"
          :items="names"
          :loading="isLoading"
          search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          clearable
          item-text="Description"
          item-value="API"
          placeholder="Search"
          prepend-icon="mdi-database-search"
          @change="queryCourses")
        v-divider
      v-flex(xs2)
        v-btn(flat @click.stop="$emit('toggleHamburgerEvent')")
          v-icon fa-bars
</template>

<script>
import CourseService from "../../services/CourseService";
import store from "../../store";

export default {
  name: "navigation",
  props: {
    msg: String
  },
  components: {},
  data() {
    return {
      model: null,
      isLoading: false,
      items: ["CS 307", "MA 128", "ECE 376", "PHYS 172"],
      names: [],
      courses: [],
      obj: ""
    };
  },
  async created() {
    //runs automatically when component created
    try {
      
      this.courses = await CourseService.getPosts(); //populate courses array
      //console.log("CCCCCC" + this.courses[0]._id);
      //commit message
      
      this.names =await CourseService.getNames();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async queryCourses(queryString) {
      if (queryString != undefined && queryString.length > 1) {
        this.isLoading = true;
        console.log("chosen = " + queryString);
        //this.obj= await CourseService.getOneCourse(queryString)//.then(function(response){console.log(response)});
        //console.log("chosen id = " + this.obj);
        
      }
      //@TODO insert api call
      this.isLoading = false;

      //parse everything after the course id
      var parseName = queryString.substring(queryString.indexOf(":"));
      parseName = parseName.substring(2);

      var newURL = '/course:' + parseName.replace(/\s/g, '%20');
      var newPath = parseName.replace(/\s/g, '%20');
      console.log(newURL);
      window.location.href = newURL;
      //this.$router.push(newURL);
      //this.$router.push({ path: "/", query: { cid: this.obj }});
      }
    }
  }
</script>

<style scoped lang="less">
@import (reference) "../../App.less";

#toolbar {
  background-color: @primary;
}
#title {
  color: white !important;
  display: inline;
  padding-left: 10px;
}
.header {
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.11);
  width: 100%;
}
.header h4 {
  color: white !important;
  text-transform: lowercase;
}

.logo {
  margin-bottom: -25px;
  padding-bottom: 20px;
  height: calc(35px + 3vh);
}
</style>
