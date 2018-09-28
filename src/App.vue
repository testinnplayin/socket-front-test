<template>
  <div id="app">
    <img src="./assets/logo.png">
    <nav>
      <li><router-link to="/thingamabobs">List of Thingamabobs</router-link></li>
    </nav>
    <h1>{{ thinggyMsg.awesome_field }}</h1>
    <test-area
      @handleSubmit="handleSubmit"
      :thingamabob="thingamabob"></test-area>
      <router-view
        @handleDelete="handleDelete"
        :dohicky-msg="dohickyMsg"
        :thinggy-msg="thinggyMsg"
        :u-doh="uDoh"></router-view>
  </div>
</template>

<script>
import io from 'socket.io-client'
import TestArea from './components/TestArea'
export default {
  name: 'app',
  data () {
    return {
      delI : null,
      dohickyMsg : null,
      error : null,
      thingamabob: {
        awesome_field: null
      },
      thinggyMsg: 'Say something! Anything!',
      socket: io('localhost:3000'),
      uDoh : null
    }
  },
  components: {
    TestArea
  },
  methods: {
    handleDelete: function (tId, i) {
      console.log('handleDelete triggered ', tId, i)
      this.delI = i
      this.socket.emit('DELETE_THINGGY', {_id : tId })
    },
    handleSubmit: function () {
      console.log('handleSubmit triggered')
      this.socket.emit('CREATE_THINGGY', this.thingamabob)
      this.thingamabob.awesome_field = null
    }
  },
  mounted: function () {
    this.socket.on('CREATION_SUCCESS', response => {
      console.log('response ', response)
      this.thinggyMsg = response
    })

    this.socket.on('CREATION_ERROR', err => {
      console.error('error ', err)
      this.error = err
      this.thinggyMsg = { awesome_field : 'There has been an error' }
    })

    this.socket.on('DELETION_SUCCESS', response => {
      console.log('response ', response)
      this.thinggyMsg = { _id : response._id, index : this.delI }
    })

    this.socket.on('DELETION_ERROR', err => {
      console.error('error ', err)
      this.thinggyMsg = { awesome_field : `There has been an error : ${err}` };
    });

    this.socket.on('D_CREATE_SUCCESS', response => {
      console.log('dohicky response ', response)
      this.dohickyMsg = response[0]; // NOTE: we're doing this on a find on back-end, which always results in an array
    })

    this.socket.on('D_CREATE_ERROR', err => {
      console.error('dohicky error ', err)
      this.dohickyMsg = `Dohicky error : ${err}`
    })

    this.socket.on('D_UPDATE_SUCCESS', response => {
      console.log('dohicky updated ', response)
      this.uDoh = response
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
