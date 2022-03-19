const express = require('express')
const res = require('express/lib/response')
const app = express()
const path = require('path')
const mongoose = require('mongose')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.listen(3000, ()=>{
    console.log("APP is listening on port 3000")
})

app.get('/dog',(req, res)=> 
res.send("WOOF3"))

app.get('/cat', (req, res) => {
  res.send("MEOW2")
})
 