const express = require('express')
const mongoose = require('mongoose')
const Record = require('./models/record')//load Record model

const port = 3000
const app = express()

//------------ database ------------//
mongoose.connect('mongodb://localhost/Expense', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error')
})

db.once('open', () => {
  console.log('Mongodb is connected!')
})
//------------ database ------------//

//Setting Routes
app.get('/', (req, res) => {
  res.send('test!')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})