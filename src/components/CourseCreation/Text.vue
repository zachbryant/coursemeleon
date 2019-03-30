<template lang="pug">
    div()
        div(v-if="!isEditMode2")
            h5(v-if="type === 'h5'" :style="style") {{ text }}
            h4(v-else-if="type === 'h4'" :style="style") {{ text }}
            h3(v-else-if="type === 'h3'" :style="style") {{ text }}
            h2(v-else-if="type === 'h2'" :style="style") {{ text }}
            h1(v-else-if="type === 'h1'" :style="style") {{ text }}
            p(v-else-if="type === 'p'" :style="style") {{ text }}
            span(v-else :style="style") {{ text }}
        div(v-else)
            v-textarea(v-if="type === 'p' || type === 'span'" v-model="text" auto-grow clearable box)
            v-text-field(v-else v-model="text" clearable box)
</template>

<script>
import { BaseElement } from "@/components/componentImports";

export default {
    name: "text-item",
    extends: BaseElement,
    data() {
        return {
            isEditMode2: this.data.isEditMode2,
            text: this.data.text || "",
            style: this.data.style || ""
        }
    },
    methods: {
    }
}
</script>

<style scoped lang="less">
div {
    display: inline;
    width: 100%;
}
</style>

