<template lang="pug">
    div#edit(inline)
      editor(v-if="isEditMode && !isPreviewMode"
            v-model="content"
            :options="defaultOptions"
            height="550px"
            @load="onEditorLoad"
            @focus="onEditorFocus"
            @blur="onEditorBlur"
            @change="onEditorChange"
            @stateChange="onEditorStateChange")
      viewer#view(v-else :value="content" :exts="defaultOptions.exts")
</template>

<script>
import { BaseElement } from "@/components/componentImports";
// WYSIWYG Viewer
import "tui-editor/dist/tui-editor-contents.css";
import "highlight.js/styles/github.css";
import Viewer from "@toast-ui/vue-editor/src/Viewer.vue";
// Editor
import "tui-color-picker/dist/tui-color-picker.css";
import "tui-editor/dist/tui-editor-extChart.js";
import "tui-editor/dist/tui-editor-extUML.js";
import "tui-editor/dist/tui-editor-extTable.js";
import "tui-editor/dist/tui-editor-extColorSyntax.js";
import "tui-editor/dist/tui-editor.css";
import "codemirror/lib/codemirror.css";
import Editor from "@toast-ui/vue-editor/src/Editor.vue";

export default {
  name: "rich-item",
  extends: BaseElement,
  components: {
    editor: Editor,
    viewer: Viewer
  },
  data() {
    return {
      content: this.data.content || "",
      style: this.data.style || "",
      defaultOptions: {
        language: "en_US",
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: true,
        hideModeSwitch: false,
        exts: ["colorSyntax", "table", "uml", "chart"],
        toolbarItems: [
          "heading",
          "bold",
          "italic",
          "strike",
          "divider",
          "hr",
          "quote",
          "divider",
          "ul",
          "ol",
          "task",
          "indent",
          "outdent",
          "divider",
          "table",
          "image",
          "link",
          "divider",
          "code",
          "codeblock"
        ]
      }
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
#edit {
  width: 100%;
}
</style>
