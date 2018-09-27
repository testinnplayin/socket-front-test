'use strict';

export default {
    data : function () {
        return {
            tBackMsg : null
        }
    },
    methods : {
        fetchThinggies : function () {
            const endpnt = 'http://localhost:3000/thingamabobs'
            const reqOpts = { method : 'GET', mode : 'cors' }
            const getReq = new Request(endpnt, reqOpts)
    
            fetch(getReq)
                .then(response => {
                    console.log('response ', response)
                    if (!response.ok) throw new Error(response.statusTxt)
                    console.log('get all thingamabobs request ', response)
                    return response
                })
                .then(res => res.json())
                .then(data => {
                    this.thingamabobs = data.thingamabobs
                    this.tBackMsg = 'Successful retrieval of thingamabobs'
                })
                .catch(err => this.tBackMsg = `Error retrieving thingamabobs: ${err}`)
        }
    }
}