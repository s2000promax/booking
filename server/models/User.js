const {Schema, model} = require('mongoose');

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  name: {type: String},
  password: {type: String},
  image: String,
  location: { type: Schema.Types.ObjectId, ref: 'CitiesGE' },
  type: {type: String, enum: ['client', 'business']}
}, {
  timestamps: true
})

module.exports = model('User', schema);
