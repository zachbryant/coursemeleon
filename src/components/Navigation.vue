<template>
  <div>
    <header class="header">
      <h4>
      <div class="title">
        <ul>
          <img class="logo" alt="logo" src="../assets/logo.png" />
          <li><a>Coursemeleon</a></li>
        </ul>
      </div>
      <ul> 
        <li><a><router-link to="/">Home</router-link></a></li>
        <li><a><router-link to="/about">About</router-link></a></li>
        <li><a><router-link to="/help">Help</router-link></a></li>
      </ul>
      </h4>
    </header>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    msg: String
  }
};
</script>


<style scoped lang="less">
.header {
  background-color: #fff;
  box-shadow: 1px 1px 4px 0 rgba(0,0,0,.1);
  /*position: fixed;*/
  width: 100%;
}

.header .menu {
  clear: both;
  max-height: 0;
  transition: max-height .2s ease-out;
}

.header ul {
  margin: 0;
  padding: 10px;
  list-style: none;
  overflow: hidden;
  text-align: right;
  text-decoration: none;
}

.header li {
  display: inline-flex;
  padding: 20px 20px;
  border-left: 1px solid rgb(214, 228, 206);
  font-family: 'Roboto', sans-serif;
  font-weight:300;
  text-decoration: none;
}

.header a {
  font-size: 20px;
  color: rgb(137, 175, 111);
  text-decoration: none;
}

.logo {
  float: left;
  height:45px;
  width:45px;
  padding: 15px;
}

.title {
  float:left;

}

.title ul {
  margin: 0;
  padding: 10px;
  list-style: none;
  overflow: hidden;
  text-align: left;
  text-decoration: none;
}

.title li {
  padding: 20px 20px;
  font-family: 'Roboto', sans-serif;
  font-weight:700;
  text-decoration: none;
}

</style>