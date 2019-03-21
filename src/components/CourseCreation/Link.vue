<template lang="pug">
    a(:style="style" :target="target" :href="href" :download="download")
        list-item(:data="listItems")
</template>

<script>
import { BaseElement, ListItem } from "@/components/componentImports";

export default {
    name: "link-item",
    components: {
        ListItem
    },
    extends: BaseElement,
    data() {
        return {
            text: this.data.data || "",
            style: this.data.style || "",
            href: this.data.href || "",
            target: this.data.target || "_blank",
            download: this.data.download || false,
            listItems: this.data.data
        }
    }
}
</script>

<style lang="less"></style>
