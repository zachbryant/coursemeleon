<template lang="pug">
  v-container(grid-list-xs fluid align-content-center fill-height pa-0 ma-0)
    v-layout(row align-center justify-center justify-text fill-width)
      v-flex#sidebar(column align-start justify-start xs3 lg2 fill-height)
        //-Mitch's work
        h3 Sidebar
      v-flex#content(column align-start justify-start xs9 grow fill-height)
        h1 {{ getTitle() }}
        h3 {{ getActiveTab() }}
        list-item(:data="item.elements")
</template>

<script>
export default {
  name: "coursePage",
  data() {
    return {
      item: {
        title: "Dummy Title",
        tabs: ["Dummy Tab 1", "Dummy Tab 2", "Dummy Tab 3"],
        elements: [{}]
      },
      activeTab: 0
    };
  },
  methods: {
    getTitle() {
      return this.item.title ? this.item.title : "";
    },
    getActiveTab() {
      return this.item.tabs ? this.item.tabs[this.activeTab] : "";
    }
  }
};
</script>

<style lang="less" scoped></style>
