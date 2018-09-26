<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <test-area
      @handleSubmit="handleSubmit"
      :thingamabob="thingamabob"></test-area>
  </div>
</template>

<script>
import io from 'socket.io-client'
import TestArea from './components/TestArea'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      thingamabob: {
        awesomeField: null
      },
      thinggies: [],
      socket: io('localhost:3000')
    }
  },
  components: {
    TestArea
  },
  methods: {
    handleSubmit: function () {
      console.log('handleSubmit triggered')
    }
  },
  mounted: function () {
    this.socket.on('CREATION', response => {
      console.log('response ', response)
      this.thinggies.push(response)
    });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
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
