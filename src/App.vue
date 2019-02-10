<template lang="pug">
  v-app#app(light)
    v-container(fluid style="padding-top: 0;")
      v-layout#nav(align-center justify-center)
        v-flex#banner(xs4)
          router-link(to='/')
            v-layout(align-center justify-center)
              img#navlogo(src='./assets/logo_lightgreen_300.svg' alt='Coursemeleon logo')
              span#navtitle Coursemeleon
        v-flex#searchbar(xs4)
          searchbar
        v-flex#navitems(xs4)
          router-link(to='/explore') Explore
          router-link(to='/about') About
          router-link(to='/help') Help
      router-view
</template>

<style lang="less">
  @import (css) url('https://fonts.googleapis.com/css?family=Nunito');
  @import (css) url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  @primary: #AED581;
  @secondary: #000000;
  @accent: #000000;
  @semibold: 600;

  body {
    margin-top: 0;
  }

  #app {
    font-family: "Nunito", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    //color: @primary;
  }

  #navitems a {
    margin-left: 2em;
  }
  
  #nav {
    padding: 30px;
    a {
      font-weight: @semibold;
      text-decoration: none;
      color: @primary;
      font-size: 1.5em;
      &.router-link-exact-active {
        //color: #42b983;
        font-weight: @semibold;
      }
    }
  }

  #navmain {

  }

  #navlogo {
    padding-bottom: 0.4em;
    margin-right: 1em;
    height: 3em;
  }

  #navtitle {
    font-size: 2em;
    font-weight: bold;
  }
</style>
