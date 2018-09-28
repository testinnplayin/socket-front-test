'use strict'

export default {
    methods : {
        fetchTsvHistories : function (tsvId) {
            const endpnt = `http://localhost:3000/tsvs/${tsvId}`
            const reqOptions = { method : 'GET', mode : 'cors' }
            const getReq = new Request(endpnt, reqOptions)
            console.log('AJAX t0 ', Date.now())
            fetch(getReq)
                .then(response => {
                    console.log('AJAX t1 ', Date.now())
                    if (!response.ok) throw new Error(response.statusText)
                    return response
                })
                .then(res => res.json())
                .then(data => {
                    console.log('data obtained from successful fetch ', data)
                })
                .catch(err => console.error(err))
        }
    }
}