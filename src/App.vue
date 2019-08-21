<template>
  <div id="app">
    <div class="wrapper">

    </div>
    <img src="./assets/CIC-Rocket.png">
    <h1>CLICKS IN CONTEXT GOOGLE ADS HEALTH CHECK TOOL</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  background: #FBFBFB;
}
#app {
  font-family: 'Josefin Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 70px;
}
#app img {
  width: 140px
}

#app h1 {
  padding: 0;
  margin: 35px 0 60px;
}

.wrapper {
  width: 480px
}
</style>
