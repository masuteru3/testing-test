<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/* css reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0;
  border: 0;
  margin: 0;
  padding: 0;
  background: none transparent;
  vertical-align: middle;
  font-size: inherit;
  color: inherit;
  box-sizing: content-box;
}
</style>
