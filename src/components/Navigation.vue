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
              :items="items"
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
            <v-expand-transition>
              <v-list v-if="model" class="red lighten-3">
                <v-list-tile v-for="(field, i) in fields" :key="i">
                  <v-list-tile-content>
                    <v-list-tile-title v-text="field.value"></v-list-tile-title>
                    <v-list-tile-sub-title v-text="field.key"></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-expand-transition>
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
          <v-btn to="/courselist" flat>
            <h4>Courses</h4>
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
