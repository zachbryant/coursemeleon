<template lang="pug">
    div
        template(v-for="(comp, index) in elements")
            component(:data="comp" :is="comp.instanceName" :key="comp.id")
</template>

<script>
import { BaseElement, TextItem, TableItem, ListItem, ImageItem, LinkItem, InputItem, DocumentItem } from "@/components/componentImports";

export default {
    name: "list-item",
    components: { 
        TextItem, 
        TableItem, 
        ListItem, 
        ImageItem, 
        LinkItem, 
        InputItem, 
        DocumentItem 
    },
    extends: BaseElement,
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style lang="less">
div {
    display: inline;
}
</style>
