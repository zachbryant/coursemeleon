<template lang="pug">
    img(:style="style" :src="src" :alt="alt" :width="width" :height="height")
</template>

<script>
import { BaseElement } from "@/components/componentImports";

export default {
    name: "image-item",
    components: {},
    extends: BaseElement,
    data() {
        return {
            src: this.data.src || "",
            style: this.data.style || "",
            alt: this.data.href || "",
            width: this.data.width || "",
            height: this.data.height || ""
        }
    }
}
</script>

<style lang="less"></style>
