//load mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true,
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