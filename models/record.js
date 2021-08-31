//load mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create Schema
const recordSchema = new Schema({
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
})

//output model
module.exports = mongoose.model('Record', recordSchema)