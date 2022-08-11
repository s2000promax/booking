const {Schema, model} = require('mongoose')

const schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  hotelId: { type: Schema.Types.ObjectId, ref: 'HotelsGE' },
  rooms: {type: Number},
  dateStart: {type: String},
  dateEnd: {type: String}
}, {
  timestamps: true
})

module.exports = model('Schedule', schema)