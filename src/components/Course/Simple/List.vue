<template lang="pug">
  v-layout(column align-start justify-center fill-width)
    template(v-if="isEditMode")
      v-layout(row fill-width justify-start)
        v-flex(xs1)
        v-flex(xs11)
          edit-sep(:index="-1"
                v-on:edit-sep-new="editSepNew"
                :show="canShowInsert(-1)")
      draggable(:list="data.elements" class="fill-width")
        transition-group(class="fill-width")
          v-layout(row v-for="(comp, index) in elements" 
                  :key="comp.id" 
                  fill-width 
                  justify-start
                  @mouseover="hoverIndex(index)"
                  @mouseleave="hoverIndex(-1)")
            v-flex(xs1 width="10px")
              edit-item-menu(:index="index" 
                            :max="elements.length"
                            v-on:edit-sep-del="editSepDel"
                            v-show="canShowMenu(index)")
            v-flex(xs11 grow)
              v-layout(column fill-width)
                component(:data="comp" 
                          :is="comp.instanceName")
                edit-sep(:index="index"
                        v-on:edit-sep-new="editSepNew"
                        :show="canShowInsert(index)")
    template(v-else v-for="(comp, index) in elements")
      component(:data="comp" 
                :is="comp.instanceName" 
                :key="comp.id")
</template>

<script>
import { BaseElement } from "@/components/componentImports";
import draggable from "vuedraggable";

export default {
  name: "list-item",
  components: {
    "rich-content": () => import("./RichContent.vue"),
    "list-item": () => import("./List.vue"),
    "document-item": () => import("./Document.vue"),
    "edit-sep": () => import("../Compound/EditSeparator.vue"),
    "edit-item-menu": () => import("../Compound/EditItemMenu.vue"),
    draggable
  },
  extends: BaseElement,
  data() {
    return {
      showMenu: -1,
      showInsert: 0
    };
  },
  methods: {
    editSepNew: function(index, type) {
      this.insertElement(index, type);
    },
    editSepDel: function(index) {
      this.removeElement(index);
    },
    hoverIndex: function(index) {
      this.showMenu = index;
      this.showInsert = index;
    },
    canShowMenu: function(index) {
      return this.showMenu == index;
    },
    canShowInsert: function(index) {
      return Math.abs(this.showInsert - index) <= 1;
    }
  }
};
</script>

<style scoped lang="less">
.fill-width {
  width: 100%;
}
</style>
