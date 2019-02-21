<template>
  <div id="Error">
    <h1>404</h1>
    <h2>Everything's broken, please go home.</h2>
    <router-link to="/course/" tag="button" replace>Back to Home</router-link>
  </div>
</template>

<style lang="less">
#Error {
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 70px;
  margin-top: 60px;
  height: 100%;
}

h2 {
  font-size: 40px;
  font-weight: normal;
}
button {
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  font-size: 40px;
  border: 0ch;
  margin: auto;
  display: block;
  color: #ffffff;
  background: #aed581;
  border-radius: 8px;
  font-weight: normal;
  margin-top: 60px;
  padding-left: 10px;
  padding-right: 10px;
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
  color: #ffffff;
}
</style>
