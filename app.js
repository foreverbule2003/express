
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

app.get('/', (req, res,next) =>{
    console.log(req.query)

    next();
},(req, res,next) =>{
    console.log(req.query)
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(req.body)
fs.appendFile('url.json', req.body,(err)=>{
    if(err) throw err;
    console.log('save url params')
})
})


app.get('/', (req, res) =>{
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.log(req.body)
fs.appendFile('url.json', req.body,(err)=>{
    if(err) throw err;
    console.log('save url params')
})
   
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))