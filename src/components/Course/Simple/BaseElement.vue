<template lang="pug"></template>

<script>
const uuidv4 = require("uuid/v4");

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
      console.log("Remove " + index);
      if (index >= 0 && index < this.ddata.elements.length) {
        this.ddata.elements.splice(index, 1);
      }
    },
    insertElement(index, type) {
      console.log("Insert on " + index);
      if (index >= -1 && index < this.ddata.elements.length) {
        this.ddata.elements.splice(index + 1, 0, {
          instanceName: type,
          id: uuidv4()
        });
        console.log(this.elements);
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
