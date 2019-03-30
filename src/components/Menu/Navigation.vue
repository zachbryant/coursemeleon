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
          @change="queryCourses")
        v-divider
        v-expand-transition
          v-list(v-if="model" class="red lighten-3")
            v-list-tile(v-for="(field, i) in fields" :key="i")
              v-list-tile-content
                v-list-tile-title(v-text="field.value")
                v-list-tile-sub-title(v-text="field.key")
      v-flex(xs2)
        v-btn(flat @click.stop="toggleHamburger")
          v-icon fa-bars
</template>

<script>
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
    },
    toggleHamburger() {
      this.$emit("toggleHamburgerEvent");
    }
  }
};
</script>

<style scoped lang="less">
@import (reference) "../../App.less";

#toolbar {
  background-color: @primary;
}
#title {
  color: white;
  display: inline;
  padding-left: 10px;
}
.header {
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.11);
  width: 100%;
}
.header h4 {
  color: white;
  text-transform: lowercase;
}

.logo {
  margin-bottom: -25px;
  padding-bottom: 20px;
  height: calc(35px + 3vh);
}
</style>
