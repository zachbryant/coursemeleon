<template lang="pug">
	v-layout(row align-center justify-start fill-height)
		v-icon(@click.stop="flipSaved" :color="getColor()") fa-star
		p {{ title }}
</template>

<script>
export default {
  name: "course-list-item",
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
p {
  max-width: 90%;
  text-align: start;
  margin: 0;
}
.v-icon {
  margin-right: 10px;
  min-width: 10%;
}
</style>
