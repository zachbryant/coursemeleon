<template>
  <div class="About">
    <h1>{{ msg }}</h1>
    <p>
      Coursemeleon was created to offer an efficient and user-friendly way for professors to create course webpages. By providing a web application that takes course information input by a professor and organizes it intuitively on a webpage, professors will be able to follow a standard design without investing more time and technical knowledge. The application’s customizable features gives professors flexibility with the information they choose to publish. Students, on the other hand, will be able to access information like course calendars, announcements, and grades through a single service.
    </p>
    <h3>The Development Team</h3>
    <ul>
      <li>
        <a
          href="https://www.google.com"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
          <a href="https://www.linkedin.com/in/mitchelldemerly">
            <img src="../assets/MitchellDemerly.jpg">
          </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa"
          target="_blank"
          rel="noopener"
          >pwa</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest"
          target="_blank"
          rel="noopener"
          >unit-jest</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
