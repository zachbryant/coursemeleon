<template lang="pug">
	v-layout(row)
		v-icon(@click.stop="flipSaved" :color="getColor()") fa-star
		h5 {{ title }}
</template>

<script>
export default {
  name: "courselistitem",
  props: {
    title: String,
    id: String,
    saved: {
      type: Boolean,
      required: false,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      isSaved: JSON.parse(this.saved)
    };
  },
  methods: {
    getColor() {
      return this.isSaved ? "primary" : "grey lighten-3";
    },
    flipSaved() {
      this.isSaved = !this.isSaved;
      //save this change
    }
  }
};
</script>

<style scoped lang="less">
h5 {
  max-width: 90%;
  text-align: start;
}
.v-icon {
  margin-right: 10px;
  min-width: 10%;
}
</style>
