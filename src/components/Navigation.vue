<template>
  <div>
    <div class="header">
      <v-toolbar dark flat id="toolbar" align-center>
        <router-link to="/">
          <img class="logo" alt="logo" src="@/assets/logos/logo_white.svg" />
        </router-link>
        <v-toolbar-title>
          <router-link to="/">
            <h3 id="title">Coursemeleon</h3>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <div id="searchBox">
            <v-autocomplete
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
              @change="queryCourses"
            ></v-autocomplete>
            <v-divider></v-divider>
            
          </div>
          <v-btn to="/explore" flat>
            <h4>Create Course</h4>
          </v-btn>
          <v-btn to="/about" flat>
            <h4>About</h4>
          </v-btn>
          <v-btn to="/help" flat>
            <h4>Help</h4>
          </v-btn>
          <v-btn to="/coursepage" flat>
            <h4>My page</h4>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
import CourseService from "../CourseService";
import store from "../store";

export default {
  name: "Navigation",
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
    console.log("YYYYYYYYYYY")
    try {
      
      this.courses = await CourseService.getPosts(); //populate courses array
      console.log("CCCCCC" + this.courses[0]._id);
      //commit message
      
      this.names =await CourseService.getNames();
      console.log("TTTTTTTTT" + this.names);
      
      this.$vuetify.theme.primary = "#000000";
      this.$vuetify.theme.secondary = "#C28E0E";
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async queryCourses(queryString) {
      if (queryString != undefined && queryString.length > 1) {
        console.log("query");
        this.isLoading = true;
        console.log(queryString);
        this.obj= await CourseService.getOneCourse(queryString)//.then(function(response){console.log(response)});
        console.log("ZZZZZZZ" + this.obj);
        
        
      for(var i=0;i<this.courses.length;i++){
        
        if((this.courses[i]._id.localeCompare(this.obj))==0){
          //this.store.commit("setCourseIndex", {i});
          store.commit("setCourseIndex", i);
          //store.state.courseIndex = i;
          //trying out prototype
          //ue.prototype.$globalVar = 'Hello';
          //console.log("YES WE FINALLY MADE IT");      
          //console.log("course index is:" + i);
          //https://stackoverflow.com/questions/54188674/vue-js-vuex-state-not-updating-the-component-after-change
          console.log("course index state is: " + store.state.courseIndex);
        }
        
       console.log("your mom");
       console.log(this.courses[i]._id + "jjjjjj" + this.obj)
      }
        //@TODO insert api call
        this.isLoading = false;

        var newURL = '/course:' + queryString.replace(/\s/g, '');
        console.log(newURL);
        window.location.href = newURL;
      }
    }
  }
};
</script>

<style scoped lang="less">
@import (reference) "../App.less";

#toolbar {
  background-color: @primary;
}
#title {
  color: white;
}
.header {
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.11);
  width: 100%;
}
.header h4 {
  color: white;
  text-transform: lowercase;
}
.header #searchBox {
  padding-right: 50px;
}
.logo {
  margin-bottom: -25px;
  padding-bottom: 20px;
  height: calc(35px + 3vh);
}
</style>
