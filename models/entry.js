const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Entry', entrySchema);