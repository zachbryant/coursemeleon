<template lang="pug">
  v-container(grid-list-xs fluid align-content-center fill-height pa-0 ma-0)
    v-layout(row align-center justify-space-between justify-text fill-width)
      v-flex#new(xs12 grow text-xs-center)
        v-menu
          template(v-slot:activator="{ on }")
            v-btn(flat icon color="primary" v-on="on")
              v-icon(v-show="show" @click="") fa-plus
          v-list
            v-list-tile(v-for="(item, optIndex) in componentOptions"
                      :key="optIndex"
                      @click="$emit('edit-sep-new', index, item.instanceName)")
              v-list-tile-title {{ item.title }}
</template>

<script>
export default {
  name: "edit-sep",
  props: {
    index: {
      type: Number,
      required: false,
      default: -1
    },
    show: Boolean
  },
  data() {
    return {
      type: "rich-content"
    };
  },
  computed: {
    componentOptions() {
      return this.$store.getters.componentEditMenuOptions;
    }
  }
};
</script>
