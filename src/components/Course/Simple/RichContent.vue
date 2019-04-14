<template lang="pug">
    div()
      div(v-if="isEditMode2 || isEditMode")
        editor(v-model="content" 
              @load="onEditorLoad"
              @focus="onEditorFocus"
              @blur="onEditorBlur"
              @change="onEditorChange"
              @stateChange="onEditorStateChange")
      div(v-else)
        viewer(:value="content")
</template>

<script>
import { BaseElement } from "@/components/componentImports";
// WYSIWYG Viewer
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/github.css";
import Viewer from "@toast-ui/vue-editor/src/Viewer.vue";
// Editor
import "tui-editor/dist/tui-editor.css";
import "tui-editor/dist/tui-editor-contents.css";
import "codemirror/lib/codemirror.css";
import Editor from "@toast-ui/vue-editor/src/Editor.vue";

export default {
  name: "rich-item",
  extends: BaseElement,
  components: {
    Editor,
    Viewer
  },
  data() {
    return {
      isEditMode2: this.data.isEditMode2,
      content: this.data.content || "",
      style: this.data.style || ""
    };
  },
  methods: {
    onEditorLoad() {
      // implement your code
    },
    onEditorFocus() {
      // implement your code
    },
    onEditorBlur() {
      // implement your code
    },
    onEditorChange() {
      // implement your code
    },
    onEditorStateChange() {
      // implement your code
    }
  }
};
</script>

<style scoped lang="less">
div {
  display: inline;
}
</style>
