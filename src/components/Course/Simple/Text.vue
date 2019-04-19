<template lang="pug">
  div#textContainer()
    div(v-if="!isEditMode")
      h5(v-if="textType === 'h5'") {{ content }}
      h4(v-else-if="textType === 'h4'") {{ content }}
      h3(v-else-if="textType === 'h3'") {{ content }}
      h2(v-else-if="textType === 'h2'") {{ content }}
      h1(v-else-if="textType === 'h1'") {{ content }}
      p(v-else-if="textType === 'p'") {{ content }}
      span(v-else) {{ content }}
    div(v-else)
      v-textarea(v-if="textType === 'p' || textType === 'span'" v-model="content" auto-grow clearable box)
      v-text-field(v-else v-model="content" clearable box single-line)
</template>

<script>
import { BaseElement } from "@/components/componentImports";
export default {
  name: "text-item",
  extends: BaseElement,
  data() {
    return {};
  },
  methods: {},
  computed: {
    textType() {
      return this.ownData.data.type;
    },
    content: {
      get() {
        return this.$store.getters.courseTab.elements[this.indexInTab].data
          .text;
      },
      set(value) {
        this.$store.commit("updateCourseTabElement", {
          index: this.indexInTab,
          data: {
            text: value,
            type: this.textType
          }
        });
      }
    }
  }
};
</script>

<style lang="less"></style>
