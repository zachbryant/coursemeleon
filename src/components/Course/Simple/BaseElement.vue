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
  data() {
    return {
      ddata: this.data
    };
  },
  methods: {
    getAllData() {
      var allData = {
        ...this.ddata,
        data: () => {
          var dataList = [];
          this.elements.forEach(element => {
            dataList.push(element.getAllData());
          });
          return dataList;
        }
      };
      return allData;
    },
    removeElement(index) {
      if (index >= 0 && index < this.ddata.elements.length) {
        this.$delete(this.ddata.elements, index);
      }
    }
  },
  computed: {
    elements() {
      return this.ddata.elements;
    },
    type() {
      return this.ddata.instanceName;
    },
    ownData() {
      return this.ddata;
    },
    isEditMode() {
      return this.$store.getters.isEditMode;
    },
    isPreviewMode() {
      return this.ddata.preview;
    }
  }
};
</script>

<style lang="less"></style>
