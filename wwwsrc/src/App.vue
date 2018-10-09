<template>
  <div id="app">
    <navbar></navbar>
    <browse-vaults></browse-vaults>
    <router-view />
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import BrowseVaults from './views/BrowseVaults.vue'

  export default {
    name: 'App',
    components: {
      Navbar,
      BrowseVaults
    }
  }
</script>

<style>
  body,
html {
    height: 100%;
    margin: 0;
    font: 400 15px/1.8 "Lato", sans-serif;
    color: #777;
}
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>