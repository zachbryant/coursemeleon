<template lang="pug"></template>

<script>
export default {
  name: "base-item",
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    getAllData() {
      var allData = {
        type: this.type,
        data: () => {
          var dataList = [];
          this.elements.forEach(element => {
            dataList.push(element.getAllData());
          });
          return dataList;
        }
      };
      return allData;
    }
  },
  computed: {
    elements() {
      return this.data.elements || [];
    },
    type() {
      return this.data.type;
    },
    ownData() {
      return this.data;
    },
    isEditMode() {
      return this.$store.getters.isEditMode;
    }
  }
};
</script>

<style lang="less"></style>
