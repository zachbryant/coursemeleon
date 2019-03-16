<template>
  <div>
    <div class="header">
      <v-toolbar flat style="background-color:rgb(169, 204, 146);">
        <router-link to="/"
          ><img
            class="logo"
            style="padding-bottom:22px;"
            alt="logo"
            src="@/assets/logos/logo.svg"
        /></router-link>
        <v-toolbar-title
          ><router-link to="/"
            ><h3>Coursemeleon</h3></router-link
          ></v-toolbar-title
        >
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
                    <v-list-tile-sub-title
                      v-text="field.key"
                    ></v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-expand-transition>
          </div>
          <v-btn to="/explore" flat><h4>Explore</h4></v-btn>
          <v-btn to="/about" flat><h4>About</h4></v-btn>
          <v-btn to="/help" flat><h4>Help</h4></v-btn>
          <v-btn to="/coursepage" flat><h4>My page</h4></v-btn>
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
.header {
  /*background-color: #fff;*/
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.11);
  /*position: fixed;
  z-index: 100;*/
  width: 100%;
  max-height: 90px;
}

.header h4 {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 20px;
  /*color: rgb(137, 175, 111);*/
  color: white;
  text-transform: lowercase;
}

.header h3 {
  color: white;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 20px;
}

.header h4:hover {
  color: rgb(8, 48, 13);
}

.header #searchBox {
  padding-right: 13px;
  color: "#fff";
}

.buttons {
  float: right;
}

.header .menu {
  clear: both;
  max-height: 0;
  transition: max-height 0.2s ease-out;
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
  /*padding: 15px 15px;*/
  padding: 10px 10px;
  border-left: 1px solid rgb(214, 228, 206);
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  text-decoration: none;
  font-size: auto;
  max-height: auto;
}

.header a {
  font-size: 20px;
  color: rgb(137, 175, 111);
  text-decoration: none;
}

header a:hover {
  color: rgb(12, 68, 19);
}

.logo {
  float: left;
  height: 70px;
  width: 60px;
  padding: 15px;
}

.title {
  float: left;
}

.header .title ul {
  margin: 0;
  padding: 10px;
  list-style: none;
  overflow: hidden;
  text-align: left;
  text-decoration: none;
}

.header .title li {
  padding: 25px 25px;
  font-family: "Roboto", sans-serif;
  font-weight: 650;
  letter-spacing: 1px;
  font-size: large;
  text-decoration: none;
  color: rgb(137, 175, 111);
  border-left: 1px solid rgb(255, 255, 255);
}
</style>
