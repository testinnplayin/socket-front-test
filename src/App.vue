<template>
  <div id="app">
    <img src="./assets/logo.png">
    <nav>
      <li><router-link to="/thingamabobs">List of Thingamabobs</router-link></li>
    </nav>
    <h1>{{ thinggyMsg.awesome_field }}</h1>
    <span class="time-spans">AJAX start time: {{aT0}}</span>
    <span class="time-spans">AJAX stop time: {{aT1}}</span>
    <button @click="handleAJAXFetch" type="button">AJAX Fetch TSV histories</button>
    <span class="time-spans">Socket start time: {{sT0}}</span>
    <span class="time-spans">Socket stop time: {{sT1}}</span>
    <button @click="handleSockFetch" type="button">Socket Fetch TSV histories</button>
  </div>
</template>

<!-- <test-area
      @handleSubmit="handleSubmit"
      :thingamabob="thingamabob"></test-area>
      <router-view
        @handleDelete="handleDelete"
        :dohicky-msg="dohickyMsg"
        :thinggy-msg="thinggyMsg"
        :u-doh="uDoh"></router-view> -->

<script>
import io from 'socket.io-client'
// import TestArea from './components/TestArea'
import tsvHistoryAPI from './components/mixins/tsvHistoryAPI'

export default {
  name: 'app',
  data () {
    return {
      aT0 : 0,
      aT1 : 0,
      delI : null,
      dohickyMsg : null,
      error : null,
      thingamabob: {
        awesome_field: null
      },
      thinggyMsg: 'Say something! Anything!',
      socket: io('localhost:3000'),
      sT0 : 0,
      sT1 : 0,
      uDoh : null
    }
  },
  components: {
    // TestArea
  },
  methods: {
    handleAJAXFetch: function () {
      const tsvId = "5b6aee85a7744b1783cadc63";
      this.fetchTsvHistories(tsvId)
    },
    handleDelete: function (tId, i) {
      console.log('handleDelete triggered ', tId, i)
      this.delI = i
      this.socket.emit('DELETE_THINGGY', {_id : tId })
    },
    handleSockFetch : function () {
      const tsvId = "5b6aee85a7744b1783cadc63";
      this.sT0 = Date.now()
      console.log('socket t0 ', this.sT0)
      this.socket.emit('GET_TSV_HISTORIES', tsvId)
    },
    handleSubmit: function () {
      console.log('handleSubmit triggered')
      this.socket.emit('CREATE_THINGGY', this.thingamabob)
      this.thingamabob.awesome_field = null
    }
  },
  mixins : [tsvHistoryAPI],
  mounted: function () {
    this.socket.on('TSV_HISTS_SUCCESS', response => {
      this.sT1 = Date.now()
      console.log('socket t1 ', this.sT1)
      console.log('TSV history success ', response)
    })

    this.socket.on('TSV_HISTS_ERROR', err => {
      console.error('TSV history error ', err)
    })
    // this.socket.on('CREATION_SUCCESS', response => {
    //   console.log('response ', response)
    //   this.thinggyMsg = response
    // })

    // this.socket.on('CREATION_ERROR', err => {
    //   console.error('error ', err)
    //   this.error = err
    //   this.thinggyMsg = { awesome_field : 'There has been an error' }
    // })

    // this.socket.on('DELETION_SUCCESS', response => {
    //   console.log('response ', response)
    //   this.thinggyMsg = { _id : response._id, index : this.delI }
    // })

    // this.socket.on('DELETION_ERROR', err => {
    //   console.error('error ', err)
    //   this.thinggyMsg = { awesome_field : `There has been an error : ${err}` };
    // });

    // this.socket.on('D_CREATE_SUCCESS', response => {
    //   console.log('dohicky response ', response)
    //   this.dohickyMsg = response[0]; // NOTE: we're doing this on a find on back-end, which always results in an array
    // })

    // this.socket.on('D_CREATE_ERROR', err => {
    //   console.error('dohicky error ', err)
    //   this.dohickyMsg = `Dohicky error : ${err}`
    // })

    // this.socket.on('D_UPDATE_SUCCESS', response => {
    //   console.log('dohicky updated ', response)
    //   this.uDoh = response
    // })
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

.time-spans {
  display: block;
  font-weight: bold;
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
