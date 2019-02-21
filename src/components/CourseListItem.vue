<template lang="pug">
	v-layout(row)
		v-icon(@click.stop="flipSaved" :color="getColor()") fa-star
		h3 {{ title }}
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
.justify-text {
  text-align: justify;
  text-justify: inter-word;
}
h3 {
  max-width: 90%;
  //&:extend(.justify-text);
  text-align: start;
}
.v-icon {
  margin-right: 10px;
}
</style>
