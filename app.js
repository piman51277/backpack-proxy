const express = require('express');
const app = express();
const axios = require('axios');

const queue = []

//Checks to see if config vars exist;
if (!process.env.BPAPIKEY) throw ('Missing Backpack API Key.')
if (!process.env.APIKEY) throw ('Missing API Key.')

app.get('/forward', (req, res) => {

    //Checks to see if the API key is valid.
    if (req.query.apikey != process.env.APIKEY) {
        res.status(403).send(JSON.stringify({ 'error': 'invalid api key' }))
    }

    queue.push(()=>{
    //sets API key in the request.
    let cdata ={
        ...JSON.parse(req.query.params),
        ...{'key':process.env.BPAPIKEY}
}
    //sends request
    axios.get('https://backpack.tf/api/classifieds/search/v1', {
        'params': cdata
    }).then((rsp) => {
        res.status(200).send(JSON.stringify(rsp.data));
    }).catch((err) => {
        console.log(`ERROR ${err}`)
        res.status(400).send(JSON.stringify({ 'error': err.message }))
    })
    })
})

app.listen(process.env.PORT || 8000, () => {})

setInterval(()=>{
    if(queue[0] != undefined){
        queue[0]();
        queue.shift();
    }
},1010)