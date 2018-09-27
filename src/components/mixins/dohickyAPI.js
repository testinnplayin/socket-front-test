'use strict'

export default {
    data: function () {
        return {
            dBackMsg : null
        }
    },
    methods : {
        fetchDohickies : function () {
            const endpnt = 'http://localhost:3000/dohickies'
            const reqOptions = { method : 'GET', mode : 'cors' }
            const getReq = new Request(endpnt, reqOptions)

            fetch(getReq)
                .then(response => {
                    if (!response.ok) throw new Error(response.statusText)

                    return response
                })
                .then(res => res.json())
                .then(data => {
                    this.dBackMsg = 'Successful retrieval of dohickies'
                    this.dohickies = data.dohickies
                })
                .catch(err => {
                    console.error(`Error fetching dohickies: ${err}`)
                    this.dBackMsg = `Error fetching dohickies: ${err}`
                })
        }
    }
}