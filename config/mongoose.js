//Require mongoose
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

//Setting database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error')
})
db.once('open', () => {
  console.log('Mongodb is connected!')
})

module.exports = db