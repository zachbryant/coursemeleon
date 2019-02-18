<template>
  <div id="Error">
    <h1>404</h1>
    <h2>There is nothing here</h2>
    <router-link to='/' tag="button" replace>Back to Home</router-link>
    <button type="button" v-on:click="URL2">Log In</button>
  </div>
</template>

<script>

export default {
  name: 'Error',
  methods: {
   URL2: function(event){
     window.location.href='https://www.google.com';
   } 
  }
}

</script>

<style lang="scss">
#Error {
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 70px;
  background: #AED581;
  color:#FFFFFF;
  margin-top: 60px;
}

h2 {
  font-size: 40px;
  font-weight: normal;
}
button{
  font-family: 'Nunito', Helvetica, Arial, sans-serif;
  font-size: 40px;
  border: 0ch;
  margin:auto;
  display: block	;
  color:#AED581;
  background: #FFFFFF;
  border-radius: 8px;
  font-weight: normal;
  margin-top: 60px;
}

button:hover {
  background: #f7f7f7;
  color: 1px solid #AED581;
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