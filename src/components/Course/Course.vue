<template lang="pug">
  v-layout(column)
	  v-layout#sidebar(xs3)
      //-Mitch's work
	  v-layout#content(xs9)
      h1 {{ item.title }}
      h3 {{ item.tabs[activeTab] }}
      list-item(:data="item.elements")

</template>

<script>
export default {
  name: "coursePage",
  data() {
    return {
      item: {},
      activeTab: 0
    };
  }
};
</script>

<style lang="less" scoped>
</style>