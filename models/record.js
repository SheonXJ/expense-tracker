//load mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create Schema
const recordSchema = new Schema({
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

//output model
module.exports = mongoose.model('Record', recordSchema)