<template>
  <div class="about">
    <img alt="Coursemeleon logo" src="../assets/logo_lightgreen_300.svg" />
    <AboutPage msg="About Coursemeleon" />
  </div>
</template>

<script>
// @ is an alias to /src
import AboutPage from "@/components/AboutPage.vue";

export default {
  name: "about",
  components: {
    AboutPage
  }
};
</script>
