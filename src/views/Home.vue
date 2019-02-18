<template lang="pug">
  v-container(fluid fill-height)
    v-layout(justify-space-between row fill-height)
      v-flex(xs4)
        v-card(color="light-green lighten-3") hi
      v-spacer
      v-flex(xs8)
        v-card(color="light-green lighten-3") hi
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>

<style lang="less">
.v-card {
  height: 100%;
  margin-left: 0.4vw;
  margin-right: 0.4vw;
}
</style>
