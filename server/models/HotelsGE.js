const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rate: {
    type: Number,
  }
}, {
  timestamps: true
});

module.exports = model('HotelsGE', schema);
