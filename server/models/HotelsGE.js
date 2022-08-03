const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
  }
}, {
  timestamps: true
});

module.exports = model('HotelsGE', schema);
