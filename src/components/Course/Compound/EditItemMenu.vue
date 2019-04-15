<template lang="pug">
  v-container(grid-list-xs fluid align-center fill-height pa-0 ma-0)
    v-layout(column 
            justify-space-around 
            align-end)
      v-flex#move(xs4)
        v-btn(flat icon color="primary")
          v-icon fa-grip-vertical
      v-flex#delete(xs4)
        v-btn(v-show="index >= 0" flat icon color="error")
          v-icon(@click="$emit('edit-sep-del', index)") fa-times
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
    max: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      type: "rich-content"
    };
  }
};
</script>
