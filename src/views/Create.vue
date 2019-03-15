<template>
  <div class="create">
    <form action="save" method="POST">
        <froala id="myEditor" :tag="'textarea'" :config="config" v-model="model"></froala>
        <button>Submit</button>
    </form>
  </div>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min';

export default {
  name: 'create',
  el: '#myEditor',
  data () {
    return {
      config: {
        placeholder: "Come spend your money here",
        charCounterCount: true,
        events: {
          'froalaEditor.initialized': function () {
            console.log('initialized')
          }
        }
      },
      model: 'Edit Your Content Here!'
    }
  }
}
</script>

<style>
#myEditor {
  min-height: 200px;
  padding: 0px 8px 20px 8px;
  margin-left: 40px;
  border: 1px solid #ccc;
}
</style>
