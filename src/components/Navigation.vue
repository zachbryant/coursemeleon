<template>
  <div>
    <div class="header">
      <v-toolbar dark flat id="toolbar">
        <router-link to="/">
          <img
            class="logo"
            style="padding-bottom:22px;"
            alt="logo"
            src="@/assets/logos/logo_white.svg"
          />
        </router-link>
        <v-toolbar-title>
          <router-link to="/">
            <span id="title">Coursemeleon</span>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <div id="searchBox">
            <v-autocomplete
              v-model="model"
              :items="items"
              :loading="isLoading"
              search-input.sync="search"
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
            <h4>Explore</h4>
          </v-btn>
          <v-btn to="/about" flat>
            <h4>About</h4>
          </v-btn>
          <v-btn to="/help" flat>
            <h4>Help</h4>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
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
      items: ["CS 307", "MA 128", "ECE 376", "PHYS 172"]
    };
  },
  methods: {
    queryCourses(queryString) {
      if (queryString != undefined && queryString.length > 1) {
        this.isLoading = true;
        console.log(queryString);
        //@TODO insert api call
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
//Imports
@import (css) url("https://fonts.googleapis.com/css?family=Nunito");
@import (css)
  url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

//Variables
@primary: var(--v-primary-base);
@secondary: var(--v-secondary-base);
@accent: var(--v-accent-base);
@text-color: #333333;
@semibold: 600;
@regular: 400;

#toolbar {
  background-color: @primary;
}

#title {
  font-size: 26px;
  font-weight: bold;
  color: white;
}

.header {
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.11);
  width: 100%;
}
.header h4 {
  color: white;
  font-weight: @regular;
  text-transform: lowercase;
}
.header #searchBox {
  padding-right: 50px;
}
.header ul {
  margin: 0;
  padding: 10px;
  list-style: none;
  overflow: hidden;
  text-align: right;
  text-decoration: none;
}
.header li {
  display: inline-flex;
  padding: 10px 10px;
  border-left: 1px solid rgb(214, 228, 206);
  font-weight: 300;
  text-decoration: none;

  font-size: auto;
  max-height: auto;
}
.header a {
  font-size: 20px;
  text-decoration: none;
}
.logo {
  float: left;
  height: 70px;
  padding: 15px;
}
.header ul {
  margin: 0;
  padding: 10px;
  list-style: none;
  overflow: hidden;
  text-align: left;
  text-decoration: none;
}
.header li {
  padding: 25px 25px;
  font-weight: 650;
  letter-spacing: 1px;
  font-size: large;
  text-decoration: none;
  color: rgb(137, 175, 111);
  border-left: 1px solid rgb(255, 255, 255);
}
</style>
