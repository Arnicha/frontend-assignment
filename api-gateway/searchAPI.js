const express = require('express')
const app = express()
const axios = require('axios')

var dataList = []

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

axios.get('http://localhost:9000/trips').then(res => {
    let data = res.data
    dataList = data
})

app.get('/api/trips', (req, res) => {
    let rearchResult = []
    let queryParameter = req.query.keyword
    var searchValue = queryParameter;
    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i]['title'].includes(searchValue)) {
            rearchResult.push(dataList[i]);
        } else if (dataList[i]['description'].includes(searchValue)) {
            rearchResult.push(dataList[i]);
        } else if (dataList[i]['tags'].includes(searchValue)) {
            rearchResult.push(dataList[i]);
        }
    }
    res.send(rearchResult)
})

app.get('/api/trips/tags', (req, res) => {
    let tagsList = []
    for (var i = 0; i < dataList.length; i++) {
        dataList[i]['tags'].forEach((c) => {
            if (!tagsList.includes(c)) {
                tagsList.push(c);
            }
        })
    }
    res.send(tagsList)
})

app.listen(8000, () => {
    console.log('Server started !!!')
})