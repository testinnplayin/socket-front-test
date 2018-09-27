<template>
  <div id="app">
    <img src="./assets/logo.png">
    <nav>
      <li><router-link to="/thingamabobs">List of Thingamabobs</router-link></li>
    </nav>
    <h1>{{ thinggyMsg }}</h1>
    <test-area
      @handleSubmit="handleSubmit"
      :thingamabob="thingamabob"></test-area>
      <router-view></router-view>
  </div>
</template>

<script>
import io from 'socket.io-client'
import TestArea from './components/TestArea'
export default {
  name: 'app',
  data () {
    return {
      error : null,
      thingamabob: {
        awesome_field: null
      },
      thinggyMsg: 'Say something! Anything!',
      socket: io('localhost:3000')
    }
  },
  components: {
    TestArea
  },
  methods: {
    handleSubmit: function () {
      console.log('handleSubmit triggered')
      this.socket.emit('CREATE_THINGGY', this.thingamabob)
      this.thingamabob.awesome_field = null
    }
  },
  mounted: function () {
    this.socket.on('CREATION_SUCCESS', response => {
      console.log('response ', response)
      this.thinggyMsg = response.awesome_field
    })

    this.socket.on('CREATION_ERROR', err => {
      console.log('error ', err)
      this.error = err
      this.thinggyMsg = 'There has been an error'
    })
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
