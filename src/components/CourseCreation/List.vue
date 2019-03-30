<template lang="pug">
    v-layout(column align-start justify-start)
        template(v-for="(comp, index) in elements")
            component(:data="comp" :is="comp.instanceName" :key="comp.id")
</template>

<script>
import { BaseElement } from "@/components/componentImports";

export default {
    name: "list-item",
    components: { 
        TextItem: () => import('./Text.vue'), 
        TableItem: () => import('./Table.vue'), 
        ListItem: () => import('./List.vue'), 
        ImageItem: () => import('./Image.vue'), 
        LinkItem: () => import('./Link.vue'), 
        InputItem: () => import('./Input.vue'), 
        DocumentItem: () => import('./Document.vue')
    },
    extends: BaseElement,
    data() {
        return {
        }
    },
    methods: {
    },
    /*beforeCreate: function(){
        this.$options.components.TestComp = require("./TestComp.vue").default;
    }*/
}
</script>

<style scoped lang="less">
</style>
