const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    roomsNumber: {
        type: Number
    },
    rate: {
        type: Number,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = model('HotelsGE', schema);
