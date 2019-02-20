<template lang="pug">
  v-layout
    v-flex
      v-dialog(width="40%")
        a(class="underline" slot="activator") Instructors
        v-card
          v-card-title This is a login dialog
</template>

<script>
export default {
  name: "logindialog",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less">
.v-card {
  height: 100%;
}
</style>
